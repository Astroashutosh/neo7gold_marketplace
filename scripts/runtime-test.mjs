/**
 * Runtime verification through Chrome DevTools Protocol.
 *
 * Loads real product pages from the running dev server, waits for the AI
 * analysis + render pass, then reads the exact debug snapshot that the debug
 * panel displays (window.__TRYON_DEBUG_LAST).  A screenshot is captured for
 * each product so the result can be inspected visually.
 *
 * Usage: node scripts/runtime-test.mjs [baseUrl] [chromePort]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const baseUrl = process.argv[2] || "http://127.0.0.1:3002/neos7gold_marketplace";
const chromePort = Number(process.argv[3] || 9222);
const outDir = path.join(here, "runtime-artifacts");
fs.mkdirSync(outDir, { recursive: true });

const TARGETS = [
  { product: "12", asset: "necklace-crown", chain: 45, worn: 20.25 },
  { product: "13", asset: "necklace-gold-chain", chain: 50, worn: 22.5 },
  { product: "14", asset: "necklace-diamond-pendant", chain: 45, worn: 20.25 },
];

const failures = [];
let checks = 0;

function check(label, condition, detail = "") {
  checks += 1;
  if (!condition) failures.push(`${label}${detail ? ` — ${detail}` : ""}`);
}

function close(a, b, epsilon) {
  return Math.abs(a - b) <= epsilon;
}

async function getPageTarget() {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const targets = await fetch(
        `http://127.0.0.1:${chromePort}/json/list`
      ).then((response) => response.json());
      const page = targets.find((target) => target.type === "page");
      if (page?.webSocketDebuggerUrl) return page;
    } catch {
      // Chrome is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Chrome CDP endpoint did not become available");
}

class CDP {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    this.events = new Map();

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);

      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }

      const listeners = this.events.get(message.method);
      if (listeners) for (const listener of listeners) listener(message.params);
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  once(method, timeout = 30000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(
        () => reject(new Error(`Timed out waiting for ${method}`)),
        timeout
      );
      const listener = (params) => {
        clearTimeout(timer);
        const listeners = this.events.get(method) || [];
        this.events.set(
          method,
          listeners.filter((entry) => entry !== listener)
        );
        resolve(params);
      };
      this.events.set(method, [...(this.events.get(method) || []), listener]);
    });
  }
}

async function connect() {
  const target = await getPageTarget();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  return new CDP(socket);
}

async function evaluate(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  if (result.exceptionDetails) {
    throw new Error(
      result.exceptionDetails.exception?.description ||
        result.exceptionDetails.text
    );
  }

  return result.result.value;
}

async function waitForDebug(cdp, assetId, timeout = 90000) {
  const deadline = Date.now() + timeout;
  let last = null;

  while (Date.now() < deadline) {
    last = await evaluate(
      cdp,
      "(() => { const d = window.__TRYON_DEBUG_LAST; return d ? JSON.parse(JSON.stringify(d)) : null; })()"
    );

    if (
      last &&
      last.assetId === assetId &&
      Number.isFinite(last.final?.width) &&
      last.final.width > 0
    ) {
      return last;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return last;
}

const cdp = await connect();
await cdp.send("Page.enable");
await cdp.send("Runtime.enable");
await cdp.send("Emulation.setDeviceMetricsOverride", {
  width: 1280,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});

await cdp.send("Page.navigate", { url: `${baseUrl}/shop/12/try-on/` });
await cdp.once("Page.loadEventFired", 60000);

const results = [];

for (const target of TARGETS) {
  const url = `${baseUrl}/shop/${target.product}/try-on/`;

  if (target.product !== "12") {
    const loaded = cdp.once("Page.loadEventFired", 60000);
    await cdp.send("Page.navigate", { url });
    await loaded;
  }

  const debug = await waitForDebug(cdp, target.asset);

  check(`${target.product}: debug snapshot captured`, Boolean(debug));
  if (!debug) {
    results.push({ target, debug: null });
    continue;
  }

  const ratio = debug.final.height / debug.final.width;

  check(
    `${target.product}: tracked anatomy present`,
    Boolean(debug.model),
    "model anatomy missing — likely fallback placement"
  );
  check(
    `${target.product}: correct asset`,
    debug.assetId === target.asset,
    debug.assetId
  );
  check(
    `${target.product}: aspect matches visible content`,
    close(ratio, debug.product.visibleAspect, 1e-4),
    `${ratio} vs ${debug.product.visibleAspect}`
  );
  check(
    `${target.product}: visible aspect is 0.5018`,
    close(debug.product.visibleAspect, 0.5018, 0.0005),
    String(debug.product.visibleAspect)
  );
  check(
    `${target.product}: transparent padding excluded`,
    close(debug.product.visibleWidth, 544, 1) &&
      close(debug.product.visibleHeight, 273, 1),
    `${debug.product.visibleWidth}x${debug.product.visibleHeight}`
  );

  if (debug.model) {
    const wornFromRender = debug.final.width / debug.model.pxPerCm;
    check(
      `${target.product}: rendered width equals ${target.worn}cm worn span`,
      close(wornFromRender, target.worn, 0.05),
      `${wornFromRender.toFixed(3)}cm`
    );
  }

  const panel = await evaluate(
    cdp,
    "(() => { const el = document.querySelector('.tryon-debug-panel'); return el ? { text: el.innerText, visible: getComputedStyle(el).display !== 'none' } : null; })()"
  );

  check(`${target.product}: debug panel rendered`, Boolean(panel));
  check(`${target.product}: debug panel visible`, panel?.visible === true);
  check(
    `${target.product}: debug panel shows MODEL/PRODUCT/FINAL`,
    Boolean(
      panel &&
        panel.text.includes("MODEL") &&
        panel.text.includes("PRODUCT") &&
        panel.text.includes("FINAL RENDER")
    )
  );

  const screenshot = await cdp.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  const screenshotPath = path.join(outDir, `tryon-${target.product}.png`);
  fs.writeFileSync(screenshotPath, Buffer.from(screenshot.data, "base64"));

  results.push({ target, debug, panelText: panel?.text, screenshotPath });

  console.log(`\n── product ${target.product} · ${target.asset} ──`);
  console.log(
    `model px/cm ${debug.model?.pxPerCm.toFixed(3)} · neck ` +
      `${debug.model?.neckWidthPx.toFixed(1)}px · shoulders ` +
      `${debug.model?.shoulderWidthPx.toFixed(1)}px`
  );
  console.log(
    `product ${debug.product.naturalWidth}x${debug.product.naturalHeight} → ` +
      `visible ${debug.product.visibleWidth}x${debug.product.visibleHeight} ` +
      `(aspect ${debug.product.visibleAspect.toFixed(4)})`
  );
  console.log(
    `final ${debug.final.width.toFixed(1)}x${debug.final.height.toFixed(1)} ` +
      `· scale ${debug.final.scale.toFixed(3)} · anchor ${debug.final.anchorMode} ` +
      `(${debug.final.x.toFixed(0)},${debug.final.y.toFixed(0)})`
  );
  console.log(`screenshot ${screenshotPath}`);
}

// Cross-product invariants.
const byProduct = new Map(results.map((entry) => [entry.target.product, entry]));
const crown = byProduct.get("12")?.debug;
const gold = byProduct.get("13")?.debug;
const diamond = byProduct.get("14")?.debug;

if (crown && diamond) {
  check(
    "45cm crown and 45cm diamond render identically",
    close(crown.final.width, diamond.final.width, 0.5) &&
      close(crown.final.height, diamond.final.height, 0.5),
    `${crown.final.width}x${crown.final.height} vs ${diamond.final.width}x${diamond.final.height}`
  );
}

if (crown && gold) {
  check(
    "50cm chain is 50/45 wider than the 45cm chain",
    close(gold.final.width / crown.final.width, 50 / 45, 0.002),
    `${(gold.final.width / crown.final.width).toFixed(4)} vs ${(50 / 45).toFixed(4)}`
  );
}

fs.writeFileSync(
  path.join(outDir, "runtime-results.json"),
  JSON.stringify({ checkedAt: new Date().toISOString(), results, failures }, null, 2)
);

if (failures.length) {
  console.error(`\nFAILED ${failures.length} of ${checks} checks:`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

console.log(`\nPASS — ${checks} runtime checks on ${results.length} products.`);
cdp.socket.close();

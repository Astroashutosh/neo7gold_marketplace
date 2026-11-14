/**
 * Headless validation of the necklace fitting maths.
 *
 * Uses the real alpha bounds of the bundled product cut-outs and the real
 * MediaPipe landmarks saved in scripts/model-landmarks.json.  The same pure
 * modules that the browser renderer imports are transpiled and executed here,
 * so this test cannot drift from the runtime implementation.
 *
 * Run: node scripts/fitting-test.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";
import ts from "typescript";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const fittingPath = path.join(
  root,
  "app/shop/[id]/try-on/lib/fitting.ts"
);
const boundsPath = path.join(
  root,
  "app/shop/[id]/try-on/lib/image-bounds.ts"
);
const renderPath = path.join(root, "app/shop/[id]/try-on/lib/render.ts");
const placementPath = path.join(root, "app/shop/[id]/try-on/lib/placement.ts");

function loadTsModule(file) {
  const source = fs.readFileSync(file, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: file,
  }).outputText;

  const module = { exports: {} };
  const requireShim = (id) => {
    throw new Error(`Unexpected runtime import in ${file}: ${id}`);
  };
  new Function("exports", "module", "require", output)(
    module.exports,
    module,
    requireShim
  );
  return module.exports;
}

const fitting = loadTsModule(fittingPath);
const { computeAlphaBounds } = loadTsModule(boundsPath);

const landmarks = JSON.parse(
  fs.readFileSync(path.join(here, "model-landmarks.json"), "utf8")
);

const failures = [];
let checks = 0;

function check(label, condition, detail = "") {
  checks += 1;
  if (!condition) failures.push(`${label}${detail ? ` — ${detail}` : ""}`);
}

function close(a, b, epsilon = 1e-6) {
  return Math.abs(a - b) <= epsilon;
}

async function readVisible(file) {
  const input = fs.readFileSync(file);
  const meta = await sharp(input).metadata();
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  if (info.channels !== 4) {
    throw new Error(`Expected RGBA for ${file}, got ${info.channels} channels`);
  }

  const bounds = computeAlphaBounds(data, info.width, info.height, 12);
  if (!bounds) throw new Error(`No visible pixels in ${file}`);

  return {
    input,
    naturalWidth: meta.width,
    naturalHeight: meta.height,
    bounds,
    visibleWidth: bounds.width,
    visibleHeight: bounds.height,
    aspect: bounds.height / bounds.width,
  };
}

const productsDir = path.join(root, "public/tryon/products");
const crown = await readVisible(path.join(productsDir, "necklace-crown.png"));
const gold = await readVisible(path.join(productsDir, "necklace-gold-chain.png"));
const diamond = await readVisible(
  path.join(productsDir, "necklace-diamond-pendant.png")
);

// Synthetic 1: the exact same content with a wide transparent border.  The
// measured visible bounds and therefore the render size must not change.
const paddedBuffer = await sharp(crown.input)
  .extend({
    top: 70,
    bottom: 70,
    left: 95,
    right: 95,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();
const padded = await readVisibleBuffer(paddedBuffer);

// Synthetic 2: a deliberately different visible aspect.  It proves each
// product is scaled from its own measured aspect instead of a shared value.
const tallBuffer = await sharp(crown.input)
  .extract({
    left: crown.bounds.x0,
    top: crown.bounds.y0,
    width: crown.bounds.width,
    height: crown.bounds.height,
  })
  .resize({ width: 340, height: 520, fit: "fill" })
  .png()
  .toBuffer();
const tall = await readVisibleBuffer(tallBuffer);

async function readVisibleBuffer(buffer) {
  const meta = await sharp(buffer).metadata();
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const bounds = computeAlphaBounds(data, info.width, info.height, 12);
  if (!bounds) throw new Error("Synthetic image has no visible pixels");

  return {
    input: buffer,
    naturalWidth: meta.width,
    naturalHeight: meta.height,
    bounds,
    visibleWidth: bounds.width,
    visibleHeight: bounds.height,
    aspect: bounds.height / bounds.width,
  };
}

const products = [
  {
    id: "necklace-crown",
    name: "Crown pendant necklace",
    wornWidthCm: 20.25,
    chainLengthCm: 45,
    image: crown,
  },
  {
    id: "necklace-gold-chain",
    name: "Gold chain necklace",
    wornWidthCm: 22.5,
    chainLengthCm: 50,
    image: gold,
  },
  {
    id: "necklace-diamond-pendant",
    name: "Diamond pendant necklace",
    wornWidthCm: 20.25,
    chainLengthCm: 45,
    image: diamond,
  },
  {
    id: "synthetic-padded-crown",
    name: "Synthetic padded crown",
    wornWidthCm: 20.25,
    chainLengthCm: 45,
    image: padded,
    synthetic: "padding",
  },
  {
    id: "synthetic-tall-pendant",
    name: "Synthetic tall pendant",
    wornWidthCm: 20.25,
    chainLengthCm: 45,
    image: tall,
    synthetic: "aspect",
  },
];

const modelIds = Object.keys(landmarks);
const models = modelIds.map((id) => {
  const entry = landmarks[id];
  const result = {
    faceLandmarks: entry.face,
    poseLandmarks: entry.pose,
    handLandmarks: [],
    faceDetected: true,
    handsDetected: 0,
    poseDetected: true,
  };
  const anatomy = fitting.measureModelAnatomy(
    result,
    entry.width,
    entry.height
  );
  return { id, ...entry, anatomy };
});

const fitFor = (product) => ({
  widthCm: product.wornWidthCm,
  verticalOffset: 0.03,
  rotation: 0,
});

// ---------------------------------------------------------------------------
// Static root-cause guards
// ---------------------------------------------------------------------------
const renderSource = fs.readFileSync(renderPath, "utf8");
const placementSource = fs.readFileSync(placementPath, "utf8");

check(
  "renderer no longer applies a per-product design scale",
  !renderSource.includes("productScale") && !renderSource.includes("fit.scale"),
  "found productScale/fit.scale in render.ts"
);
check(
  "placement no longer defines a universal product design scale",
  !placementSource.includes("PRODUCT_DESIGN_SCALE") &&
    !placementSource.includes("collarWidthCm"),
  "found PRODUCT_DESIGN_SCALE/collarWidthCm in placement.ts"
);
check(
  "live camera does not duplicate a second necklace scale",
  !renderSource.includes("tracked.width * 0.8"),
  "found the old live-camera 0.8 multiplier"
);
check(
  "necklace draw path derives height from visible aspect",
  renderSource.includes("let height = width * aspect"),
  "aspect-locked height not found"
);

// ---------------------------------------------------------------------------
// Model anatomy
// ---------------------------------------------------------------------------
console.log("\nMODEL ANATOMY");
console.log(
  "model".padEnd(12),
  "source".padEnd(12),
  "shoulder".padStart(9),
  "neck".padStart(8),
  "px/cm".padStart(8),
  "anchor".padStart(17)
);

for (const model of models) {
  check(`${model.id}: anatomy measured`, Boolean(model.anatomy));
  if (!model.anatomy) continue;

  const a = model.anatomy;
  check(`${model.id}: positive px/cm`, a.pxPerCm > 0, String(a.pxPerCm));
  check(
    `${model.id}: positive neck width`,
    a.neckWidthPx > 0 && a.neckWidthCm > 0,
    `${a.neckWidthPx}px / ${a.neckWidthCm}cm`
  );
  check(
    `${model.id}: neck base left of right`,
    a.neckBaseLeft.x < a.neckBaseRight.x,
    `${a.neckBaseLeft.x} >= ${a.neckBaseRight.x}`
  );
  check(`${model.id}: numeric anchor`, Number.isFinite(a.neckBaseY));

  console.log(
    model.id.padEnd(12),
    `${model.width}x${model.height}`.padEnd(12),
    a.shoulderWidthPx.toFixed(1).padStart(9),
    a.neckWidthPx.toFixed(1).padStart(8),
    a.pxPerCm.toFixed(3).padStart(8),
    `${(a.neckBaseLeft.x * 100).toFixed(1)}% / ${(
      a.neckBaseRight.x * 100
    ).toFixed(1)}%`.padStart(17)
  );
}

check(
  "three distinct model calibrations",
  new Set(models.map((m) => m.anatomy?.pxPerCm?.toFixed(3))).size ===
    models.length,
  "models share an identical px/cm value"
);

// ---------------------------------------------------------------------------
// Per-product × per-model fitting
// ---------------------------------------------------------------------------
console.log("\nNECKLACE FIT (aspect-locked)");
console.log(
  "product".padEnd(28),
  "model".padEnd(12),
  "worn".padStart(7),
  "width".padStart(9),
  "height".padStart(9),
  "aspect".padStart(8),
  "ratio".padStart(7),
  "clamp".padStart(6)
);

const results = new Map();

for (const product of products) {
  for (const model of models) {
    if (!model.anatomy) continue;

    const fit = fitFor(product);
    const result = fitting.computeNecklaceFit(
      model.anatomy,
      fit,
      product.image.aspect
    );
    results.set(`${product.id}:${model.id}`, result);

    check(
      `${product.id}/${model.id}: aspect locked`,
      close(result.heightPx, result.widthPx * product.image.aspect, 1e-9),
      `${result.heightPx} vs ${result.widthPx * product.image.aspect}`
    );
    check(
      `${product.id}/${model.id}: positive width`,
      result.widthPx > 0 && result.heightPx > 0
    );
    check(
      `${product.id}/${model.id}: render box locked`,
      (() => {
        const box = fitting.computeNecklaceRenderBox(
          result.widthPx,
          1,
          1,
          product.image.aspect
        );
        return close(box.height, box.width * product.image.aspect, 1e-9);
      })()
    );

    // heightCm must never influence a necklace, even if stale data supplies it.
    const withHeight = fitting.computeNecklaceFit(
      model.anatomy,
      { ...fit, heightCm: 999 },
      product.image.aspect
    );
    check(
      `${product.id}/${model.id}: heightCm ignored`,
      close(withHeight.heightPx, result.heightPx, 1e-9)
    );

    console.log(
      product.name.padEnd(28),
      model.id.padEnd(12),
      `${product.wornWidthCm}cm`.padStart(7),
      result.widthPx.toFixed(1).padStart(9),
      result.heightPx.toFixed(1).padStart(9),
      product.image.aspect.toFixed(4).padStart(8),
      result.productFitRatio.toFixed(3).padStart(7),
      (result.clamped ? "yes" : "no").padStart(6)
    );
  }
}

// Per-product ratios: products with the same worn span must match exactly;
// a longer chain must be wider whenever neither product is clamped.
for (const model of models) {
  if (!model.anatomy) continue;

  const crownResult = results.get(`necklace-crown:${model.id}`);
  const diamondResult = results.get(`necklace-diamond-pendant:${model.id}`);
  const goldResult = results.get(`necklace-gold-chain:${model.id}`);

  check(
    `${model.id}: identical chain length renders identically`,
    close(crownResult.widthPx, diamondResult.widthPx, 1e-9) &&
      close(crownResult.heightPx, diamondResult.heightPx, 1e-9),
    `${crownResult.widthPx} vs ${diamondResult.widthPx}`
  );

  if (!crownResult.clamped && !goldResult.clamped) {
    const expected = 22.5 / 20.25;
    check(
      `${model.id}: 50cm chain is 50/45 wider than 45cm chain`,
      close(goldResult.widthPx / crownResult.widthPx, expected, 1e-6),
      `${(goldResult.widthPx / crownResult.widthPx).toFixed(6)} vs ${expected}`
    );
  }

  const paddedResult = results.get(`synthetic-padded-crown:${model.id}`);
  check(
    `${model.id}: transparent padding does not change render size`,
    close(paddedResult.widthPx, crownResult.widthPx, 1e-9) &&
      close(paddedResult.heightPx, crownResult.heightPx, 1e-9),
    `${paddedResult.widthPx}x${paddedResult.heightPx} vs ${crownResult.widthPx}x${crownResult.heightPx}`
  );

  const tallResult = results.get(`synthetic-tall-pendant:${model.id}`);
  check(
    `${model.id}: tall synthetic keeps its own aspect`,
    close(tallResult.heightPx / tallResult.widthPx, tall.aspect, 1e-9) &&
      Math.abs(tallResult.heightPx / tallResult.widthPx - crownResult.heightPx / crownResult.widthPx) >
        0.1,
    `${tallResult.heightPx / tallResult.widthPx} vs ${crownResult.heightPx / crownResult.widthPx}`
  );

  // Repeated calls with different products must not leak state through the
  // shared anatomy object.
  const before = JSON.stringify(model.anatomy);
  fitting.computeNecklaceFit(model.anatomy, fitFor(products[1]), tall.aspect);
  fitting.computeNecklaceFit(model.anatomy, fitFor(products[0]), crown.aspect);
  check(
    `${model.id}: anatomy is never mutated`,
    JSON.stringify(model.anatomy) === before
  );
}

// Fallback must obey the same aspect lock.
const fallback = fitting.computeFallbackNecklaceFit(1086, 1448, fitFor(products[0]), crown.aspect);
check(
  "fallback: aspect locked",
  close(fallback.heightPx, fallback.widthPx * crown.aspect, 1e-9)
);

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log("\nPRODUCT IMAGES");
console.log(
  "asset".padEnd(28),
  "natural".padStart(11),
  "visible".padStart(11),
  "aspect".padStart(8),
  "padding".padStart(9)
);
for (const product of products) {
  const img = product.image;
  const padding =
    1 - (img.visibleWidth * img.visibleHeight) / (img.naturalWidth * img.naturalHeight);
  console.log(
    product.id.padEnd(28),
    `${img.naturalWidth}x${img.naturalHeight}`.padStart(11),
    `${img.visibleWidth}x${img.visibleHeight}`.padStart(11),
    img.aspect.toFixed(4).padStart(8),
    `${(padding * 100).toFixed(1)}%`.padStart(9)
  );
}

if (failures.length) {
  console.error(`\nFAILED ${failures.length} of ${checks} checks:`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

console.log(`\nPASS — ${checks} checks across ${products.length} products × ${models.length} models.`);

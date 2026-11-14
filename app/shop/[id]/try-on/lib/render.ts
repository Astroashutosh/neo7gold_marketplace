import type { TryOnAsset, TryOnType } from "../../../data/tryon";
import { computeAlphaBounds } from "./image-bounds";
import type { AnalysisResult } from "./mediapipe";
import {
  degToRad,
  getFallbackPlacement,
  getPlacement,
  pickHand,
  pixelDistance,
  RING_ROTATION,
  visiblePoint,
  type Placement,
  type TryOnFit,
} from "./placement";

export type RenderItem = {
  asset: TryOnAsset;
  fit: TryOnFit;
  image: HTMLImageElement | null;
  /** Slider value, 100 = natural physical size. */
  size: number;
  /** Slider value in percent of the rendered frame height. */
  verticalPosition: number;
  /** Manual nudge in percent of the rendered frame width. */
  horizontalPosition?: number;
  /** Manual rotation in degrees. */
  rotationOffset?: number;
  /** Human-readable product name for the debug panel. */
  productName?: string;
};

export type RenderOptions = {
  liveCamera?: boolean;
  /** When set, the debug snapshot for this asset id is returned. */
  debugAssetId?: string;
};

export type RenderDebug = {
  assetId: string;
  productName?: string;
  type: TryOnType;
  tracked: boolean;
  usedFallback: boolean;
  liveCamera: boolean;
  model: {
    sourceWidth: number;
    sourceHeight: number;
    /** Source-image pixels to canvas pixels. */
    imageScale: number;
    neckWidthPx: number;
    neckWidthCm: number;
    neckBaseWidthPx: number;
    neckBaseLeft: { x: number; y: number };
    neckBaseRight: { x: number; y: number };
    collarboneWidthPx: number;
    shoulderWidthPx: number;
    faceHeightPx: number;
    pxPerCm: number;
    neckBaseY: number;
    centerX: number;
    confidence: number;
  } | null;
  product: {
    name?: string;
    widthCm: number;
    heightCm?: number;
    wornWidthCm?: number;
    chainLengthCm?: number;
    naturalWidth: number;
    naturalHeight: number;
    visibleWidth: number;
    visibleHeight: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
    transparentPadding: number;
    visibleAspect: number;
    fitRatio?: number;
    clamped?: boolean;
  };
  final: {
    canvasWidth: number;
    canvasHeight: number;
    width: number;
    height: number;
    /** Drawn width divided by visible width. */
    scale: number;
    anchorMode: "top" | "center";
    x: number;
    y: number;
    rotation: number;
  };
  coords?: {
    neckBaseYNorm: number;
    neckBaseYPx: number;
    neckBaseYCanvas: number;
    imageOffsetX: number;
    imageOffsetY: number;
    canvasScaleX: number;
    canvasScaleY: number;
    productAttachment: string;
    overlayBox: { left: number; top: number; right: number; bottom: number };
  };
};

export type RenderOutcome = {
  drawn: boolean;
  usedFallback: boolean;
  debug?: RenderDebug;
};

type ImageMetrics = {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  width: number;
  height: number;
};

type SourceSize = { width: number; height: number };

type CanvasMapping = {
  sourceWidth: number;
  sourceHeight: number;
  scale: number;
  offsetX: number;
  offsetY: number;
  drawnWidth: number;
  drawnHeight: number;
};

export type ObjectFitInfo = {
  fit: "contain" | "cover";
  position: string;
};

/**
 * Read the actual `object-fit` / `object-position` used by the browser so the
 * jewellery canvas uses exactly the same transform as the visible image/video.
 */
export function getObjectFitInfo(
  element: Element | null | undefined
): ObjectFitInfo {
  if (!element || typeof window === "undefined") {
    return { fit: "contain", position: "50% 50%" };
  }

  const style = window.getComputedStyle(element);

  return {
    fit: style.objectFit === "cover" ? "cover" : "contain",
    position: style.objectPosition || "50% 50%",
  };
}

function objectPositionFraction(position: string): { x: number; y: number } {
  const parts = position.trim().split(/\s+/);

  const toFraction = (value: string | undefined): number => {
    if (!value) return 0.5;
    if (value === "left" || value === "top") return 0;
    if (value === "right" || value === "bottom") return 1;
    if (value === "center") return 0.5;

    const parsed = Number.parseFloat(value);

    return Number.isFinite(parsed) ? parsed / 100 : 0.5;
  };

  return {
    x: toFraction(parts[0]),
    y: toFraction(parts[1] ?? parts[0]),
  };
}

// Every cache is keyed by the image's current source and natural size as well
// as the element, so reusing an <img> for a different product can never return
// stale bounds from the previous product.
function imageCacheKey(image: HTMLImageElement): string {
  return `${image.currentSrc || image.src}|${image.naturalWidth}x${image.naturalHeight}`;
}

const imageMetricsCache = new WeakMap<
  HTMLImageElement,
  { key: string; metrics: ImageMetrics }
>();
const processedImageCache = new WeakMap<
  HTMLImageElement,
  { key: string; image: HTMLImageElement | HTMLCanvasElement }
>();
const earringPartsCache = new WeakMap<
  HTMLImageElement,
  { key: string; parts: { left: ImageMetrics; right: ImageMetrics } | null }
>();

export function prepareCanvas(
  canvas: HTMLCanvasElement | null,
  stage: HTMLElement | null
): void {
  if (!canvas || !stage) return;

  // The canvas is positioned inside the stage border box, so use the stage's
  // client size (padding box). Using the outer rect made the canvas slightly
  // larger than the visible image on bordered layouts.
  const width = Math.max(1, stage.clientWidth);
  const height = Math.max(1, stage.clientHeight);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const pixelWidth = Math.max(1, Math.round(width * dpr));
  const pixelHeight = Math.max(1, Math.round(height * dpr));

  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }
}

export function clearCanvas(canvas: HTMLCanvasElement | null): void {
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getSourceSize(
  source: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement
): SourceSize {
  return {
    width:
      (source as HTMLVideoElement).videoWidth ||
      (source as HTMLImageElement).naturalWidth ||
      (source as HTMLCanvasElement).width ||
      0,
    height:
      (source as HTMLVideoElement).videoHeight ||
      (source as HTMLImageElement).naturalHeight ||
      (source as HTMLCanvasElement).height ||
      0,
  };
}

export function getCanvasMapping(
  canvas: HTMLCanvasElement,
  source: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
  fit: "contain" | "cover" = "contain",
  position = "50% 50%"
): CanvasMapping | null {
  const { width: sourceWidth, height: sourceHeight } = getSourceSize(source);

  if (!sourceWidth || !sourceHeight) return null;

  const fitFn = fit === "cover" ? Math.max : Math.min;
  const scale = fitFn(
    canvas.width / sourceWidth,
    canvas.height / sourceHeight
  );

  const drawnWidth = sourceWidth * scale;
  const drawnHeight = sourceHeight * scale;
  const anchor = objectPositionFraction(position);

  // Same math as CSS object-fit/object-position. For contain the offsets are
  // positive (letterbox); for cover they become negative (cropped overflow).
  return {
    sourceWidth,
    sourceHeight,
    scale,
    offsetX: (canvas.width - drawnWidth) * anchor.x,
    offsetY: (canvas.height - drawnHeight) * anchor.y,
    drawnWidth,
    drawnHeight,
  };
}

function pointToCanvas(
  point: { x: number; y: number },
  mapping: CanvasMapping
): { x: number; y: number } {
  return {
    x: mapping.offsetX + point.x * mapping.sourceWidth * mapping.scale,
    y: mapping.offsetY + point.y * mapping.sourceHeight * mapping.scale,
  };
}

export function renderTryOnFrameMulti(
  canvas: HTMLCanvasElement | null,
  stage: HTMLElement | null,
  source: HTMLImageElement | HTMLVideoElement | null,
  result: AnalysisResult | null,
  items: RenderItem[],
  allowFallback: boolean,
  options?: RenderOptions
): RenderOutcome {
  if (!canvas || !stage) return { drawn: false, usedFallback: false };

  prepareCanvas(canvas, stage);
  clearCanvas(canvas);

  if (!source || !items.length) return { drawn: false, usedFallback: false };

  const fitInfo = getObjectFitInfo(source);
  const mapping = getCanvasMapping(
    canvas,
    source,
    fitInfo.fit,
    fitInfo.position
  );
  const ctx = canvas.getContext("2d");

  if (!mapping || !ctx) return { drawn: false, usedFallback: false };

  let anyDrawn = false;
  let anyFallback = false;
  let lastDebug: RenderDebug | undefined;
  let selectedDebug: RenderDebug | undefined;
  const wantedDebugId = options?.debugAssetId;

  for (const item of items) {
    const outcome = renderSingleItem(
      ctx,
      mapping,
      result,
      item,
      allowFallback,
      options?.liveCamera === true
    );
    if (outcome.drawn) anyDrawn = true;
    if (outcome.usedFallback) anyFallback = true;

    if (outcome.debug) {
      lastDebug = outcome.debug;

      if (wantedDebugId && item.asset.id === wantedDebugId) {
        selectedDebug = outcome.debug;
      }
    }
  }

  return {
    drawn: anyDrawn,
    usedFallback: anyFallback,
    debug: selectedDebug ?? lastDebug,
  };
}

function renderSingleItem(
  ctx: CanvasRenderingContext2D,
  mapping: CanvasMapping,
  result: AnalysisResult | null,
  item: RenderItem,
  allowFallback: boolean,
  liveCamera = false
): RenderOutcome {
  const type = item.asset.type;
  const sizeMultiplier = Math.max(0.4, Math.min(2, item.size / 100));
  const verticalOffset = Number.isFinite(item.verticalPosition)
    ? item.verticalPosition
    : 0;
  const manualHorizontal = Number.isFinite(item.horizontalPosition)
    ? Number(item.horizontalPosition)
    : 0;
  const manualRotationDeg = Number.isFinite(item.rotationOffset)
    ? Number(item.rotationOffset)
    : 0;

  let tracked = getPlacement(
    type,
    result,
    mapping.sourceWidth,
    mapping.sourceHeight,
    item.fit
  );

  if (liveCamera) {
    const livePlacement = getLiveCameraPlacement(
      type,
      result,
      mapping.sourceWidth,
      mapping.sourceHeight,
      item.fit
    );

    if (livePlacement) tracked = livePlacement;
  }

  const placement =
    tracked ||
    (allowFallback
      ? getFallbackPlacement(type, mapping.sourceWidth, mapping.sourceHeight)
      : null);

  if (!placement) return { drawn: false, usedFallback: false };

  const rawImage = item.image;
  if (!rawImage?.complete || !rawImage.naturalWidth) {
    return { drawn: false, usedFallback: false };
  }

  const image = getRenderableImage(rawImage);
  const metrics = getVisibleImageMetrics(image);

  if (!metrics?.width || !metrics?.height) {
    return { drawn: false, usedFallback: false };
  }

  let box: DrawnBox | null = null;

  if (type === "earrings") {
    box = drawEarrings(
      ctx,
      image,
      placement,
      mapping,
      metrics,
      item.fit,
      sizeMultiplier,
      verticalOffset,
      item.asset.blend
    );
  } else {
    box = drawStandardPiece(
      ctx,
      image,
      metrics,
      placement,
      mapping,
      item.fit,
      type,
      sizeMultiplier,
      verticalOffset,
      type === "ring",
      manualHorizontal,
      manualRotationDeg,
      item.asset.blend
    );
  }

  if (!box) return { drawn: false, usedFallback: !tracked };

  return { drawn: true, usedFallback: !tracked };
}

type DrawnBox = {
  width: number;
  height: number;
  /** Canvas-space anchor (top-centre for necklaces, centre otherwise). */
  x: number;
  y: number;
  rotation: number;
  anchorMode: "top" | "center";
};

function buildRenderDebug({
  item,
  type,
  placement,
  tracked,
  liveCamera,
  image,
  metrics,
  mapping,
  box,
  canvasWidth,
  canvasHeight,
}: {
  item: RenderItem;
  type: TryOnType;
  placement: Placement;
  tracked: boolean;
  liveCamera: boolean;
  image: HTMLImageElement | HTMLCanvasElement;
  metrics: ImageMetrics;
  mapping: CanvasMapping;
  box: DrawnBox;
  canvasWidth: number;
  canvasHeight: number;
}): RenderDebug {
  const natural = getSourceSize(image);
  const paddingLeft = Math.max(0, metrics.sx);
  const paddingTop = Math.max(0, metrics.sy);
  const paddingRight = Math.max(0, natural.width - metrics.sx - metrics.sw);
  const paddingBottom = Math.max(0, natural.height - metrics.sy - metrics.sh);
  const visibleArea = Math.max(0, metrics.width) * Math.max(0, metrics.height);
  const totalArea = Math.max(1, natural.width * natural.height);
  const anatomy = placement.model;
  const overlayLeft = box.x - box.width / 2;
  const overlayTop = box.anchorMode === "top" ? box.y : box.y - box.height / 2;
  const neckBaseYNorm = anatomy?.neckBaseY ?? placement.y;
  const neckBaseYPx = anatomy ? neckBaseYNorm * anatomy.sourceHeight : placement.y * mapping.sourceHeight;
  const coords = {
    neckBaseYNorm,
    neckBaseYPx,
    neckBaseYCanvas: mapping.offsetY + neckBaseYPx * mapping.scale,
    imageOffsetX: mapping.offsetX,
    imageOffsetY: mapping.offsetY,
    canvasScaleX: mapping.scale,
    canvasScaleY: mapping.scale,
    productAttachment: box.anchorMode,
    overlayBox: {
      left: overlayLeft,
      top: overlayTop,
      right: overlayLeft + box.width,
      bottom: overlayTop + box.height,
    },
  };

  return {
    assetId: item.asset.id,
    productName: item.productName ?? item.asset.label,
    type,
    tracked,
    usedFallback: !tracked,
    liveCamera,
    model: anatomy
      ? {
          sourceWidth: anatomy.sourceWidth,
          sourceHeight: anatomy.sourceHeight,
          imageScale: mapping.scale,
          neckWidthPx: anatomy.neckWidthPx,
          neckWidthCm: anatomy.neckWidthCm,
          neckBaseWidthPx: anatomy.neckBaseWidthPx,
          neckBaseLeft: { ...anatomy.neckBaseLeft },
          neckBaseRight: { ...anatomy.neckBaseRight },
          collarboneWidthPx: anatomy.collarboneWidthPx,
          shoulderWidthPx: anatomy.shoulderWidthPx,
          faceHeightPx: anatomy.faceHeightPx,
          pxPerCm: anatomy.pxPerCm,
          neckBaseY: anatomy.neckBaseY,
          centerX: anatomy.centerX,
          confidence: anatomy.confidence,
        }
      : null,
    product: {
      name: item.productName ?? item.asset.label,
      widthCm: item.fit.widthCm,
      heightCm: item.fit.heightCm,
      wornWidthCm: item.asset.wornWidthCm,
      chainLengthCm: item.asset.chainLengthCm,
      naturalWidth: natural.width,
      naturalHeight: natural.height,
      visibleWidth: metrics.width,
      visibleHeight: metrics.height,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      transparentPadding: 1 - visibleArea / totalArea,
      visibleAspect: metrics.height / metrics.width,
      fitRatio: placement.productFitRatio,
      clamped: placement.clamped,
    },
    coords,
    final: {
      canvasWidth,
      canvasHeight,
      width: box.width,
      height: box.height,
      scale: box.width / metrics.width,
      anchorMode: box.anchorMode,
      x: box.x,
      y: box.y,
      rotation: box.rotation,
    },
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function getLiveCameraPlacement(
  type: TryOnType,
  result: AnalysisResult | null,
  sourceWidth: number,
  sourceHeight: number,
  fit: TryOnFit
): Placement | null {
  if (type === "ring") {
    return getLiveRingPlacement(result, sourceWidth, sourceHeight, fit);
  }

  if (type === "necklace") {
    return getLiveNecklacePlacement(result, sourceWidth, sourceHeight, fit);
  }

  return null;
}

function getLiveRingPlacement(
  result: AnalysisResult | null,
  sourceWidth: number,
  sourceHeight: number,
  fit: TryOnFit
): Placement | null {
  const hand = pickHand(result?.handLandmarks, [13, 14, 5, 17]);
  if (!hand) return null;

  const mcp = visiblePoint(hand, 13);
  const pip = visiblePoint(hand, 14);
  const dip = visiblePoint(hand, 15);
  const tip = visiblePoint(hand, 16);
  const indexMcp = visiblePoint(hand, 5);
  const pinkyMcp = visiblePoint(hand, 17);

  if (!mcp || !pip || !indexMcp || !pinkyMcp) return null;

  const palmWidth = pixelDistance(
    indexMcp,
    pinkyMcp,
    sourceWidth,
    sourceHeight
  );

  if (palmWidth <= 0) return null;

  const pxPerCm = palmWidth / 8;
  const verticalFit = Number.isFinite(fit.verticalOffset)
    ? Number(fit.verticalOffset)
    : 0;
  const t = clamp(0.16 + verticalFit, 0.14, 0.48);

  const anchor = {
    x: mcp.x + (pip.x - mcp.x) * t,
    y: mcp.y + (pip.y - mcp.y) * t,
  };

  const direction = dip || tip || pip;
  const fingerDx = (direction.x - mcp.x) * sourceWidth;
  const fingerDy = (direction.y - mcp.y) * sourceHeight;

  if (!fingerDx && !fingerDy) return null;

  const fingerAngle = Math.atan2(fingerDy, fingerDx);
  let angle = fingerAngle + Math.PI / 2 + degToRad(fit.rotation);

  if (angle > Math.PI / 2) angle -= Math.PI;
  if (angle < -Math.PI / 2) angle += Math.PI;

  return {
    x: anchor.x,
    y: anchor.y,
    width: fit.widthCm * pxPerCm * 1.2,
    pxPerCm,
    angle,
  };
}

function getLiveNecklacePlacement(
  result: AnalysisResult | null,
  sourceWidth: number,
  sourceHeight: number,
  fit: TryOnFit
): Placement | null {
  // Live-camera necklaces use exactly the same anatomy-derived placement as
  // the model photo.  The old duplicate 0.8 scale and +0.03 offset made the
  // same product render at a different size in each mode.
  return getPlacement("necklace", result, sourceWidth, sourceHeight, fit);
}

export function renderTryOnFrame(
  canvas: HTMLCanvasElement | null,
  stage: HTMLElement | null,
  source: HTMLImageElement | HTMLVideoElement | null,
  result: AnalysisResult | null,
  item: RenderItem | null,
  allowFallback: boolean,
  options?: RenderOptions
): RenderOutcome {
  if (!canvas || !stage) return { drawn: false, usedFallback: false };

  prepareCanvas(canvas, stage);
  clearCanvas(canvas);

  if (!source || !item) return { drawn: false, usedFallback: false };

  const fitInfo = getObjectFitInfo(source);
  const mapping = getCanvasMapping(
    canvas,
    source,
    fitInfo.fit,
    fitInfo.position
  );
  const ctx = canvas.getContext("2d");

  if (!mapping || !ctx) return { drawn: false, usedFallback: false };

  return renderSingleItem(
    ctx,
    mapping,
    result,
    item,
    allowFallback,
    options?.liveCamera === true
  );
}

function drawStandardPiece(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement | HTMLCanvasElement,
  metrics: ImageMetrics,
  placement: Placement,
  mapping: CanvasMapping,
  fit: TryOnFit,
  type: TryOnType,
  sizeMultiplier: number,
  verticalOffset: number,
  usePlacementRotation = false,
  manualHorizontal = 0,
  manualRotationDeg = 0,
  blend?: "multiply"
): DrawnBox | null {
  const isNecklace = type === "necklace";
  const isRing = type === "ring";

  let width = placement.width * mapping.scale * sizeMultiplier;

  if (!Number.isFinite(width) || width <= 0) return null;

  // The visible content aspect is the single source of truth for a necklace's
  // height.  It is measured from the alpha bounding box (transparent padding
  // excluded), so the drawn shape can never be stretched independently of the
  // product image.
  const aspect = metrics.height / metrics.width;
  if (!Number.isFinite(aspect) || aspect <= 0) return null;

  let height = width * aspect;

  // Non-necklace pieces may still declare a physical height (earrings are
  // handled separately).  Necklaces never use heightCm: width and aspect
  // alone determine their box.
  if (
    !isNecklace &&
    Number.isFinite(fit.heightCm) &&
    Number(fit.heightCm) > 0 &&
    Number.isFinite(placement.pxPerCm)
  ) {
    const fittedHeight =
      Number(fit.heightCm) *
      placement.pxPerCm *
      mapping.scale *
      sizeMultiplier;

    if (Number.isFinite(fittedHeight) && fittedHeight > 0) {
      height = fittedHeight;
      width = height / aspect;
    }
  }

  if (!Number.isFinite(height) || height <= 0) return null;

  const anchorPoint = isNecklace
    ? { x: placement.x, y: placement.y }
    : {
        x: placement.x,
        y: Number.isFinite(placement.centerY)
          ? Number(placement.centerY)
          : placement.y,
      };

  const anchor = pointToCanvas(anchorPoint, mapping);

  const x =
    anchor.x +
    (Number.isFinite(fit.horizontalOffset) ? Number(fit.horizontalOffset) : 0) *
      mapping.drawnWidth +
    (manualHorizontal / 100) * mapping.drawnWidth;

  const y = anchor.y + (verticalOffset / 100) * mapping.drawnHeight;

  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.globalAlpha = isNecklace ? 1 : 0.99;
  applySoftShadow(ctx, width, height, type);
  ctx.translate(x, y);

  const rotation =
    (isRing && !usePlacementRotation ? RING_ROTATION : placement.angle) +
    degToRad(manualRotationDeg);

  if (Number.isFinite(rotation) && rotation !== 0) {
    ctx.rotate(rotation);
  }

  // Bracelets keep a subtle perspective squash.  Rings preserve their
  // proportions so the band never looks warped.
  if (type === "bracelet") {
    ctx.scale(1, 0.9);
  }

  if (blend === "multiply") {
    ctx.globalCompositeOperation = "multiply";
  }

  if (isNecklace) {
    drawNecklaceCurvedImage(
      ctx,
      image,
      metrics,
      -width / 2,
      0,
      width,
      height
    );
  } else {
    drawVisibleImage(
      ctx,
      image,
      metrics,
      -width / 2,
      -height / 2,
      width,
      height
    );
  }

  ctx.restore();

  return {
    width,
    height,
    x,
    y,
    anchorMode: isNecklace ? "top" : "center",
    rotation: Number.isFinite(rotation) ? rotation : 0,
  };
}

function applySoftShadow(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  type: TryOnType
): void {
  const isMetal = type === "ring" || type === "bracelet";

  ctx.shadowColor = isMetal
    ? "rgba(30, 22, 12, 0.38)"
    : "rgba(35, 26, 16, 0.26)";

  ctx.shadowBlur = Math.max(2, width * (isMetal ? 0.05 : 0.03));
  ctx.shadowOffsetY = Math.max(1, height * (isMetal ? 0.04 : 0.02));
}

function drawEarrings(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement | HTMLCanvasElement,
  placement: Placement,
  mapping: CanvasMapping,
  metrics: ImageMetrics,
  fit: TryOnFit,
  sizeMultiplier: number,
  verticalOffset: number,
  blend?: "multiply"
): DrawnBox | null {
  if (!placement.leftEar || !placement.rightEar || !placement.widthPx) {
    return null;
  }

  const left = pointToCanvas(placement.leftEar, mapping);
  const right = pointToCanvas(placement.rightEar, mapping);

  const earringWidth = placement.widthPx * mapping.scale * sizeMultiplier;

  const earringHeight =
    Number.isFinite(fit.heightCm) &&
    Number(fit.heightCm) > 0 &&
    Number.isFinite(placement.pxPerCm)
      ? Number(fit.heightCm) *
        placement.pxPerCm *
        mapping.scale *
        sizeMultiplier
      : null;

  if (!Number.isFinite(earringWidth) || earringWidth <= 0) return null;

  const offset = (verticalOffset / 100) * mapping.drawnHeight;
  const angle = Number.isFinite(placement.angle) ? placement.angle : 0;

  // The source photos contain a pair side by side.  Split the pair so each
  // earring lands on its own ear instead of drawing four earrings.
  const parts = getEarringParts(image);

  const items = parts
    ? [
        { point: left, part: parts.left, scale: placement.leftScale || 1 },
        { point: right, part: parts.right, scale: placement.rightScale || 1 },
      ]
    : [
        { point: left, part: metrics, scale: placement.leftScale || 1 },
        { point: right, part: metrics, scale: placement.rightScale || 1 },
      ];

  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.globalAlpha = 0.99;
  if (blend === "multiply") {
    ctx.globalCompositeOperation = "multiply";
  }

  let firstBox: DrawnBox | null = null;

  for (const { point, part, scale } of items) {
    let width = earringWidth * scale;
    let height = (width * part.height) / part.width;

    if (earringHeight) {
      height = earringHeight * scale;
      width = (height * part.width) / part.height;
    }

    if (!Number.isFinite(width) || width <= 0) continue;
    if (!Number.isFinite(height) || height <= 0) continue;

    applySoftShadow(ctx, width, height, "earrings");
    ctx.save();
    ctx.translate(point.x, point.y + offset);

    if (angle) ctx.rotate(angle);

    // The top of the earring hangs from the detected earlobe.
    drawVisibleImage(ctx, image, part, -width / 2, 0, width, height);

    ctx.restore();

    if (!firstBox) {
      firstBox = {
        width,
        height,
        x: point.x,
        y: point.y + offset,
        anchorMode: "top",
        rotation: Number.isFinite(angle) ? angle : 0,
      };
    }
  }

  ctx.restore();

  return firstBox;
}

function drawVisibleImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement | HTMLCanvasElement,
  metrics: ImageMetrics,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  ctx.drawImage(
    image,
    metrics.sx,
    metrics.sy,
    metrics.sw,
    metrics.sh,
    x,
    y,
    width,
    height
  );
}

/**
 * Draw a necklace as a shallow U curve instead of a flat stretch.  Slicing
 * the visible artwork vertically preserves the product's proportions while
 * letting the centre pendant drop below the collarbone endpoints.
 */
function drawNecklaceCurvedImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement | HTMLCanvasElement,
  metrics: ImageMetrics,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  const slices = 28;
  const curve = Math.min(height * 0.18, width * 0.1);
  const sourceRight = metrics.sx + metrics.sw;

  for (let i = 0; i < slices; i++) {
    const u = i / (slices - 1);
    const sourceX = metrics.sx + metrics.sw * (i / slices);
    const sourceW = Math.min(
      metrics.sw / slices + 0.75,
      sourceRight - sourceX
    );
    const destX = x + width * (i / slices);
    const destW = width / slices + 0.75;
    const bend = curve * (1 - Math.pow(u * 2 - 1, 2));

    ctx.drawImage(
      image,
      sourceX,
      metrics.sy,
      sourceW,
      metrics.sh,
      destX,
      y + bend,
      destW,
      height
    );
  }
}

function getVisibleImageMetrics(
  image: HTMLImageElement | HTMLCanvasElement
): ImageMetrics | null {
  let cacheKey: string | null = null;

  if (image instanceof HTMLImageElement) {
    cacheKey = imageCacheKey(image);
    const cached = imageMetricsCache.get(image);
    if (cached && cached.key === cacheKey) return cached.metrics;
  }

  try {
    const { width, height } = getSourceSize(image);

    if (!width || !height) return null;

    const sampleScale = Math.min(1, 512 / Math.max(width, height));
    const sampleWidth = Math.max(1, Math.round(width * sampleScale));
    const sampleHeight = Math.max(1, Math.round(height * sampleScale));

    const temp = document.createElement("canvas");
    temp.width = sampleWidth;
    temp.height = sampleHeight;

    const ctx = temp.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;

    ctx.drawImage(image, 0, 0, sampleWidth, sampleHeight);

    const pixels = ctx.getImageData(0, 0, sampleWidth, sampleHeight).data;
    const bounds = computeAlphaBounds(pixels, sampleWidth, sampleHeight, 12);

    let metrics: ImageMetrics;

    if (!bounds) {
      metrics = {
        sx: 0,
        sy: 0,
        sw: width,
        sh: height,
        width,
        height,
      };
    } else {
      const sx = bounds.x0 / sampleScale;
      const sy = bounds.y0 / sampleScale;
      const sw = bounds.width / sampleScale;
      const sh = bounds.height / sampleScale;

      metrics = { sx, sy, sw, sh, width: sw, height: sh };
    }

    if (image instanceof HTMLImageElement && cacheKey) {
      imageMetricsCache.set(image, { key: cacheKey, metrics });
    }

    return metrics;
  } catch (error) {
    console.warn("Try-on: image alpha analysis failed.", error);

    const { width, height } = getSourceSize(image);

    return {
      sx: 0,
      sy: 0,
      sw: width,
      sh: height,
      width,
      height,
    };
  }
}

function getEarringParts(
  image: HTMLImageElement | HTMLCanvasElement
): { left: ImageMetrics; right: ImageMetrics } | null {
  let cacheKey: string | null = null;

  if (image instanceof HTMLImageElement) {
    cacheKey = imageCacheKey(image);
    const cached = earringPartsCache.get(image);
    if (cached && cached.key === cacheKey) return cached.parts;
  }

  let result: { left: ImageMetrics; right: ImageMetrics } | null = null;

  try {
    const { width, height } = getSourceSize(image);

    if (!width || !height) {
      if (image instanceof HTMLImageElement && cacheKey) {
        earringPartsCache.set(image, { key: cacheKey, parts: null });
      }
      return null;
    }

    const sampleWidth = Math.max(1, Math.min(180, Math.round(width)));
    const scale = sampleWidth / width;
    const sampleHeight = Math.max(1, Math.round(height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = sampleWidth;
    canvas.height = sampleHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(image, 0, 0, sampleWidth, sampleHeight);

    const pixels = ctx.getImageData(0, 0, sampleWidth, sampleHeight).data;
    const columns = new Array<number>(sampleWidth).fill(0);

    for (let y = 0; y < sampleHeight; y++) {
      for (let x = 0; x < sampleWidth; x++) {
        if (pixels[(y * sampleWidth + x) * 4 + 3] > 20) {
          columns[x]++;
        }
      }
    }

    let max = 0;
    for (let x = 0; x < sampleWidth; x++) {
      max = Math.max(max, columns[x]);
    }

    let contentMin = -1;
    let contentMax = -1;

    for (let x = 0; x < sampleWidth; x++) {
      if (columns[x] > 0) {
        if (contentMin < 0) contentMin = x;
        contentMax = x;
      }
    }

    const searchStart =
      contentMin >= 0
        ? contentMin + Math.floor((contentMax - contentMin) * 0.25)
        : Math.floor(sampleWidth * 0.25);

    const searchEnd =
      contentMin >= 0
        ? contentMin + Math.ceil((contentMax - contentMin) * 0.75)
        : Math.ceil(sampleWidth * 0.75);

    let split = -1;
    let min = Infinity;

    for (let x = searchStart; x < searchEnd; x++) {
      if (columns[x] < min) {
        min = columns[x];
        split = x;
      }
    }

    // A single earring photo has no clear gap and falls back to the whole
    // image.  A pair has a distinct empty column between the two pieces.
    if (split > 0 && max > 0 && min <= max * 0.5) {
      const bbox = (x0: number, x1: number): ImageMetrics | null => {
        let minX = sampleWidth;
        let minY = sampleHeight;
        let maxX = -1;
        let maxY = -1;

        for (let y = 0; y < sampleHeight; y++) {
          for (let x = x0; x < x1; x++) {
            if (pixels[(y * sampleWidth + x) * 4 + 3] > 20) {
              minX = Math.min(minX, x);
              minY = Math.min(minY, y);
              maxX = Math.max(maxX, x);
              maxY = Math.max(maxY, y);
            }
          }
        }

        if (maxX < minX || maxY < minY) return null;

        return {
          sx: minX / scale,
          sy: minY / scale,
          sw: (maxX - minX + 1) / scale,
          sh: (maxY - minY + 1) / scale,
          width: (maxX - minX + 1) / scale,
          height: (maxY - minY + 1) / scale,
        };
      };

      const left = bbox(0, split);
      const right = bbox(split, sampleWidth);

      if (left && right) result = { left, right };
    }
  } catch (error) {
    console.warn("Try-on: earring split skipped.", error);
  }

  if (image instanceof HTMLImageElement && cacheKey) {
    earringPartsCache.set(image, { key: cacheKey, parts: result });
  }

  return result;
}

// If a future image is opaque, cut the studio background out once instead
// of drawing a white rectangle over the model.
function getRenderableImage(
  image: HTMLImageElement
): HTMLImageElement | HTMLCanvasElement {
  const cacheKey = imageCacheKey(image);
  const cached = processedImageCache.get(image);
  if (cached && cached.key === cacheKey) return cached.image;

  let renderable: HTMLImageElement | HTMLCanvasElement = image;

  try {
    if (!imageHasTransparency(image)) {
      renderable = removeStudioBackground(image);
    }
  } catch (error) {
    console.warn("Try-on: background removal skipped.", error);
  }

  processedImageCache.set(image, { key: cacheKey, image: renderable });

  return renderable;
}

function imageHasTransparency(image: HTMLImageElement): boolean {
  const { width, height } = getSourceSize(image);
  if (!width || !height) return false;

  const scale = Math.min(1, 64 / Math.max(width, height));
  const sampleWidth = Math.max(1, Math.round(width * scale));
  const sampleHeight = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = sampleWidth;
  canvas.height = sampleHeight;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return false;

  ctx.drawImage(image, 0, 0, sampleWidth, sampleHeight);

  const data = ctx.getImageData(0, 0, sampleWidth, sampleHeight).data;
  let transparent = 0;

  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 245) transparent++;
  }

  return transparent > sampleWidth * sampleHeight * 0.02;
}

function removeStudioBackground(image: HTMLImageElement): HTMLCanvasElement | HTMLImageElement {
  const { width, height } = getSourceSize(image);
  if (!width || !height) return image;

  const scale = Math.min(1, 1200 / Math.max(width, height));
  const outWidth = Math.max(1, Math.round(width * scale));
  const outHeight = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = outWidth;
  canvas.height = outHeight;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return image;

  ctx.drawImage(image, 0, 0, outWidth, outHeight);

  const imageData = ctx.getImageData(0, 0, outWidth, outHeight);
  const data = imageData.data;

  const corners = [
    0,
    (outWidth - 1) * 4,
    (outHeight - 1) * outWidth * 4,
    ((outHeight - 1) * outWidth + outWidth - 1) * 4,
  ];

  let bgR = 0;
  let bgG = 0;
  let bgB = 0;

  for (const index of corners) {
    bgR += data[index];
    bgG += data[index + 1];
    bgB += data[index + 2];
  }

  bgR /= corners.length;
  bgG /= corners.length;
  bgB /= corners.length;

  const total = outWidth * outHeight;
  const background = new Uint8Array(total);
  const stack: number[] = [];

  const isBackground = (index: number): boolean => {
    const offset = index * 4;
    const dr = data[offset] - bgR;
    const dg = data[offset + 1] - bgG;
    const db = data[offset + 2] - bgB;

    return Math.sqrt(dr * dr + dg * dg + db * db) < 54;
  };

  const seed = (index: number) => {
    if (!background[index] && isBackground(index)) {
      background[index] = 1;
      stack.push(index);
    }
  };

  for (let x = 0; x < outWidth; x++) {
    seed(x);
    seed((outHeight - 1) * outWidth + x);
  }

  for (let y = 0; y < outHeight; y++) {
    seed(y * outWidth);
    seed(y * outWidth + outWidth - 1);
  }

  while (stack.length) {
    const index = stack.pop() as number;
    const x = index % outWidth;
    const y = (index - x) / outWidth;

    if (x > 0) seed(index - 1);
    if (x < outWidth - 1) seed(index + 1);
    if (y > 0) seed(index - outWidth);
    if (y < outHeight - 1) seed(index + outWidth);
  }

  const visited = new Uint8Array(total);
  const minHoleArea = Math.max(200, Math.floor(total * 0.02));

  for (let start = 0; start < total; start++) {
    if (background[start] || visited[start] || !isBackground(start)) continue;

    const component: number[] = [];
    const localStack = [start];
    visited[start] = 1;
    let touchesBorder = false;

    while (localStack.length) {
      const index = localStack.pop() as number;
      const x = index % outWidth;
      const y = (index - x) / outWidth;

      component.push(index);

      if (x === 0 || y === 0 || x === outWidth - 1 || y === outHeight - 1) {
        touchesBorder = true;
      }

      const neighbours: number[] = [];
      if (x > 0) neighbours.push(index - 1);
      if (x < outWidth - 1) neighbours.push(index + 1);
      if (y > 0) neighbours.push(index - outWidth);
      if (y < outHeight - 1) neighbours.push(index + outWidth);

      for (const neighbour of neighbours) {
        if (
          !visited[neighbour] &&
          !background[neighbour] &&
          isBackground(neighbour)
        ) {
          visited[neighbour] = 1;
          localStack.push(neighbour);
        }
      }
    }

    if (touchesBorder || component.length >= minHoleArea) {
      for (const index of component) background[index] = 1;
    }
  }

  for (let index = 0; index < total; index++) {
    if (background[index]) data[index * 4 + 3] = 0;
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas;
}

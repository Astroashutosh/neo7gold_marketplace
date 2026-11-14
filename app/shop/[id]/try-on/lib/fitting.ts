import type { AnalysisResult, Landmark } from "./mediapipe";

/**
 * Pure fitting geometry for the virtual try-on.
 *
 * This module deliberately has no DOM or image dependencies so the exact same
 * calculations can be validated outside the browser.  All values are returned
 * in source-image coordinates; render.ts converts them to canvas coordinates
 * with the single object-fit mapping.
 */

export type TryOnFit = {
  /** Visible height/width reference in centimetres. */
  widthCm: number;
  /** Optional physical height for hanging pieces such as earrings. */
  heightCm?: number;
  rotation?: number;
  verticalOffset?: number;
  horizontalOffset?: number;
  /** Retained for data compatibility; never used for necklace sizing. */
  scale?: number;
};

export type Point = { x: number; y: number };

export type ModelAnatomy = {
  sourceWidth: number;
  sourceHeight: number;
  chin: Point | null;
  neckBaseLeft: Point;
  neckBaseRight: Point;
  neckBaseCenter: Point;
  neckWidthPx: number;
  neckWidthCm: number;
  neckBaseWidthPx: number;
  collarboneWidthPx: number;
  shoulderWidthPx: number;
  headWidthPx: number;
  faceHeightPx: number;
  pxPerCm: number;
  shoulderAngle: number;
  faceAngle: number;
  centerX: number;
  neckBaseY: number;
  confidence: number;
};

export type NecklaceWidthResult = {
  widthPx: number;
  targetWidthCm: number;
  actualWidthCm: number;
  minWidthPx: number;
  maxWidthPx: number;
  clamped: boolean;
  productFitRatio: number;
  neckWidthCm: number;
};

export type NecklaceFitResult = NecklaceWidthResult & {
  heightPx: number;
  topY: number;
  centerX: number;
  angle: number;
  visibleAspect: number;
};

export type RenderBox = {
  width: number;
  height: number;
  visibleAspect: number;
};

const MIN_VISIBILITY = 0.45;
export const SHOULDER_WIDTH_CM = 40;
export const HEAD_WIDTH_CM = 15;

// Anthropometric relationship used only to estimate the neck column from the
// jaw.  It is not a product scaling factor.
const NECK_TO_JAW_RATIO = 0.62;
const NECK_BASE_TO_NECK_RATIO = 1.35;

export function visiblePoint(
  points: Landmark[] | null | undefined,
  index: number
): Landmark | null {
  if (!points?.[index]) return null;

  const point = points[index];

  if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) return null;

  // Face/hand landmarks report visibility as 0 even when valid. Only apply
  // the threshold to real pose visibility values.
  if (
    Number.isFinite(point.visibility) &&
    Number(point.visibility) > 0 &&
    Number(point.visibility) < MIN_VISIBILITY
  ) {
    return null;
  }

  return point;
}

export function pixelDistance(
  a: Landmark | Point,
  b: Landmark | Point,
  sourceWidth: number,
  sourceHeight: number
): number {
  return Math.hypot((a.x - b.x) * sourceWidth, (a.y - b.y) * sourceHeight);
}

export function averagePoint(
  a: Landmark | null | undefined,
  b: Landmark | null | undefined
): Landmark | null {
  if (!a || !b) return a || b || null;

  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}

export function lerpPoint(
  a: Point | null | undefined,
  b: Point | null | undefined,
  t: number
): Point | null {
  if (!a || !b) return a || b || null;
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  };
}

/**
 * Screen-space line tilt wrapped to +/-90 degrees so a necklace or a pair of
 * earrings is never flipped upside down by landmark ordering.
 */
export function tiltAngle(
  a: Point,
  b: Point,
  sourceWidth: number,
  sourceHeight: number
): number {
  let angle = Math.atan2(
    (b.y - a.y) * sourceHeight,
    (b.x - a.x) * sourceWidth
  );

  if (angle > Math.PI / 2) angle -= Math.PI;
  if (angle < -Math.PI / 2) angle += Math.PI;

  return angle;
}

export function degToRad(degrees: number | undefined): number {
  const value = Number(degrees);
  return Number.isFinite(value) ? (value * Math.PI) / 180 : 0;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizedFallback(value: number | null | undefined): number {
  return Number.isFinite(value) ? Number(value) : 0.5;
}

/**
 * Measure the model once per frame.  The returned anatomy contains the neck
 * column, neck-base anchors, collarbone span and the image-to-centimetre
 * calibration.  Product calculations only consume this object; they never
 * re-use a previous product's scale.
 */
export function measureModelAnatomy(
  result: AnalysisResult | null,
  sourceWidth: number,
  sourceHeight: number
): ModelAnatomy | null {
  if (!result || !sourceWidth || !sourceHeight) return null;

  const face = result.faceLandmarks;
  const pose = result.poseLandmarks;

  const chin = visiblePoint(face, 152);
  const leftEar = visiblePoint(face, 234);
  const rightEar = visiblePoint(face, 454);
  const leftJaw = visiblePoint(face, 132);
  const rightJaw = visiblePoint(face, 361);
  const leftShoulder = visiblePoint(pose, 11);
  const rightShoulder = visiblePoint(pose, 12);

  const headWidthPx =
    leftEar && rightEar
      ? pixelDistance(leftEar, rightEar, sourceWidth, sourceHeight)
      : 0;

  const jawWidthPx =
    leftJaw && rightJaw
      ? pixelDistance(leftJaw, rightJaw, sourceWidth, sourceHeight)
      : 0;

  const shoulderWidthPx =
    leftShoulder && rightShoulder
      ? pixelDistance(leftShoulder, rightShoulder, sourceWidth, sourceHeight)
      : 0;

  if (!headWidthPx && !jawWidthPx && !shoulderWidthPx) return null;

  const pxPerCm =
    shoulderWidthPx > 0
      ? shoulderWidthPx / SHOULDER_WIDTH_CM
      : headWidthPx > 0
        ? headWidthPx / HEAD_WIDTH_CM
        : jawWidthPx / 12;

  const brow = visiblePoint(face, 10) || visiblePoint(face, 168);
  const faceHeightPx =
    brow && chin
      ? pixelDistance(brow, chin, sourceWidth, sourceHeight)
      : (headWidthPx || jawWidthPx) * 1.15;

  const faceCenterX = chin
    ? chin.x
    : leftEar && rightEar
      ? (leftEar.x + rightEar.x) / 2
      : leftJaw && rightJaw
        ? (leftJaw.x + rightJaw.x) / 2
        : 0.5;

  const shoulderMidX =
    leftShoulder && rightShoulder
      ? (leftShoulder.x + rightShoulder.x) / 2
      : null;

  let neckBaseLeft: Point | null = null;
  let neckBaseRight: Point | null = null;

  if (chin && leftShoulder && rightShoulder) {
    // 42% from the chin to the acromion lands on the neck-base/
    // trapezius line for a front-facing portrait.
    neckBaseLeft = lerpPoint(chin, leftShoulder, 0.42);
    neckBaseRight = lerpPoint(chin, rightShoulder, 0.42);
  } else if (chin) {
    const estimatedNeckWidth =
      (jawWidthPx || headWidthPx * 0.9 || shoulderWidthPx * 0.28) *
      NECK_TO_JAW_RATIO;
    const halfBase =
      (estimatedNeckWidth * NECK_BASE_TO_NECK_RATIO) / sourceWidth / 2;
    const y = chin.y + (faceHeightPx / sourceHeight) * 0.22;

    neckBaseLeft = { x: faceCenterX - halfBase, y };
    neckBaseRight = { x: faceCenterX + halfBase, y };
  }

  if (!neckBaseLeft || !neckBaseRight) return null;

  // Pose landmarks are left/right relative to the person; in a mirrored or
  // rotated frame x order can change. Keep left as viewer-left.
  if (neckBaseLeft.x > neckBaseRight.x) {
    [neckBaseLeft, neckBaseRight] = [neckBaseRight, neckBaseLeft];
  }

  const neckBaseWidthPx = pixelDistance(
    neckBaseLeft,
    neckBaseRight,
    sourceWidth,
    sourceHeight
  );

  const measuredNeckWidthPx =
    jawWidthPx > 0
      ? jawWidthPx * NECK_TO_JAW_RATIO
      : headWidthPx > 0
        ? headWidthPx * 0.55
        : neckBaseWidthPx / NECK_BASE_TO_NECK_RATIO;

  const neckWidthPx = clamp(
    measuredNeckWidthPx,
    neckBaseWidthPx * 0.45,
    neckBaseWidthPx * 0.92
  );

  // A lower interpolation along the same chin→shoulder lines gives the
  // collarbone span.  It is used as an anatomical guard, never as the
  // necklace's own size.
  let collarboneWidthPx = neckBaseWidthPx * 1.25;
  if (chin && leftShoulder && rightShoulder) {
    const collarLeft = lerpPoint(chin, leftShoulder, 0.56);
    const collarRight = lerpPoint(chin, rightShoulder, 0.56);
    if (collarLeft && collarRight) {
      collarboneWidthPx = pixelDistance(
        collarLeft,
        collarRight,
        sourceWidth,
        sourceHeight
      );
    }
  }

  const neckBaseCenter = {
    x: (neckBaseLeft.x + neckBaseRight.x) / 2,
    y: (neckBaseLeft.y + neckBaseRight.y) / 2,
  };

  const neckBaseY =
    neckBaseCenter.y + (faceHeightPx / sourceHeight) * 0.08;

  const shoulderAngle =
    leftShoulder && rightShoulder
      ? tiltAngle(leftShoulder, rightShoulder, sourceWidth, sourceHeight)
      : 0;

  const faceAngle =
    leftEar && rightEar
      ? tiltAngle(leftEar, rightEar, sourceWidth, sourceHeight)
      : 0;

  const centerX =
    shoulderMidX === null
      ? neckBaseCenter.x
      : neckBaseCenter.x * 0.7 + faceCenterX * 0.3;

  const confidence =
    (shoulderWidthPx > 0 ? 0.45 : 0) +
    (headWidthPx > 0 ? 0.25 : 0) +
    (jawWidthPx > 0 ? 0.2 : 0) +
    (chin ? 0.1 : 0);

  return {
    sourceWidth,
    sourceHeight,
    chin: chin ? { x: chin.x, y: chin.y } : null,
    neckBaseLeft: { ...neckBaseLeft },
    neckBaseRight: { ...neckBaseRight },
    neckBaseCenter,
    neckWidthPx,
    neckWidthCm: neckWidthPx / pxPerCm,
    neckBaseWidthPx,
    collarboneWidthPx,
    shoulderWidthPx,
    headWidthPx,
    faceHeightPx,
    pxPerCm,
    shoulderAngle,
    faceAngle,
    centerX,
    neckBaseY,
    confidence,
  };
}

/**
 * Per-product width calculation.  `fit.widthCm` is the piece's own visible
 * horizontal span (the calibration reference), never a universal necklace
 * width.  Anatomy supplies the pixel-per-centimetre calibration and the
 * guard rails.
 */
export function computeNecklaceWidth(
  anatomy: ModelAnatomy,
  fit: TryOnFit
): NecklaceWidthResult {
  const neckWidthCm = anatomy.neckWidthPx / anatomy.pxPerCm;

  const referenceWidthCm = Number.isFinite(fit.widthCm) && fit.widthCm > 0
    ? Number(fit.widthCm)
    : neckWidthCm * 1.7;

  const rawWidthPx = referenceWidthCm * anatomy.pxPerCm;
  const minWidthPx = anatomy.neckWidthPx * 1.05;
  const maxWidthPx = Math.min(
    anatomy.shoulderWidthPx > 0
      ? anatomy.shoulderWidthPx * 0.72
      : Number.POSITIVE_INFINITY,
    anatomy.collarboneWidthPx * 1.15
  );

  const widthPx = clamp(rawWidthPx, minWidthPx, maxWidthPx);
  const actualWidthCm = widthPx / anatomy.pxPerCm;

  return {
    widthPx,
    targetWidthCm: referenceWidthCm,
    actualWidthCm,
    minWidthPx,
    maxWidthPx,
    clamped: Math.abs(widthPx - rawWidthPx) > 0.01,
    productFitRatio: actualWidthCm / neckWidthCm,
    neckWidthCm,
  };
}

/**
 * Full necklace fit.  Height is *always* the visible image aspect multiplied
 * by the fitted width; heightCm is intentionally ignored for necklaces.
 */
export function computeNecklaceFit(
  anatomy: ModelAnatomy,
  fit: TryOnFit,
  visibleAspect: number
): NecklaceFitResult {
  const widthResult = computeNecklaceWidth(anatomy, fit);
  const aspect =
    Number.isFinite(visibleAspect) && visibleAspect > 0
      ? Number(visibleAspect)
      : 0.5;

  const verticalOffset = Number.isFinite(fit.verticalOffset)
    ? Number(fit.verticalOffset)
    : 0;
  const nudgePx = verticalOffset * anatomy.faceHeightPx * 0.6;

  // The top of the chain sits just below the jaw where it passes behind the
  // neck.  This is derived from measured anatomy (no fixed pixel offset), and
  // the bottom follows from the product's own aspect.
  // neckBaseY is normalized; convert it to source pixels before mixing it
  // with faceHeightPx/nudgePx, then normalize the final top edge once.
  const neckBaseYPx = anatomy.neckBaseY * anatomy.sourceHeight;
  const topYPx =
    neckBaseYPx - anatomy.faceHeightPx * 0.2 + nudgePx;

  const angleBase =
    anatomy.shoulderWidthPx > 0 ? anatomy.shoulderAngle : anatomy.faceAngle * 0.5;

  return {
    ...widthResult,
    heightPx: widthResult.widthPx * aspect,
    topY: clamp(topYPx / anatomy.sourceHeight, 0.02, 0.95),
    centerX: clamp(anatomy.centerX, 0, 1),
    angle: angleBase + degToRad(fit.rotation),
    visibleAspect: aspect,
  };
}

/** Aspect-locked final render box (canvas pixels). */
export function computeNecklaceRenderBox(
  placementWidthPx: number,
  mappingScale: number,
  sizeMultiplier: number,
  visibleAspect: number
): RenderBox {
  const width = placementWidthPx * mappingScale * sizeMultiplier;
  const aspect =
    Number.isFinite(visibleAspect) && visibleAspect > 0
      ? Number(visibleAspect)
      : 0.5;

  return {
    width,
    height: width * aspect,
    visibleAspect: aspect,
  };
}

export function computeFallbackNecklaceFit(
  sourceWidth: number,
  sourceHeight: number,
  fit: TryOnFit,
  visibleAspect: number
): NecklaceFitResult {
  const widthPx = sourceWidth * 0.34;
  const aspect =
    Number.isFinite(visibleAspect) && visibleAspect > 0
      ? Number(visibleAspect)
      : 0.5;
  const pxPerCm = sourceWidth * 0.01;

  return {
    widthPx,
    heightPx: widthPx * aspect,
    topY: 0.34,
    centerX: 0.5,
    angle: degToRad(fit.rotation),
    visibleAspect: aspect,
    targetWidthCm: widthPx / pxPerCm,
    actualWidthCm: widthPx / pxPerCm,
    minWidthPx: 0,
    maxWidthPx: Number.POSITIVE_INFINITY,
    clamped: false,
    productFitRatio: 0,
    neckWidthCm: 0,
  };
}

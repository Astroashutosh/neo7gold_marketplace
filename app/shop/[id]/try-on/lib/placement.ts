import type { TryOnAsset, TryOnType } from "../../../data/tryon";
import type { AnalysisResult, Landmark } from "./mediapipe";
import {
  averagePoint,
  clamp,
  computeNecklaceWidth,
  degToRad,
  HEAD_WIDTH_CM,
  measureModelAnatomy,
  pixelDistance,
  tiltAngle,
  visiblePoint,
  type ModelAnatomy,
  type TryOnFit,
} from "./fitting";

export type { TryOnFit } from "./fitting";
export {
  averagePoint,
  degToRad,
  pixelDistance,
  tiltAngle,
  visiblePoint,
} from "./fitting";

export type Placement = {
  x: number;
  y: number;
  width: number;
  pxPerCm: number;
  angle: number;
  widthPx?: number;
  centerY?: number;
  leftEar?: { x: number; y: number };
  rightEar?: { x: number; y: number };
  leftScale?: number;
  rightScale?: number;
  topAnchor?: boolean;
  /** Measured model anatomy used for this placement (necklaces only). */
  model?: ModelAnatomy;
  referenceWidthCm?: number;
  targetWidthCm?: number;
  clamped?: boolean;
  productFitRatio?: number;
};

const PALM_WIDTH_CM = 8;
const WRIST_WIDTH_CM = 5.5;

const DEFAULT_FIT: Record<TryOnType, TryOnFit> = {
  necklace: { widthCm: 20, verticalOffset: 0.04, rotation: 0 },
  earrings: { widthCm: 0.9, verticalOffset: 0.06, rotation: 0 },
  ring: { widthCm: 1.9, verticalOffset: 0.16, rotation: 0 },
  bracelet: { widthCm: 6.3, verticalOffset: 0, rotation: 0 },
};

export const RING_ROTATION = 0;

// export function getFitForAsset(asset: TryOnAsset): TryOnFit {
//   return {
//     ...DEFAULT_FIT[asset.type],
//     widthCm: asset.widthCm,
//     heightCm: asset.heightCm,
//     rotation: asset.rotation,
//     verticalOffset: asset.verticalOffset,
//     horizontalOffset: asset.horizontalOffset,
//   };
// }

export function getFitForAsset(asset: TryOnAsset): TryOnFit {
  const defaults = DEFAULT_FIT[asset.type];
  const isNecklace = asset.type === "necklace";

  // Necklaces are sized by their own visible horizontal span when worn.
  // heightCm is deliberately not passed through: height comes from the
  // asset's visible content aspect at render time.
  const widthCm = isNecklace
    ? asset.wornWidthCm ?? asset.widthCm ?? defaults.widthCm
    : asset.widthCm ?? defaults.widthCm;

  return {
    ...defaults,
    widthCm,
    heightCm: isNecklace
      ? undefined
      : asset.heightCm ?? defaults.heightCm,
    rotation: asset.rotation ?? defaults.rotation,
    verticalOffset: asset.verticalOffset ?? defaults.verticalOffset,
    horizontalOffset: asset.horizontalOffset ?? defaults.horizontalOffset,
  };
}

export function getFallbackPlacement(
  type: TryOnType,
  sourceWidth: number,
  sourceHeight: number
): Placement | null {
  if (!sourceWidth || !sourceHeight) return null;

  const unit = Math.min(sourceWidth, sourceHeight);

  if (type === "necklace") {
    return {
      x: 0.5,
      y: 0.34,
      width: sourceWidth * 0.34,
      pxPerCm: sourceWidth * 0.01,
      angle: 0,
      topAnchor: true,
    };
  }

  if (type === "earrings") {
    const earX = 0.13;
    const earY = 0.32;

    return {
      x: 0.5,
      y: earY,
      width: sourceWidth * 0.23,
      pxPerCm: sourceWidth * 0.02,
      widthPx: sourceWidth * 0.055,
      leftEar: { x: 0.5 - earX, y: earY },
      rightEar: { x: 0.5 + earX, y: earY },
      angle: 0,
    };
  }

  if (type === "ring") {
    return {
      x: 0.5,
      y: 0.55,
      width: unit * 0.08,
      pxPerCm: unit * 0.01,
      angle: 0,
    };
  }

  if (type === "bracelet") {
    return {
      x: 0.5,
      y: 0.66,
      width: unit * 0.2,
      pxPerCm: unit * 0.02,
      angle: 0,
    };
  }


  return null;
}

export function pickHand(
  handLandmarks: Landmark[][] | null | undefined,
  requiredIndices: number[] = []
): Landmark[] | null {
  if (!Array.isArray(handLandmarks) || !handLandmarks.length) return null;

  let best: Landmark[] | null = null;
  let bestScore = -Infinity;

  for (const hand of handLandmarks) {
    if (!Array.isArray(hand) || hand.length < 21) continue;

    let score = hand.reduce(
      (sum, point) =>
        sum +
        (Number.isFinite(point?.visibility) ? Number(point.visibility) : 0.8),
      0
    );

    for (const index of requiredIndices) {
      if (!visiblePoint(hand, index)) score -= 4;
    }

    if (score > bestScore) {
      bestScore = score;
      best = hand;
    }
  }

  return best;
}

export function getPlacement(
  type: TryOnType,
  result: AnalysisResult | null,
  sourceWidth: number,
  sourceHeight: number,
  fit: TryOnFit
): Placement | null {
  if (!result || !sourceWidth || !sourceHeight) return null;

  if (type === "necklace") {
    const anatomy = measureModelAnatomy(result, sourceWidth, sourceHeight);
    if (!anatomy) return null;

    const widthResult = computeNecklaceWidth(anatomy, fit);
    const faceHeightNorm = anatomy.faceHeightPx / sourceHeight;
    const verticalOffset = Number.isFinite(fit.verticalOffset)
      ? Number(fit.verticalOffset)
      : 0;
    const nudgeNorm = verticalOffset * faceHeightNorm * 0.6;

    // neckBaseY and faceHeight are both normalized here.  Mixing normalized
    // neckBaseY with pixel faceHeightPx was pushing the anchor to y≈0.02.
    const neckLineY = anatomy.chin
      ? anatomy.chin.y +
        (anatomy.neckBaseCenter.y - anatomy.chin.y) * 0.35
      : anatomy.neckBaseY - faceHeightNorm * 0.25;
    const topYNorm = neckLineY - faceHeightNorm * 0.07 + nudgeNorm;

    return {
      x: anatomy.neckBaseCenter.x,
      y: Math.max(0.02, Math.min(0.95, topYNorm)),
      width: widthResult.widthPx,
      pxPerCm: anatomy.pxPerCm,
      angle:
        (anatomy.shoulderWidthPx > 0
          ? anatomy.shoulderAngle
          : anatomy.faceAngle * 0.5) + degToRad(fit.rotation),
      topAnchor: true,
      model: anatomy,
      referenceWidthCm: widthResult.targetWidthCm,
      targetWidthCm: widthResult.actualWidthCm,
      clamped: widthResult.clamped,
      productFitRatio: widthResult.productFitRatio,
    };
  }

  if (type === "earrings") {
    const face = result.faceLandmarks;
    if (!face || face.length < 455) return null;

    const leftTragus = visiblePoint(face, 234);
    const rightTragus = visiblePoint(face, 454);
    const leftJaw = visiblePoint(face, 132);
    const rightJaw = visiblePoint(face, 361);

    if (!leftTragus || !rightTragus) return null;

    const earDistance = pixelDistance(
      leftTragus,
      rightTragus,
      sourceWidth,
      sourceHeight
    );

    if (earDistance <= 0) return null;

    const pxPerCm = earDistance / HEAD_WIDTH_CM;

    const brow = visiblePoint(face, 10) || visiblePoint(face, 168);
    const chin = visiblePoint(face, 152);

    const faceHeight =
      brow && chin
        ? pixelDistance(brow, chin, sourceWidth, sourceHeight)
        : earDistance * 1.15;

    const leftEye = averagePoint(face[33], face[133]);
    const rightEye = averagePoint(face[263], face[362]);

    const roll =
      leftEye && rightEye
        ? tiltAngle(leftEye, rightEye, sourceWidth, sourceHeight)
        : 0;

    const centerX = (leftTragus.x + rightTragus.x) / 2;
    const outward = (earDistance * 0.035) / sourceWidth;
    const down = (faceHeight * 0.05) / sourceHeight;

    const lobeFor = (tragus: Landmark, jaw: Landmark | null) => {
      const base = jaw
        ? {
            x: tragus.x + (jaw.x - tragus.x) * 0.35,
            y: tragus.y + (jaw.y - tragus.y) * 0.35,
          }
        : { x: tragus.x, y: tragus.y };

      const direction = Math.sign(base.x - centerX) || 1;

      return {
        x: base.x + direction * outward,
        y: base.y + down,
      };
    };

    const leftLobe = lobeFor(leftTragus, leftJaw);
    const rightLobe = lobeFor(rightTragus, rightJaw);

    const nose = visiblePoint(face, 1) || visiblePoint(face, 4);
    const eyeMidX =
      leftEye && rightEye ? (leftEye.x + rightEye.x) / 2 : centerX;

    const halfHead = Math.max(0.0001, earDistance / sourceWidth / 2);

    const yaw = nose
      ? Math.max(-1, Math.min(1, (nose.x - eyeMidX) / halfHead))
      : 0;

    const nearScale = 1 + Math.abs(yaw) * 0.12;
    const farScale = 1 - Math.abs(yaw) * 0.18;

    const lobeOffset = Number.isFinite(fit.verticalOffset)
      ? Number(fit.verticalOffset) * (faceHeight / sourceHeight)
      : 0;



    return {
      x: (leftLobe.x + rightLobe.x) / 2,
      y: (leftLobe.y + rightLobe.y) / 2 + lobeOffset - (15 / sourceHeight),
      width: earDistance,
      widthPx: fit.widthCm * pxPerCm * 1.6,
      pxPerCm,
      leftEar: {
        x: leftLobe.x + (8 / sourceWidth),
        y: leftLobe.y + lobeOffset - (15 / sourceHeight),
      },
      rightEar: {
        x: rightLobe.x,
        y: rightLobe.y + lobeOffset - (15 / sourceHeight),
      },
      leftScale: (yaw >= 0 ? farScale : nearScale) * 1.15,
      rightScale: (yaw >= 0 ? nearScale : farScale) * 1.15,
      angle: roll * 0.35 + degToRad(fit.rotation),
    };


  }

  if (type === "ring" || type === "bracelet") {
    const requiredIndices =
      type === "ring" ? [13, 14, 5, 17] : [0, 5, 17];

    const hand = pickHand(result.handLandmarks, requiredIndices);
    if (!hand) return null;

    if (type === "ring") {
      const mcp = visiblePoint(hand, 13);
      const pip = visiblePoint(hand, 14);
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

      const pxPerCm = palmWidth / PALM_WIDTH_CM;

      const t = Math.min(
        0.9,
        Math.max(
          0.05,
          0.18 + (Number.isFinite(fit.verticalOffset) ? Number(fit.verticalOffset) : 0)
        )
      );

      const fingerLength = pixelDistance(
        mcp,
        pip,
        sourceWidth,
        sourceHeight
      );
      const fingerScale = clamp(
        fingerLength / Math.max(1, palmWidth * 0.32),
        0.85,
        1.25
      );

      // Align the band perpendicular to the detected finger direction so the
      // ring follows the hand instead of staying screen-upright.
      const fingerAngle = Math.atan2(
        (pip.y - mcp.y) * sourceHeight,
        (pip.x - mcp.x) * sourceWidth
      );
      let ringAngle =
        fingerAngle + Math.PI / 2 + degToRad(fit.rotation);
      if (ringAngle > Math.PI / 2) ringAngle -= Math.PI;
      if (ringAngle < -Math.PI / 2) ringAngle += Math.PI;

      return {
        x: mcp.x + (pip.x - mcp.x) * t + (8 / sourceWidth),
        y: mcp.y + (pip.y - mcp.y) * t - (100 / sourceHeight),
        width: fit.widthCm * pxPerCm * 1.2 * fingerScale,
        pxPerCm,
        angle: ringAngle,
      };

    }

    const wrist = visiblePoint(hand, 0);
    const indexMcp = visiblePoint(hand, 5);
    const pinkyMcp = visiblePoint(hand, 17);
    const middleMcp = visiblePoint(hand, 9);

    if (!wrist || !indexMcp || !pinkyMcp) return null;

    const palmWidth = pixelDistance(
      indexMcp,
      pinkyMcp,
      sourceWidth,
      sourceHeight
    );

    if (palmWidth <= 0) return null;

    const wristWidth = palmWidth * (WRIST_WIDTH_CM / PALM_WIDTH_CM);
    const pxPerCm = wristWidth / WRIST_WIDTH_CM;

    const forearmAngle = middleMcp
      ? Math.atan2(
          (middleMcp.y - wrist.y) * sourceHeight,
          (middleMcp.x - wrist.x) * sourceWidth
        )
      : Math.atan2(
          (pinkyMcp.y - indexMcp.y) * sourceHeight,
          (pinkyMcp.x - indexMcp.x) * sourceWidth
        );

    let x = wrist.x + (15 / sourceWidth);
    let y = wrist.y;

    if (middleMcp) {
      const dxPx = (wrist.x - middleMcp.x) * sourceWidth;
      const dyPx = (wrist.y - middleMcp.y) * sourceHeight;
      const length = Math.hypot(dxPx, dyPx) || 1;
      const shiftPx = wristWidth * 0.25;

      x += (dxPx / length) * shiftPx / sourceWidth;
      y += (dyPx / length) * shiftPx / sourceHeight;
    }

    if (Number.isFinite(fit.verticalOffset)) {
      y += Number(fit.verticalOffset) * (wristWidth / sourceHeight);
    }

    return {
      x,
      y,  
      width: fit.widthCm * pxPerCm * 1.2,
      pxPerCm,
      angle: forearmAngle + Math.PI / 2 + degToRad(fit.rotation),
    };
  }

  return null;
}



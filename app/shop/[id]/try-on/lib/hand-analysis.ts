import { analyzeSource, type AnalysisResult } from "./mediapipe";

export type HandAnalysisFrame = {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  drawWidth: number;
  drawHeight: number;
  offsetX: number;
  offsetY: number;
};

/**
 * The hand photograph is tightly cropped.  MediaPipe's palm detector works
 * much more reliably when the hand sits inside a padded, portrait frame, so
 * the photo is centred on white before analysis and the landmarks are mapped
 * back to the original photo afterwards.
 */
export function buildHandAnalysisFrame(
  photo: HTMLImageElement,
  handWidthRatio: number
): HandAnalysisFrame | null {
  const naturalWidth = photo.naturalWidth;
  const naturalHeight = photo.naturalHeight;

  if (!naturalWidth || !naturalHeight) return null;

  const width = 1200;
  const height = 1800;
  const ratio = Number.isFinite(handWidthRatio) ? handWidthRatio : 0.56;

  const drawWidth = Math.max(1, Math.round(naturalWidth * ratio));
  const drawHeight = Math.max(1, Math.round(naturalHeight * ratio));
  const offsetX = Math.round((width - drawWidth) / 2);
  const offsetY = Math.round((height - drawHeight) / 2);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(photo, offsetX, offsetY, drawWidth, drawHeight);

  return { canvas, width, height, drawWidth, drawHeight, offsetX, offsetY };
}

export function remapHandResult(
  result: AnalysisResult,
  frame: HandAnalysisFrame
): AnalysisResult {
  const handLandmarks = result.handLandmarks.map((points) =>
    points.map((point) => ({
      ...point,
      x: (point.x * frame.width - frame.offsetX) / frame.drawWidth,
      y: (point.y * frame.height - frame.offsetY) / frame.drawHeight,
    }))
  );

  return { ...result, handLandmarks };
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

/**
 * Analyse the dedicated hand photo with progressively wider padded frames
 * until a hand is found.  Returns null when the model cannot be reached so
 * the caller can fall back to manual placement without breaking the UI.
 */
export async function analyzeHandPhoto(
  photo: HTMLImageElement | null
): Promise<AnalysisResult | null> {
  if (!photo?.complete || !photo.naturalWidth) return null;

  const ratios = [0.56, 0.44, 0.66];

  for (const ratio of ratios) {
    const frame = buildHandAnalysisFrame(photo, ratio);
    if (!frame) continue;

    let result: AnalysisResult | null = null;

    for (let attempt = 0; attempt < 15; attempt++) {
      result = await analyzeSource(frame.canvas, ["hand"]);

      if (result && !result.busy) break;

      await wait(100);
    }

    if (!result || result.busy) continue;

    if (result.handLandmarks.length) {
      return remapHandResult(result, frame);
    }
  }

  // No hand found at any padding ratio.  Return the last empty result so the
  // renderer can use its manual fallback position.
  const frame = buildHandAnalysisFrame(photo, ratios[0]);
  if (!frame) return null;

  const result = await analyzeSource(frame.canvas, ["hand"]);
  return result && !result.busy ? remapHandResult(result, frame) : null;
}

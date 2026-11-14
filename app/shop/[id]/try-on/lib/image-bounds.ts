/**
 * Pure alpha-channel content bounds.  Shared by the renderer and the
 * validation suite so transparent padding is handled identically in both.
 */
export type AlphaBounds = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  width: number;
  height: number;
};

export function computeAlphaBounds(
  pixels: Uint8ClampedArray | Uint8Array,
  width: number,
  height: number,
  alphaThreshold = 12
): AlphaBounds | null {
  if (!width || !height || pixels.length < width * height * 4) return null;

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * width * 4;

    for (let x = 0; x < width; x++) {
      const alpha = pixels[rowOffset + x * 4 + 3];

      if (alpha > alphaThreshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < minX || maxY < minY) return null;

  return {
    x0: minX,
    y0: minY,
    x1: maxX,
    y1: maxY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
}

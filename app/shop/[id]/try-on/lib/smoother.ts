/**
 * Exponential Moving Average smoother for landmark coordinates.
 * Keeps jewellery firmly attached to body landmarks without lag.
 */

export type SmoothedPoint = { x: number; y: number };

export class PointSmoother {
  private x: number | null = null;
  private y: number | null = null;
  private readonly alpha: number;

  /** alpha: 0 = frozen, 1 = no smoothing. 0.25–0.4 is good for jewellery. */
  constructor(alpha = 0.3) {
    this.alpha = alpha;
  }

  update(x: number, y: number): SmoothedPoint {
    if (this.x === null) {
      this.x = x;
      this.y = y;
    } else {
      this.x = this.alpha * x + (1 - this.alpha) * this.x;
      this.y = this.alpha * y + (1 - this.alpha) * this.y;
    }
    return { x: this.x, y: this.y! };
  }

  reset(): void {
    this.x = null;
    this.y = null;
  }

  get initialized(): boolean {
    return this.x !== null;
  }
}

export class ScalarSmoother {
  private value: number | null = null;
  private readonly alpha: number;

  constructor(alpha = 0.25) {
    this.alpha = alpha;
  }

  update(v: number): number {
    if (this.value === null) {
      this.value = v;
    } else {
      this.value = this.alpha * v + (1 - this.alpha) * this.value;
    }
    return this.value;
  }

  reset(): void {
    this.value = null;
  }

  get current(): number | null {
    return this.value;
  }
}

/**
 * Per-type smoothers for all placement parameters.
 * One instance per jewellery type, shared across frames.
 */
export class PlacementSmoother {
  readonly x = new PointSmoother(0.28);
  readonly angle = new ScalarSmoother(0.2);
  readonly width = new ScalarSmoother(0.2);
  // Earring-specific
  readonly leftEar = new PointSmoother(0.28);
  readonly rightEar = new PointSmoother(0.28);
  readonly leftScale = new ScalarSmoother(0.2);
  readonly rightScale = new ScalarSmoother(0.2);

  reset(): void {
    this.x.reset();
    this.angle.reset();
    this.width.reset();
    this.leftEar.reset();
    this.rightEar.reset();
    this.leftScale.reset();
    this.rightScale.reset();
  }
}

/** One smoother per jewellery type. */
export type SmootherMap = Record<string, PlacementSmoother>;

export function getOrCreateSmoother(
  map: SmootherMap,
  key: string
): PlacementSmoother {
  if (!map[key]) map[key] = new PlacementSmoother();
  return map[key];
}

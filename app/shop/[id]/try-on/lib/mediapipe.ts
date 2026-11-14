import { siteAsset } from "../../../../site";

export type Landmark = {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
};

export type AnalysisResult = {
  faceLandmarks: Landmark[] | null;
  handLandmarks: Landmark[][];
  poseLandmarks: Landmark[] | null;
  faceDetected: boolean;
  handsDetected: number;
  poseDetected: boolean;
  busy?: boolean;
};

export type TaskKey = "face" | "hand" | "pose";

function getBase(): string {
  return siteAsset("tryon");
}

function getWasmUrl(): string { return `${getBase()}/vendor/mediapipe/wasm`; }
function getModelUrl(key: TaskKey): string {
  const names: Record<TaskKey, string> = {
    face: "face_landmarker.task",
    hand: "hand_landmarker.task",
    pose: "pose_landmarker_lite.task",
  };
  return `${getBase()}/models/mediapipe/${names[key]}`;
}

type VisionModule = {
  FilesetResolver: {
    forVisionTasks: (path: string) => Promise<unknown>;
  };
  FaceLandmarker: {
    createFromOptions: (vision: unknown, options: unknown) => Promise<LandmarkTask>;
  };
  HandLandmarker: {
    createFromOptions: (vision: unknown, options: unknown) => Promise<LandmarkTask>;
  };
  PoseLandmarker: {
    createFromOptions: (vision: unknown, options: unknown) => Promise<LandmarkTask>;
  };
};

type TaskResult = {
  faceLandmarks?: Landmark[][];
  landmarks?: Landmark[][];
  worldLandmarks?: Landmark[][];
  handedness?: unknown[];
  handednesses?: unknown[];
};

type LandmarkTask = {
  detect: (source: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement) => Promise<TaskResult>;
  close: () => void;
};

const EMPTY_RESULT: AnalysisResult = {
  faceLandmarks: null,
  handLandmarks: [],
  poseLandmarks: null,
  faceDetected: false,
  handsDetected: 0,
  poseDetected: false,
};

let modulePromise: Promise<VisionModule> | null = null;
let visionPromise: Promise<unknown> | null = null;

const tasks: Partial<Record<TaskKey, LandmarkTask>> = {};
const taskPromises: Partial<Record<TaskKey, Promise<LandmarkTask>>> = {};
let inferenceBusy = false;
let disposed = false;

// Reusable snapshot canvas — avoids creating a new canvas every frame.
let snapCanvas: HTMLCanvasElement | null = null;
let snapCtx: CanvasRenderingContext2D | null = null;

function getSnapCanvas(w: number, h: number): CanvasRenderingContext2D | null {
  if (typeof document === "undefined") return null;
  if (!snapCanvas) {
    snapCanvas = document.createElement("canvas");
    snapCtx = snapCanvas.getContext("2d", { willReadFrequently: false }) ?? null;
  }
  if (snapCanvas.width !== w) snapCanvas.width = w;
  if (snapCanvas.height !== h) snapCanvas.height = h;
  return snapCtx;
}

function loadVisionModule(): Promise<VisionModule> {
  if (!modulePromise) {
    const dynamicImport = new Function(
      "url",
      "return import(url);"
    ) as (url: string) => Promise<VisionModule>;

    modulePromise = dynamicImport(
      `${getBase()}/vendor/mediapipe/vision_bundle.mjs`
    );
  }

  return modulePromise;
}

async function getVision(): Promise<unknown> {
  if (!visionPromise) {
    visionPromise = loadVisionModule().then((vision) =>
      vision.FilesetResolver.forVisionTasks(getWasmUrl())
    );
  }

  return visionPromise;
}

async function createWithFallback(
  key: TaskKey,
  vision: VisionModule,
  fileset: unknown
): Promise<LandmarkTask> {
  const create =
    key === "face"
      ? vision.FaceLandmarker.createFromOptions
      : key === "hand"
        ? vision.HandLandmarker.createFromOptions
        : vision.PoseLandmarker.createFromOptions;

  const options =
    key === "face"
      ? {
          runningMode: "IMAGE",
          numFaces: 1,
          outputFaceBlendshapes: false,
          outputFacialTransformationMatrixes: false,
          baseOptions: { modelAssetPath: getModelUrl("face") },
        }
      : key === "hand"
        ? {
            runningMode: "IMAGE",
            numHands: 2,
            baseOptions: { modelAssetPath: getModelUrl("hand") },
          }
        : {
            runningMode: "IMAGE",
            numPoses: 1,
            outputSegmentationMasks: false,
            baseOptions: { modelAssetPath: getModelUrl("pose") },
          };

  try {
    return await create(fileset, {
      ...options,
      baseOptions: {
        ...(options as { baseOptions: Record<string, unknown> }).baseOptions,
        delegate: "GPU",
      },
    });
  } catch (gpuError) {
    console.warn(
      `Try-on: ${key} GPU delegate failed, retrying on CPU.`,
      gpuError
    );

    return create(fileset, {
      ...options,
      baseOptions: {
        ...(options as { baseOptions: Record<string, unknown> }).baseOptions,
        delegate: "CPU",
      },
    });
  }
}

function loadTask(key: TaskKey): Promise<LandmarkTask> {
  const existing = tasks[key];
  if (existing) return Promise.resolve(existing);

  const pending = taskPromises[key];
  if (pending) return pending;

  const promise = (async () => {
    const [vision, fileset] = await Promise.all([
      loadVisionModule(),
      getVision(),
    ]);

    const task = await createWithFallback(key, vision, fileset);

    if (disposed) {
      task.close();
      throw new Error("Try-on tracker was disposed.");
    }

    tasks[key] = task;
    return task;
  })().finally(() => {
    delete taskPromises[key];
  });

  taskPromises[key] = promise;
  return promise;
}

export function hasTasks(keys: TaskKey[]): boolean {
  return keys.every((key) => Boolean(tasks[key]));
}

export async function ensureTasks(keys: TaskKey[]): Promise<void> {
  disposed = false;
  await Promise.all(keys.map((key) => loadTask(key)));
}

export async function analyzeSource(
  source: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
  keys: TaskKey[]
): Promise<AnalysisResult> {
  if (!source) {
    throw new Error("No image or video source supplied.");
  }

  if (
    source instanceof HTMLImageElement &&
    (!source.complete || !source.naturalWidth)
  ) {
    return { ...EMPTY_RESULT };
  }

  if (
    source instanceof HTMLVideoElement &&
    (source.readyState < 2 || !source.videoWidth)
  ) {
    return { ...EMPTY_RESULT };
  }

  if (
    source instanceof HTMLCanvasElement &&
    (!source.width || !source.height)
  ) {
    return { ...EMPTY_RESULT };
  }

  if (!keys.length) return { ...EMPTY_RESULT };

  if (!hasTasks(keys)) {
    await ensureTasks(keys);
  }

  if (inferenceBusy) {
    return { ...EMPTY_RESULT, busy: true };
  }

  inferenceBusy = true;

  // For live video: snapshot the current frame onto a reusable canvas.
  // IMAGE-mode MediaPipe tasks cannot consume a live HTMLVideoElement directly.
  let detectSource: HTMLImageElement | HTMLCanvasElement =
    source as HTMLImageElement | HTMLCanvasElement;

  if (source instanceof HTMLVideoElement) {
    const w = source.videoWidth;
    const h = source.videoHeight;
    const ctx = getSnapCanvas(w, h);
    if (!ctx || !snapCanvas) {
      inferenceBusy = false;
      return { ...EMPTY_RESULT };
    }
    ctx.drawImage(source, 0, 0, w, h);
    detectSource = snapCanvas;
  }

  try {
    const result: AnalysisResult = { ...EMPTY_RESULT };

    if (keys.includes("face") && tasks.face) {
      const faceResult = await tasks.face.detect(detectSource);
      result.faceLandmarks = faceResult.faceLandmarks?.[0] || null;
      result.faceDetected = Boolean(result.faceLandmarks);
    }

    if (keys.includes("hand") && tasks.hand) {
      const handResult = await tasks.hand.detect(detectSource);
      result.handLandmarks = (handResult.landmarks || []).filter(
        (points) => Array.isArray(points) && points.length >= 21
      );
      result.handsDetected = result.handLandmarks.length;
    }

    if (keys.includes("pose") && tasks.pose) {
      const poseResult = await tasks.pose.detect(detectSource);
      result.poseLandmarks = poseResult.landmarks?.[0] || null;
      result.poseDetected = Boolean(result.poseLandmarks);
    }

    return result;
  } catch (error) {
    console.error("MediaPipe analyzeSource failed:", error);
    throw error;
  } finally {
    inferenceBusy = false;
  }
}

export function disposeTasks(): void {
  disposed = true;

  for (const key of Object.keys(tasks) as TaskKey[]) {
    try {
      tasks[key]?.close();
    } catch (error) {
      console.warn(`Try-on: failed to close ${key} task`, error);
    }

    delete tasks[key];
  }

  inferenceBusy = false;
  modulePromise = null;
  visionPromise = null;
  snapCanvas = null;
  snapCtx = null;
}

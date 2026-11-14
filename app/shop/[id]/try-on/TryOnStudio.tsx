"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  CameraOff,
  Check,
  Download,
  ImagePlus,
  Loader2,
  RotateCcw,
  ScanLine,
  Share2,
  Sparkles,
  SwitchCamera,
  Video,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  products as fallbackProducts,
  type Product,
} from "../../data/products";
import {
  getTryOnBasePath,
  getTryOnAssetForProduct,
  HAND_IMAGE,
  MODEL_IMAGE,
  usesHandModel,
  type TryOnAsset,
  type TryOnType,
} from "../../data/tryon";
import { analyzeHandPhoto } from "./lib/hand-analysis";
import {
  analyzeSource,
  disposeTasks,
  ensureTasks,
  type AnalysisResult,
  type Landmark,
  type TaskKey,
} from "./lib/mediapipe";
import { getFitForAsset, type TryOnFit } from "./lib/placement";
import {
  clearCanvas,
  getCanvasMapping,
  getObjectFitInfo,
  renderTryOnFrameMulti,
  type RenderItem,
} from "./lib/render";

import "./tryon.css";

type Mode = "model" | "camera" | "photo";
type AiState = "loading" | "ready" | "error";
type CameraState = "idle" | "starting" | "live" | "error";
type PlacementState = "none" | "tracked" | "manual";
type ScanState = "off" | "on";

type Summary = {
  face: boolean;
  hands: number;
  pose: boolean;
};

const EMPTY_SUMMARY: Summary = { face: false, hands: 0, pose: false };

const CATEGORY_COPY: Record<TryOnType, string> = {
  necklace: "Necklace",
  earrings: "Earrings",
  ring: "Ring",
  bracelet: "Bracelet",
};

function keysForGroup(group: "model" | "hand"): TaskKey[] {
  return group === "hand" ? ["hand"] : ["face", "pose"];
}

function describeResult(result: AnalysisResult, group: "model" | "hand") {
  if (group === "hand") {
    return result.handsDetected > 0
      ? "AI hand tracking is live — the piece follows your wrist in real time."
      : "Show your hand to the AI camera — tracking will follow your wrist.";
  }

  if (result.faceDetected && result.poseDetected) {
    return "AI tracking is live — face and pose are guiding the piece.";
  }

  if (result.faceDetected) {
    return "Face detected — step back so shoulders are visible for accurate placement.";
  }

  return "Move into the frame so AI can place the piece accurately.";
}

function cameraErrorMessage(error: unknown): string {
  const name =
    typeof error === "object" && error && "name" in error
      ? String((error as { name?: string }).name)
      : "";

  if (name === "NotAllowedError" || name === "SecurityError") {
    return "Camera permission was blocked. Allow camera access in your browser settings, then try again.";
  }

  if (name === "NotFoundError" || name === "DevicesNotFoundError") {
    return "No camera was found on this device. You can still explore every piece in Model mode.";
  }

  if (name === "NotReadableError" || name === "TrackStartError") {
    return "The camera is busy in another app. Close other camera apps and try again.";
  }

  if (name === "OverconstrainedError") {
    return "This camera does not support the requested view. Try flipping the camera.";
  }

  return "The camera could not start. Check your browser permissions and try again.";
}

function trackingChipLabel(value: number, singular: string) {
  return `${value} ${singular}${value === 1 ? "" : "s"}`;
}


type CameraStabilizerState = {
  smoothed: AnalysisResult | null;
  lastGoodAt: number;
};

const CAMERA_STALE_MS = 240;
const CAMERA_ANALYSIS_MAX_DIM = 960;

function emptyCameraResult(): AnalysisResult {
  return {
    faceLandmarks: null,
    handLandmarks: [],
    poseLandmarks: null,
    faceDetected: false,
    handsDetected: 0,
    poseDetected: false,
  };
}

function smoothNumber(
  previous: number | undefined,
  current: number,
  alpha: number,
  deadzone = 0.0009
): number {
  const base = Number.isFinite(previous) ? Number(previous) : current;
  const delta = current - base;

  if (Math.abs(delta) < deadzone) return base;

  return base + delta * alpha;
}

function cloneLandmark(point: Landmark): Landmark {
  return { ...point };
}

function smoothPoint(previous: Landmark | undefined, current: Landmark): Landmark {
  const prevX = Number.isFinite(previous?.x) ? Number(previous?.x) : current.x;
  const prevY = Number.isFinite(previous?.y) ? Number(previous?.y) : current.y;
  const movement = Math.hypot(current.x - prevX, current.y - prevY);
  const alpha = movement > 0.006 ? 0.62 : movement > 0.002 ? 0.4 : 0.2;

  return {
    x: smoothNumber(previous?.x, current.x, alpha),
    y: smoothNumber(previous?.y, current.y, alpha),
    z: current.z ?? previous?.z,
    visibility: current.visibility ?? previous?.visibility,
  };
}

function cloneLandmarks(points: Landmark[]): Landmark[] {
  return points.map(cloneLandmark);
}

function smoothLandmarkList(
  previous: Landmark[] | null | undefined,
  current: Landmark[] | null | undefined
): Landmark[] | null {
  if (!current) return null;
  if (!previous || previous.length !== current.length) {
    return cloneLandmarks(current);
  }

  return current.map((point, index) => smoothPoint(previous[index], point));
}

function cloneHand(hand: Landmark[]): Landmark[] {
  return cloneLandmarks(hand);
}

function handKeyDistance(a: Landmark[], b: Landmark[]): number {
  const indices = [0, 5, 9, 17];
  let total = 0;

  for (const index of indices) {
    const pa = a[index];
    const pb = b[index];
    if (!pa || !pb) continue;
    total += Math.hypot(pa.x - pb.x, pa.y - pb.y);
  }

  return total / indices.length;
}

function smoothHandLandmarks(
  previousHands: Landmark[][],
  currentHands: Landmark[][]
): Landmark[][] {
  if (!currentHands.length) return [];

  const usedPrevious = new Set<number>();

  return currentHands.map((hand) => {
    let bestIndex = -1;
    let bestDistance = 0.08;

    for (let index = 0; index < previousHands.length; index++) {
      if (usedPrevious.has(index)) continue;

      const distance = handKeyDistance(hand, previousHands[index]);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    }

    if (bestIndex < 0) return cloneHand(hand);

    usedPrevious.add(bestIndex);

    const previous = previousHands[bestIndex];

    return hand.map((point, index) =>
      smoothPoint(previous[index], point)
    );
  });
}

function stabilizeCameraResult(
  raw: AnalysisResult,
  state: CameraStabilizerState,
  group: "model" | "hand"
): { result: AnalysisResult; state: CameraStabilizerState } {
  const now =
    typeof performance !== "undefined" ? performance.now() : Date.now();
  const detected =
    group === "hand"
      ? raw.handsDetected > 0
      : raw.faceDetected || raw.poseDetected;

  if (!detected) {
    if (state.smoothed && now - state.lastGoodAt < CAMERA_STALE_MS) {
      return { result: state.smoothed, state };
    }

    return {
      result: emptyCameraResult(),
      state: { smoothed: null, lastGoodAt: 0 },
    };
  }

  const smoothed: AnalysisResult = {
    faceLandmarks: smoothLandmarkList(
      state.smoothed?.faceLandmarks,
      raw.faceLandmarks
    ),
    handLandmarks: smoothHandLandmarks(
      state.smoothed?.handLandmarks ?? [],
      raw.handLandmarks
    ),
    poseLandmarks: smoothLandmarkList(
      state.smoothed?.poseLandmarks,
      raw.poseLandmarks
    ),
    faceDetected: raw.faceDetected,
    handsDetected: raw.handsDetected,
    poseDetected: raw.poseDetected,
  };

  return {
    result: smoothed,
    state: { smoothed, lastGoodAt: now },
  };
}

function getLiveAnalysisSource(
  video: HTMLVideoElement,
  canvasRef: { current: HTMLCanvasElement | null }
): HTMLVideoElement | HTMLCanvasElement {
  const width = video.videoWidth;
  const height = video.videoHeight;

  if (!width || !height) return video;

  const scale = Math.min(1, CAMERA_ANALYSIS_MAX_DIM / Math.max(width, height));
  if (scale >= 0.999) return video;

  let canvas = canvasRef.current;

  if (!canvas) {
    canvas = document.createElement("canvas");
    canvasRef.current = canvas;
  }

  const targetWidth = Math.max(1, Math.round(width * scale));
  const targetHeight = Math.max(1, Math.round(height * scale));

  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return video;

  ctx.drawImage(video, 0, 0, targetWidth, targetHeight);

  return canvas;
}

const PHOTO_MAX_DIM = 2048;

async function createOrientedPhotoUrl(file: File): Promise<string> {
  const fallback = () => URL.createObjectURL(file);

  try {
    if (typeof createImageBitmap === "undefined") return fallback();

    const bitmap = await createImageBitmap(file, {
      imageOrientation: "from-image",
    } as any);

    const scale = Math.min(
      1,
      PHOTO_MAX_DIM / Math.max(bitmap.width, bitmap.height)
    );
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return fallback();
    }

    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const type = file.type === "image/png" ? "image/png" : "image/jpeg";
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, type, 0.92)
    );

    return blob ? URL.createObjectURL(blob) : fallback();
  } catch {
    return fallback();
  }
}

function TryOnStudioInner({
  product,
  initialAsset,
  catalog,
}: {
  product: Product;
  initialAsset: TryOnAsset;
  catalog?: Product[];
}) {
  const catalogEntries = useMemo(
    () =>
      (catalog && catalog.length ? catalog : fallbackProducts)
        .map((item) => ({
          product: item,
          asset: getTryOnAssetForProduct(item),
        }))
        .filter(
          (entry): entry is { product: Product; asset: TryOnAsset } =>
            Boolean(entry.asset)
        ),
    [catalog]
  );

  // One selected product ID per category — null means nothing selected for that category.
  // The initial product fills its own category slot.
  const initialEntry = catalogEntries.find((e) => e.product.id === product.id);
  const initialType = initialEntry?.asset.type ?? "bracelet";

  const [selRing, setSelRing] = useState<string | null>(initialType === "ring" ? product.id : null);
  const [selBracelet, setSelBracelet] = useState<string | null>(initialType === "bracelet" ? product.id : null);
  const [selNecklace, setSelNecklace] = useState<string | null>(initialType === "necklace" ? product.id : null);
  const [selEarrings, setSelEarrings] = useState<string | null>(initialType === "earrings" ? product.id : null);

  // The "primary" product drives the tracking group, status messages, and piece card.
  const [primaryId, setPrimaryId] = useState(product.id);
  const [switcherFilter, setSwitcherFilter] = useState<"all" | TryOnType>("all");
  const [scanState, setScanState] = useState<ScanState>("off");
  const [scanPos, setScanPos] = useState(50);
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);
  const [shareMsg, setShareMsg] = useState<string | null>(null);
  const scanDragging = useRef(false);
  const [mode, setMode] = useState<Mode>("model");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoState, setPhotoState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [photoDrag, setPhotoDrag] = useState(false);
  const [size, setSize] = useState(100);
  const [vertical, setVertical] = useState(0);
  const [horizontal, setHorizontal] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [assetLoaded, setAssetLoaded] = useState(false);
  const [assetFailed, setAssetFailed] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [handReady, setHandReady] = useState(false);
  const [aiState, setAiState] = useState<AiState>("loading");
  const [photoBusy, setPhotoBusy] = useState(false);
  const [cameraState, setCameraState] = useState<CameraState>("idle");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facing, setFacing] = useState<"user" | "environment">("user");
  const [summary, setSummary] = useState<Summary>(EMPTY_SUMMARY);
  const [placement, setPlacement] = useState<PlacementState>("none");
  const [statusMessage, setStatusMessage] = useState(
    "Preparing your AI jewellery try-on…"
  );

  // All currently selected entries across all categories.
  const allSelectedEntries = useMemo(() => {
    const ids = [selRing, selBracelet, selNecklace, selEarrings].filter(Boolean) as string[];
    return ids
      .map((id) => catalogEntries.find((e) => e.product.id === id))
      .filter((e): e is typeof catalogEntries[number] => Boolean(e));
  }, [selRing, selBracelet, selNecklace, selEarrings]);

  const primaryEntry = useMemo(
    () =>
      catalogEntries.find((e) => e.product.id === primaryId) ?? {
        product,
        asset: initialAsset,
      },
    [initialAsset, product, primaryId]
  );

  const selectedProduct = primaryEntry.product;
  const asset = primaryEntry.asset;
  const base = getTryOnBasePath();
  const assetUrl = (src: string) =>
    /^https?:\/\//.test(src) ? src : `${base}${src}`;
  const isCorsAsset = (src: string) =>
    /^https?:\/\//.test(src) && !/localhost|127\.0\.0\.1/.test(src);
  // Split selected entries by which source image they need.
  // Hand items (ring/bracelet) render on the hand photo.
  // Face items (necklace/earrings) render on the model photo.
  const handEntries = useMemo(
    () => allSelectedEntries.filter((e) => usesHandModel(e.asset.type)),
    [allSelectedEntries]
  );
  const faceEntries = useMemo(
    () => allSelectedEntries.filter((e) => !usesHandModel(e.asset.type)),
    [allSelectedEntries]
  );

  // group drives which MediaPipe tasks to load and which tracking UI to show.
  // It follows the primary product.
  const group: "model" | "hand" = usesHandModel(asset.type) ? "hand" : "model";
  const fit = useMemo<TryOnFit>(() => getFitForAsset(asset), [asset]);
  void fit;
  const mirrored = facing === "user";

  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);   // face/model overlay
  const handCanvasRef = useRef<HTMLCanvasElement>(null); // hand overlay
  const videoRef = useRef<HTMLVideoElement>(null);
  const modelImgRef = useRef<HTMLImageElement>(null);
  const handImgRef = useRef<HTMLImageElement>(null);
  const photoImgRef = useRef<HTMLImageElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const photoRequestRef = useRef(0);
  const photoResultRef = useRef<AnalysisResult | null>(null);
  const photoResultGroupRef = useRef<"model" | "hand" | null>(null);
  const photoUrlRef = useRef<string | null>(null);
  const assetImgRefsMap = useRef<Map<string, HTMLImageElement>>(new Map());
  const assetLoadedMap = useRef<Map<string, boolean>>(new Map());

  const streamRef = useRef<MediaStream | null>(null);
  const loopTimerRef = useRef<number | null>(null);
  const cameraRequestRef = useRef(0);
  const startingRef = useRef(false);
  const mountedRef = useRef(false);
  const resultRef = useRef<AnalysisResult | null>(null);
  const summaryKeyRef = useRef("");
  const placementRef = useRef<PlacementState>("none");
  const modeRef = useRef<Mode>("model");
  const groupRef = useRef<"model" | "hand">("model");
  const aiReadyRef = useRef(false);
  const cameraAnalysisCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cameraStabilizerRef = useRef<CameraStabilizerState>({
    smoothed: null,
    lastGoodAt: 0,
  });

  const settingsRef = useRef<{
    handEntries: typeof handEntries;
    faceEntries: typeof faceEntries;
    size: number;
    vertical: number;
    horizontal: number;
    rotation: number;
    group: "model" | "hand";
  }>({
    handEntries,
    faceEntries,
    size,
    vertical,
    horizontal,
    rotation,
    group,
  });

  settingsRef.current = {
    handEntries,
    faceEntries,
    size,
    vertical,
    horizontal,
    rotation,
    group,
  };
  modeRef.current = mode;
  groupRef.current = group;
  photoUrlRef.current = photoUrl;

  const currentBaseReady = group === "hand" ? handReady : modelReady;

  const publishResult = useCallback(
    (result: AnalysisResult, target: "model" | "hand") => {
      resultRef.current = result;

      const key = `${target}-${result.faceDetected}-${result.handsDetected}-${result.poseDetected}`;

      if (key === summaryKeyRef.current) return;

      summaryKeyRef.current = key;
      setSummary({
        face: result.faceDetected,
        hands: result.handsDetected,
        pose: result.poseDetected,
      });
      setStatusMessage(describeResult(result, target));
    },
    []
  );

  const paint = useCallback(() => {
    if (!mountedRef.current) return;

    const stage = stageRef.current;
    const cur = settingsRef.current;
    if (!stage) return;

    const cameraMode = modeRef.current === "camera";
    const photoMode = modeRef.current === "photo";
    const singleCanvas = cameraMode || photoMode;

    const toItems = (entries: typeof handEntries): RenderItem[] =>
      entries
        .map((entry): RenderItem | null => {
          const img = assetImgRefsMap.current.get(entry.asset.id) ?? null;
          if (!img?.complete || !img.naturalWidth) return null;
          return {
            asset: entry.asset,
            fit: getFitForAsset(entry.asset),
            image: img,
            size: cur.size,
            verticalPosition: cur.vertical,
            horizontalPosition: cur.horizontal,
            rotationOffset: cur.rotation,
            productName: entry.product.name,
          } satisfies RenderItem;
        })
        .filter((x): x is RenderItem => x !== null);

    // --- Face/model canvas ---
    const faceCanvas = canvasRef.current;
    const faceSource = cameraMode
      ? videoRef.current
      : photoMode
        ? photoImgRef.current
        : modelImgRef.current;
    const faceItems = singleCanvas
      ? toItems([...cur.handEntries, ...cur.faceEntries]) // camera/photo: one canvas for all
      : toItems(cur.faceEntries);

    const photoHasResult =
      photoMode &&
      photoResultRef.current &&
      photoResultGroupRef.current === cur.group;
    const allowFallback = cameraMode
      ? false
      : photoMode
        ? !photoHasResult
        : true;

    let outcome = renderTryOnFrameMulti(
      faceCanvas,
      stage,
      faceSource,
      resultRef.current,
      faceItems,
      allowFallback,
      cameraMode ? { liveCamera: true } : undefined
    );

    // --- Hand canvas (model mode only) ---
    const handCanvas = handCanvasRef.current;
    if (!singleCanvas) {
      const handItems = toItems(cur.handEntries);
      const handOutcome = renderTryOnFrameMulti(
        handCanvas,
        stage,
        handImgRef.current,
        resultRef.current,
        handItems,
        true,
        undefined
      );
      if (handOutcome.drawn) outcome = handOutcome;
    } else if (handCanvas) {
      // clear hand canvas in camera/photo mode — the main canvas draws everything
      const ctx = handCanvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, handCanvas.width, handCanvas.height);
    }

    const next: PlacementState = outcome.drawn
      ? outcome.usedFallback ? "manual" : "tracked"
      : "none";

    if (next !== placementRef.current) {
      placementRef.current = next;
      setPlacement(next);
    }
  }, []);

  const analyzeUploadedPhoto = useCallback(async () => {
    if (modeRef.current !== "photo" || !photoUrlRef.current) return;

    const img = photoImgRef.current;
    if (!img?.complete || !img.naturalWidth) {
      return;
    }

    const request = ++photoRequestRef.current;
    const target = groupRef.current;

    setPhotoState("loading");
    setPhotoError(null);
    setPhotoBusy(true);
    setStatusMessage("Analysing your photo with AI…");

    try {
      const result =
        target === "hand"
          ? await analyzeHandPhoto(img)
          : await analyzeSource(img, keysForGroup("model"));

      if (
        request !== photoRequestRef.current ||
        modeRef.current !== "photo" ||
        photoImgRef.current !== img
      ) {
        return;
      }

      if (!result) throw new Error("No analysis result");

      photoResultRef.current = result;
      photoResultGroupRef.current = target;
      publishResult(result, target);

      const detected =
        target === "hand"
          ? result.handsDetected > 0
          : result.faceDetected || result.poseDetected;

      setPhotoState("ready");
      setStatusMessage(
        detected
          ? "Your photo is fitted — use the controls for fine adjustments."
          : "No hand or face landmarks found — use the fit controls to place the piece."
      );
      paint();
    } catch (error) {
      if (request !== photoRequestRef.current) return;

      console.error("Try-on: uploaded photo analysis failed.", error);
      photoResultRef.current = null;
      photoResultGroupRef.current = null;
      setPhotoState("error");
      setPhotoError(
        "We couldn't detect enough detail in that photo. Try a clearer hand or wrist image, or use the fit controls."
      );
      setStatusMessage(
        "Photo analysis failed — use the fit controls to place the piece."
      );
      paint();
    } finally {
      if (request === photoRequestRef.current) setPhotoBusy(false);
    }
  }, [paint, publishResult]);

  // Keep the overlay crisp when the stage changes shape.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => paint())
        : null;

    observer?.observe(stage);
    window.addEventListener("resize", paint);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", paint);
    };
  }, [paint]);

  

  // Track loaded state for the primary asset (drives the loading spinner).
  useEffect(() => {
    setAssetLoaded(false);
    const img = assetImgRefsMap.current.get(asset.id);
    if (img?.complete && img.naturalWidth) setAssetLoaded(true);
  }, [asset.id]);

  // The bundled portrait/hand photos may already be cached before React
  // attaches onLoad, so check them once on mount as well.
  useEffect(() => {
    if (modelImgRef.current?.complete && modelImgRef.current.naturalWidth) {
      setModelReady(true);
    }

    if (handImgRef.current?.complete && handImgRef.current.naturalWidth) {
      setHandReady(true);
    }
  }, []);

  // Load only the MediaPipe models required by the selected category.
  useEffect(() => {
    let cancelled = false;

    aiReadyRef.current = false;
    setAiState("loading");

    ensureTasks(keysForGroup(group))
      .then(() => {
        if (cancelled) return;

        aiReadyRef.current = true;
        setAiState("ready");
        setStatusMessage(
          group === "hand"
            ? "Hand tracking is ready."
            : "Face and pose tracking is ready."
        );
      })
      .catch((error) => {
        if (cancelled) return;

        console.error("Try-on: AI models failed to load.", error);
        aiReadyRef.current = false;
        setAiState("error");
        setStatusMessage(
          "AI tracking is unavailable. You can still place the piece with the fit controls."
        );
      });

    return () => {
      cancelled = true;
    };
  }, [group]);

  // A category change must never keep landmarks from the previous body area.
  useEffect(() => {
    resultRef.current = null;
    photoResultRef.current = null;
    photoResultGroupRef.current = null;
    summaryKeyRef.current = "";
    setSummary(EMPTY_SUMMARY);
    setPlacement("none");
    placementRef.current = "none";
    cameraStabilizerRef.current = { smoothed: null, lastGoodAt: 0 };
    setStatusMessage(
      group === "hand"
        ? "Switching to hand tracking…"
        : "Switching to face and pose tracking…"
    );
  }, [group]);

  // Analyse the reference photo for model mode.
  useEffect(() => {
    if (mode !== "model" || aiState !== "ready") return;

    const sourceReady = group === "hand" ? handReady : modelReady;
    if (!sourceReady) return;

    let cancelled = false;

    const run = async () => {
      setPhotoBusy(true);

      try {
        const result =
          group === "hand"
            ? await analyzeHandPhoto(handImgRef.current)
            : await analyzeSource(
                modelImgRef.current,
                ["face", "pose"]
              );

        if (cancelled || !result) return;

        publishResult(result, group);
      } catch (error) {
        if (cancelled) return;

        console.error("Try-on: photo analysis failed.", error);

        setStatusMessage(
          "The photograph could not be analysed. Use the fit controls to place the piece."
        );
      } finally {
        if (!cancelled) {
          setPhotoBusy(false);
          paint();
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [
    aiState,
    group,
    handReady,
    mode,
    modelReady,
    paint,
    publishResult,
  ]);

  // Analyse / restore the uploaded photo whenever photo mode becomes active
  // or the jewellery category changes.
  useEffect(() => {
    if (mode !== "photo" || !photoUrl || aiState !== "ready") return;
    if (photoState === "loading") return;

    const img = photoImgRef.current;
    if (!img?.complete || !img.naturalWidth) return;

    if (
      photoState === "ready" &&
      photoResultRef.current &&
      photoResultGroupRef.current === group
    ) {
      publishResult(photoResultRef.current, group);
      setStatusMessage(
        "Your photo preview is ready — use the fit controls for fine adjustments."
      );
      paint();
      return;
    }

    void analyzeUploadedPhoto();
  }, [
    aiState,
    analyzeUploadedPhoto,
    group,
    mode,
    paint,
    photoState,
    photoUrl,
    publishResult,
  ]);

  // Repaint whenever the visible configuration changes.
  useEffect(() => {
    paint();
  }, [
    aiState,
    allSelectedEntries,
    assetLoaded,
    handReady,
    mode,
    modelReady,
    paint,
    size,
    vertical,
    horizontal,
    rotation,
  ]);

  const stopLoop = useCallback(() => {
    if (loopTimerRef.current !== null) {
      window.clearTimeout(loopTimerRef.current);
      loopTimerRef.current = null;
    }
  }, []);

  const stopCamera = useCallback(() => {
    cameraRequestRef.current += 1;
    stopLoop();

    const stream = streamRef.current;
    streamRef.current = null;
    stream?.getTracks().forEach((track) => track.stop());

    const video = videoRef.current;
    if (video) {
      video.pause();
      video.srcObject = null;
    }

    resultRef.current = null;
    summaryKeyRef.current = "";
    setSummary(EMPTY_SUMMARY);
    setPlacement("none");
    placementRef.current = "none";
    cameraStabilizerRef.current = { smoothed: null, lastGoodAt: 0 };
    clearCanvas(canvasRef.current);

    if (mountedRef.current) {
      setCameraState("idle");
      setStatusMessage("Camera stopped.");
    }
  }, [stopLoop]);

  const startLoop = useCallback(() => {
    stopLoop();

    const loop = async () => {
      if (
        !mountedRef.current ||
        modeRef.current !== "camera" ||
        !streamRef.current
      ) {
        return;
      }

      const video = videoRef.current;
      const currentGroup = groupRef.current;
      const currentStream = streamRef.current;

      if (video && video.readyState >= 2 && video.videoWidth) {
        if (aiReadyRef.current) {
          try {
            const analysisSource = getLiveAnalysisSource(
              video,
              cameraAnalysisCanvasRef
            );
            const rawResult = await analyzeSource(
              analysisSource,
              keysForGroup(currentGroup)
            );

            if (
              !rawResult.busy &&
              mountedRef.current &&
              modeRef.current === "camera" &&
              groupRef.current === currentGroup &&
              streamRef.current === currentStream
            ) {
              const stabilized = stabilizeCameraResult(
                rawResult,
                cameraStabilizerRef.current,
                currentGroup
              );
              cameraStabilizerRef.current = stabilized.state;
              publishResult(stabilized.result, currentGroup);
            }
          } catch (error) {
            console.warn("Try-on: live frame analysis failed.", error);
          }
        }

        paint();
      }

      if (
        mountedRef.current &&
        modeRef.current === "camera" &&
        streamRef.current
      ) {
        loopTimerRef.current = window.setTimeout(loop, 90);
      }
    };

    loopTimerRef.current = window.setTimeout(loop, 120);
  }, [paint, publishResult, stopLoop]);

  const startCamera = useCallback(
    async (nextFacing: "user" | "environment") => {
      if (startingRef.current) return;

      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraState("error");
        setCameraError(
          "This browser cannot access a camera. Open the site on localhost or HTTPS and use a modern browser."
        );
        setStatusMessage("Camera access is not available in this browser.");
        return;
      }

      startingRef.current = true;
      const requestId = ++cameraRequestRef.current;

      setCameraError(null);
      setCameraState("starting");
      setStatusMessage("Requesting camera for live try-on…");

      let stream: MediaStream | null = null;

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: nextFacing,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30 },
          },
        });

        if (requestId !== cameraRequestRef.current || !mountedRef.current) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        const video = videoRef.current;
        if (!video) {
          throw new Error("Camera preview element is not ready.");
        }

        video.srcObject = stream;
        await video.play();

        if (requestId !== cameraRequestRef.current || !mountedRef.current) {
          stream.getTracks().forEach((track) => track.stop());
          if (streamRef.current === stream) streamRef.current = null;
          return;
        }

        resultRef.current = null;
        summaryKeyRef.current = "";
        cameraStabilizerRef.current = { smoothed: null, lastGoodAt: 0 };

        setCameraState("live");
        setStatusMessage(
          groupRef.current === "hand"
            ? "Camera live — AI hand tracking is active."
            : "Camera live — AI is tracking face and shoulders for real-time fit."
        );

        startLoop();
      } catch (error) {
        if (requestId !== cameraRequestRef.current) return;

        stream?.getTracks().forEach((track) => track.stop());
        if (streamRef.current === stream) streamRef.current = null;

        const video = videoRef.current;
        if (video) {
          video.pause();
          video.srcObject = null;
        }

        const name =
          typeof error === "object" && error && "name" in error
            ? String((error as { name?: string }).name)
            : "";

        // Gracefully return to the front camera on single-lens devices.
        if (
          nextFacing === "environment" &&
          (name === "NotFoundError" ||
            name === "OverconstrainedError" ||
            name === "NotReadableError")
        ) {
          setCameraError(null);
          setCameraState("idle");
          setStatusMessage(
            "The rear camera could not be opened. Switching to the front camera for live try-on…"
          );
          setFacing("user");
          return;
        }

        console.warn("Try-on: camera failed to start.", error);

        setCameraState("error");
        setCameraError(cameraErrorMessage(error));
        setStatusMessage("Live camera preview is unavailable.");
      } finally {
        startingRef.current = false;
      }
    },
    [startLoop]
  );

  // Request camera access only after the camera tab is chosen.  Changing
  // the facing mode restarts the stream with the new lens.
  useEffect(() => {
    if (mode !== "camera") return;

    void startCamera(facing);

    return () => {
      stopCamera();
    };
  }, [facing, mode, startCamera, stopCamera]);

  // Full cleanup on unmount: stream tracks, timers, observers and models.
  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      cameraRequestRef.current += 1;
      stopLoop();

      const stream = streamRef.current;
      streamRef.current = null;
      stream?.getTracks().forEach((track) => track.stop());

      const video = videoRef.current;
      if (video) {
        video.pause();
        video.srcObject = null;
      }

      disposeTasks();
    };
  }, [stopLoop]);

  const resetFit = () => {
    setSize(100);
    setVertical(0);
    setHorizontal(0);
    setRotation(0);
  };

  const handlePhotoFile = async (file: File | null | undefined) => {
    if (!file) return;

    const okType =
      ["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      /\.(jpe?g|png|webp)$/i.test(file.name);

    if (!okType) {
      setPhotoError("Please choose a JPG, JPEG, PNG or WEBP image.");
      setPhotoState("error");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setPhotoError("Please choose an image under 8 MB.");
      setPhotoState("error");
      return;
    }

    const request = ++photoRequestRef.current;

    if (photoUrlRef.current) {
      URL.revokeObjectURL(photoUrlRef.current);
      photoUrlRef.current = null;
    }

    photoResultRef.current = null;
    photoResultGroupRef.current = null;
    resultRef.current = null;
    summaryKeyRef.current = "";
    setSummary(EMPTY_SUMMARY);
    setPlacement("none");
    placementRef.current = "none";

    setPhotoUrl(null);
    setPhotoState("loading");
    setPhotoError(null);
    setPhotoBusy(true);
    setStatusMessage("Preparing your photo…");
    setMode("photo");

    try {
      const url = await createOrientedPhotoUrl(file);
      if (request !== photoRequestRef.current) {
        URL.revokeObjectURL(url);
        return;
      }

      photoUrlRef.current = url;
      setPhotoUrl(url);
      setPhotoState("loading");
      setPhotoBusy(true);
      setStatusMessage("Analysing your photo with AI…");
    } catch {
      if (request !== photoRequestRef.current) return;
      setPhotoState("error");
      setPhotoError("That image could not be prepared. Please choose another photo.");
      setPhotoBusy(false);
    }
  };

  const removePhoto = () => {
    photoRequestRef.current += 1;
    if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);

    photoResultRef.current = null;
    photoResultGroupRef.current = null;
    resultRef.current = null;
    summaryKeyRef.current = "";

    setPhotoUrl(null);
    setPhotoState("idle");
    setPhotoError(null);
    setPhotoDrag(false);
    setSummary(EMPTY_SUMMARY);
    setPlacement("none");
    placementRef.current = "none";
    setMode("model");
    setStatusMessage("Back to the virtual model — upload a photo anytime from My Photo.");
  };

  // Select a product: fills its category slot, replaces any previous in that category.
  // Selecting a face item clears all hand items and vice versa.
  const selectProduct = (id: string) => {
    const entry = catalogEntries.find((e) => e.product.id === id);
    if (!entry) return;
    const type = entry.asset.type;
    const isHandType = type === "ring" || type === "bracelet";

    // Personal photos are fitted one piece at a time so AI placement for one
    // body part can never disturb another selected piece.
    if (modeRef.current === "photo") {
      setSelRing(null);
      setSelBracelet(null);
      setSelNecklace(null);
      setSelEarrings(null);

      if (type === "ring") setSelRing(id);
      else if (type === "bracelet") setSelBracelet(id);
      else if (type === "necklace") setSelNecklace(id);
      else if (type === "earrings") setSelEarrings(id);

      setPrimaryId(id);
      return;
    }

    if (type === "ring") {
      setSelRing((prev) => prev === id ? null : id);
      if (isHandType) { setSelNecklace(null); setSelEarrings(null); }
    } else if (type === "bracelet") {
      setSelBracelet((prev) => prev === id ? null : id);
      if (isHandType) { setSelNecklace(null); setSelEarrings(null); }
    } else if (type === "necklace") {
      setSelNecklace((prev) => prev === id ? null : id);
      setSelRing(null); setSelBracelet(null);
    } else if (type === "earrings") {
      setSelEarrings((prev) => prev === id ? null : id);
      setSelRing(null); setSelBracelet(null);
    }

    setPrimaryId(id);
    setSize(100);
    setVertical(0);
    setHorizontal(0);
    setRotation(0);
  };

  const captureTryOnCanvas = () => {
    try {
      paint();

      const isCamera = modeRef.current === "camera";
      const isPhoto = modeRef.current === "photo";
      const singleCanvas = isCamera || isPhoto;
      const currentGroup = groupRef.current;

      const source = isCamera
        ? videoRef.current
        : isPhoto
          ? photoImgRef.current
          : currentGroup === "hand"
            ? handImgRef.current
            : modelImgRef.current;
      const overlay = singleCanvas
        ? canvasRef.current
        : currentGroup === "hand"
          ? handCanvasRef.current
          : canvasRef.current;

      if (!source || !overlay) return null;

      const out = document.createElement("canvas");
      out.width = overlay.width;
      out.height = overlay.height;

      const ctx = out.getContext("2d");
      if (!ctx) return null;

      ctx.fillStyle = "#0a0908";
      ctx.fillRect(0, 0, out.width, out.height);

      const fitInfo = getObjectFitInfo(source);
      const mapping = getCanvasMapping(
        out,
        source,
        fitInfo.fit,
        fitInfo.position
      );

      ctx.save();

      if (isCamera && mirrored) {
        ctx.translate(out.width, 0);
        ctx.scale(-1, 1);
      }

      if (mapping) {
        ctx.drawImage(
          source,
          mapping.offsetX,
          mapping.offsetY,
          mapping.drawnWidth,
          mapping.drawnHeight
        );
      }

      ctx.drawImage(overlay, 0, 0);
      ctx.restore();

      return out;
    } catch {
      return null;
    }
  };

  const handleDownload = () => {
    try {
      // Make sure the overlay canvases reflect the current fit values before
      // compositing the export.
      paint();

      const isCamera = modeRef.current === "camera";
      const isPhoto = modeRef.current === "photo";
      const singleCanvas = isCamera || isPhoto;
      const currentGroup = groupRef.current;

      // Rings/bracelets live on the hand overlay canvas; necklaces/earrings
      // live on the face canvas. Camera mode draws every piece on the face
      // canvas. Saving the wrong canvas dropped hand pieces entirely.
      const source = isCamera
        ? videoRef.current
        : isPhoto
          ? photoImgRef.current
          : currentGroup === "hand"
            ? handImgRef.current
            : modelImgRef.current;
      const overlay = singleCanvas
        ? canvasRef.current
        : currentGroup === "hand"
          ? handCanvasRef.current
          : canvasRef.current;

      if (!source || !overlay) return;

      const out = document.createElement("canvas");
      out.width = overlay.width;
      out.height = overlay.height;

      const ctx = out.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "#0a0908";
      ctx.fillRect(0, 0, out.width, out.height);

      // Draw the photograph/video with the same object-fit transform the
      // browser uses in the preview. Stretching it to the canvas made the body
      // larger than the jewellery, which is why saved pieces looked smaller.
      const fitInfo = getObjectFitInfo(source);
      const mapping = getCanvasMapping(
        out,
        source,
        fitInfo.fit,
        fitInfo.position
      );

      ctx.save();

      if (isCamera && mirrored) {
        ctx.translate(out.width, 0);
        ctx.scale(-1, 1);
      }

      if (mapping) {
        ctx.drawImage(
          source,
          mapping.offsetX,
          mapping.offsetY,
          mapping.drawnWidth,
          mapping.drawnHeight
        );
      }

      ctx.drawImage(overlay, 0, 0);
      ctx.restore();

      const a = document.createElement("a");
      a.href = out.toDataURL("image/png");
      a.download = `neos7-tryon-${selectedProduct.name.replace(/\s+/g, "-").toLowerCase()}.png`;
      a.click();
      setDownloadMsg("Image saved!");
      setTimeout(() => setDownloadMsg(null), 2500);
    } catch {
      setDownloadMsg("Download failed.");
      setTimeout(() => setDownloadMsg(null), 2500);
    }
  };

  const handleShare = async () => {
    const canvas = captureTryOnCanvas();

    if (!canvas) {
      setShareMsg("Nothing to share yet.");
      setTimeout(() => setShareMsg(null), 2500);
      return;
    }

    try {
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });

      if (!blob) throw new Error("Could not create share image.");

      const fileName = `neos7-tryon-${selectedProduct.name
        .replace(/\s+/g, "-")
        .toLowerCase()}.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      const downloadBlob = (imageBlob: Blob, filename: string) => {
        const url = URL.createObjectURL(imageBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      };

      const canShareFiles =
        typeof navigator.canShare === "function"
          ? navigator.canShare({ files: [file] } as ShareData)
          : typeof navigator.share === "function";

      if (typeof navigator.share === "function" && canShareFiles) {
        try {
          await navigator.share({
            files: [file],
            title: "NEOS7 Virtual Try-On",
          } as ShareData);
          setShareMsg("Ready to share!");
        } catch (error) {
          const name =
            error && typeof error === "object" && "name" in error
              ? String((error as { name?: unknown }).name)
              : "";

          if (name === "AbortError") {
            setShareMsg("Share cancelled.");
          } else {
            downloadBlob(blob, fileName);
            setShareMsg("Downloaded to share.");
          }
        }
      } else {
        downloadBlob(blob, fileName);
        setShareMsg("Downloaded to share.");
      }
    } catch {
      setShareMsg("Share failed.");
    }

    setTimeout(() => setShareMsg(null), 3000);
  };

  const handleScanToggle = () => {
    setScanState((s) => (s === "off" ? "on" : "off"));
    setScanPos(50);
  };

  const handleScanMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    scanDragging.current = true;
    e.preventDefault();
  };

  const handleScanMove = (clientX: number) => {
    if (!scanDragging.current) return;
    const container = stageRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setScanPos(pct);
  };

  const statusLabel =
    aiState === "loading"
      ? "Calibrating"
      : aiState === "error"
        ? "Manual fit"
        : mode === "camera" && cameraState === "live"
          ? "Live tracking"
          : "AI tracking";

  const statusTone =
    aiState === "error"
      ? "is-error"
      : mode === "camera"
        ? cameraState === "live"
          ? "is-live"
          : "is-idle"
        : aiState === "loading"
          ? "is-idle"
          : "is-ready";

  const trackingDetail =
    mode === "camera"
      ? cameraState === "live"
        ? "Live camera"
        : cameraState === "starting"
          ? "Requesting camera"
          : cameraState === "error"
            ? "Camera unavailable"
            : "Camera idle"
      : group === "hand"
        ? "AI hand tracking"
        : "Virtual model preview";

  const scanClipPath =
    mode === "camera" && mirrored
      ? `inset(0 ${scanPos}% 0 0)`
      : `inset(0 0 0 ${scanPos}%)`;

  return (
    <main
      className="tryon-page"
      onMouseMove={(e) => handleScanMove(e.clientX)}
      onMouseUp={() => { scanDragging.current = false; }}
      onTouchMove={(e) => handleScanMove(e.touches[0].clientX)}
      onTouchEnd={() => { scanDragging.current = false; }}
    >
      <div className="tryon-ambient tryon-ambient-one" aria-hidden="true" />
      <div className="tryon-ambient tryon-ambient-two" aria-hidden="true" />

      <Link href={`/shop/${selectedProduct.id}/`} className="tryon-back">
        <ArrowLeft size={15} strokeWidth={1.7} />
        <span>Back to Product</span>
      </Link>

      {/* Intro heading — visible on every screen size */}
      <section className="tryon-hero">
        <div className="tryon-hero-copy">
          <span className="tryon-eyebrow">
            <span className="tryon-eyebrow-line" />
            VIRTUAL JEWELLERY TRY-ON
          </span>
          <h1>
            See How Your <em>Jewellery</em> Looks on You.
          </h1>
          <p>
            Experience your favourite jewellery virtually with AI-powered hand
            tracking. Preview the ring on your hand in real time before making
            your purchase.
          </p>
        </div>
      </section>

      <section className="tryon-layout">
        <div className="tryon-stage-column">
          <div
            ref={stageRef}
            className={`tryon-stage mode-${mode} group-${group} ${
              mode === "camera" && mirrored ? "is-mirrored" : ""
            }`}
          >
            {/* ── Mode toggle overlay (Model / Live) ── */}
            <div className="tryon-mode-overlay" role="tablist" aria-label="Preview mode">
              <button
                type="button"
                role="tab"
                aria-selected={mode === "model"}
                className={`tryon-mode-overlay-btn ${mode === "model" ? "is-active" : ""}`}
                onClick={() => setMode("model")}
              >
                <Sparkles size={12} strokeWidth={1.6} />
                Model
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "camera"}
                className={`tryon-mode-overlay-btn ${mode === "camera" ? "is-active" : ""}`}
                onClick={() => setMode("camera")}
              >
                <Camera size={12} strokeWidth={1.6} />
                Live
              </button>
              {/* My Photo tab disabled for now — functionality kept in code
              <button
                type="button"
                role="tab"
                aria-selected={mode === "photo"}
                className={`tryon-mode-overlay-btn ${mode === "photo" ? "is-active" : ""}`}
                onClick={() => setMode("photo")}
              >
                <ImagePlus size={12} strokeWidth={1.6} />
                My Photo
              </button>
              */}
            </div>

            {/* ── Compare & Save overlay buttons (bottom-right) ── */}
            <div className="tryon-overlay-actions">
              <button
                type="button"
                className={`tryon-overlay-btn ${scanState === "on" ? "is-active" : ""}`}
                onClick={handleScanToggle}
                title={scanState === "on" ? "Close Compare" : "Compare"}
              >
                <ScanLine size={14} strokeWidth={1.6} />
                <span>{scanState === "on" ? "Close" : "Compare"}</span>
              </button>
              <button
                type="button"
                className="tryon-overlay-btn"
                onClick={handleDownload}
                title="Save image"
              >
                <Download size={14} strokeWidth={1.6} />
                <span>Save</span>
              </button>
              {/* Share button disabled for now
              <button
                type="button"
                className="tryon-overlay-btn"
                onClick={() => void handleShare()}
                title="Share image"
              >
                <Share2 size={14} strokeWidth={1.6} />
                <span>Share</span>
              </button>
              */}
              {downloadMsg && (
                <span className="tryon-overlay-dl-msg">{downloadMsg}</span>
              )}
              {shareMsg && (
                <span className="tryon-overlay-dl-msg">{shareMsg}</span>
              )}
            </div>
            <div className="tryon-stage-glow" aria-hidden="true" />

            <img
              ref={modelImgRef}
              src={`${base}${MODEL_IMAGE}`}
              alt="Studio model wearing the selected piece"
              className={`tryon-base-image ${
                mode === "model" && group === "model" ? "is-visible" : ""
              }`}
              onLoad={() => {
                setModelReady(true);
                paint();
              }}
            />

            <img
              ref={handImgRef}
              src={`${base}${HAND_IMAGE}`}
              alt="Studio hand wearing the selected piece"
              className={`tryon-base-image ${
                mode === "model" && group === "hand" ? "is-visible" : ""
              }`}
              onLoad={() => {
                setHandReady(true);
                paint();
              }}
            />

            {photoUrl && (
              <img
                ref={photoImgRef}
                src={photoUrl}
                alt="Uploaded hand or wrist photo"
                className={`tryon-base-image ${
                  mode === "photo" ? "is-visible" : ""
                }`}
                onLoad={() => {
                  void analyzeUploadedPhoto();
                  paint();
                }}
                onError={() => {
                  setPhotoState("error");
                  setPhotoError(
                    "That image could not be loaded. Please choose another photo."
                  );
                  setPhotoBusy(false);
                }}
              />
            )}

            <video
              ref={videoRef}
              className={`tryon-video ${
                mode === "camera" ? "is-visible" : ""
              } ${mode === "camera" && mirrored ? "is-mirrored" : ""}`}
              autoPlay
              muted
              playsInline
              aria-label="Live camera preview"
            />

            <canvas
              ref={canvasRef}
              className={`tryon-canvas ${
                mode === "camera" && mirrored ? "is-mirrored" : ""
              }${scanState === "on" ? " tryon-canvas-after" : ""}`}
              style={scanState === "on" ? { clipPath: scanClipPath } : undefined}
              aria-hidden="true"
            />

            {/* Hand overlay canvas — model mode only */}
            <canvas
              ref={handCanvasRef}
              className={`tryon-canvas${scanState === "on" ? " tryon-canvas-after" : ""}`}
              style={{
                display: mode === "camera" || mode === "photo" ? "none" : undefined,
                ...(scanState === "on" ? { clipPath: `inset(0 0 0 ${scanPos}%)` } : {}),
              }}
              aria-hidden="true"
            />

            <div className="tryon-stage-badges">
              <span className={`tryon-status-pill ${statusTone}`}>
                <i />
                {statusLabel}
              </span>

              <span className="tryon-stage-mode">{trackingDetail}</span>
            </div>

            {mode === "model" &&
              (!currentBaseReady || !assetLoaded || aiState === "loading" || photoBusy) &&
              !assetFailed && (
                <div className="tryon-loading">
                  <Loader2 className="tryon-spin" size={22} strokeWidth={1.5} />
                  <strong>
                    {!currentBaseReady || !assetLoaded
                      ? "Preparing the virtual preview"
                      : "Calibrating AI tracking"}
                  </strong>
                  <span>
                    {!currentBaseReady || !assetLoaded
                      ? "Loading the virtual model and jewellery overlay for real-time preview."
                      : "AI is learning the most natural jewellery placement in real time."}
                  </span>
                </div>
              )}

            {mode === "model" && assetFailed && (
              <div className="tryon-stage-message">
                <CameraOff size={24} strokeWidth={1.4} />
                <strong>The overlay image could not be loaded.</strong>
                <span>
                  Check your connection and reload the page — the rest of the
                  collection is still available.
                </span>
              </div>
            )}

            {mode === "camera" && cameraState === "starting" && (
              <div className="tryon-loading">
                <Loader2 className="tryon-spin" size={22} strokeWidth={1.5} />
                <strong>Waiting for camera permission</strong>
                <span>
                  Choose “Allow” in your browser to see the piece on you.
                </span>
              </div>
            )}

            {mode === "camera" && cameraState === "error" && (
              <div className="tryon-stage-message tryon-camera-error">
                <span className="tryon-message-icon">
                  <CameraOff size={24} strokeWidth={1.4} />
                </span>
                <strong>Camera unavailable</strong>
                <span>{cameraError}</span>
                <div className="tryon-message-actions">
                  <button type="button" onClick={() => void startCamera(facing)}>
                    <Video size={15} strokeWidth={1.6} />
                    Try again
                  </button>
                  <button
                    type="button"
                    className="is-quiet"
                    onClick={() => setMode("model")}
                  >
                    Use model
                  </button>
                </div>
              </div>
            )}

            {mode === "camera" &&
              cameraState === "idle" &&
              !cameraError && (
                <div className="tryon-stage-message tryon-camera-idle">
                  <span className="tryon-message-icon">
                    <Camera size={24} strokeWidth={1.4} />
                  </span>
                  <strong>Camera is off</strong>
                  <span>
                    Turn on the camera to try the piece on in real time.
                  </span>
                  <div className="tryon-message-actions">
                    <button
                      type="button"
                      onClick={() => void startCamera(facing)}
                    >
                      <Video size={15} strokeWidth={1.6} />
                      Enable camera
                    </button>
                  </div>
                </div>
              )}

            {mode === "photo" && (
              <input
                ref={photoInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  handlePhotoFile(file);
                }}
              />
            )}

            {mode === "photo" && !photoUrl && (
              <div
                className={`tryon-photo-upload ${photoDrag ? "is-dragging" : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setPhotoDrag(true);
                }}
                onDragLeave={() => setPhotoDrag(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setPhotoDrag(false);
                  handlePhotoFile(e.dataTransfer.files?.[0]);
                }}
              >
                <span className="tryon-photo-upload-icon">
                  <ImagePlus size={26} strokeWidth={1.4} />
                </span>
                <strong>Upload your hand photo</strong>
                <p>
                  Use a clear JPG, PNG or WEBP of your hand or wrist.
                  Drag &amp; drop or browse — AI will fit the piece automatically.
                </p>
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                >
                  Choose photo
                </button>
                {photoError && (
                  <span className="tryon-photo-error">{photoError}</span>
                )}
              </div>
            )}

            {mode === "photo" && photoUrl && (
              <div className="tryon-photo-tools">
                <span>
                  {photoState === "loading"
                    ? "Analysing photo…"
                    : photoError || "My Photo"}
                </span>
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                >
                  Replace
                </button>
                <button
                  type="button"
                  className="is-quiet"
                  onClick={removePhoto}
                >
                  Remove
                </button>
              </div>
            )}

            <div className="tryon-stage-caption">
              <div>
                <small>LIVE TRY-ON</small>
                <strong>{selectedProduct.name}</strong>
              </div>
              <span>
                {CATEGORY_COPY[asset.type]} · {asset.label}
              </span>
            </div>

            {/* BEFORE / AFTER SCAN OVERLAY */}
            {scanState === "on" && (
              <div className="tryon-scan-overlay">
                <span className="tryon-scan-label tryon-scan-label-before" style={{ left: `max(8px, ${scanPos - 12}%)` }}>BEFORE</span>
                <span className="tryon-scan-label tryon-scan-label-after" style={{ left: `min(calc(100% - 60px), ${scanPos + 2}%)` }}>AFTER</span>
                <div
                  className="tryon-scan-handle"
                  style={{ left: `${scanPos}%` }}
                  onMouseDown={handleScanMouseDown}
                  onTouchStart={handleScanMouseDown}
                >
                  <span className="tryon-scan-line" />
                  <span className="tryon-scan-circle">
                    <span>◀</span>
                    <span>▶</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="tryon-stage-meta">
            <div className="tryon-tracking-line">
              <span
                className={`tryon-live-dot ${
                  placement === "tracked" ? "is-active" : ""
                }`}
              />
              <span>{statusMessage}</span>
            </div>

            <div className="tryon-detection-chips">
              {group === "hand" ? (
                <span
                  className={`tryon-chip ${
                    summary.hands > 0 ? "is-on" : ""
                  }`}
                >
                  {summary.hands > 0 ? (
                    <Check size={12} strokeWidth={2} />
                  ) : (
                    <span className="tryon-chip-dot" />
                  )}
                  {trackingChipLabel(summary.hands, "hand")}
                </span>
              ) : (
                <>
                  <span
                    className={`tryon-chip ${summary.face ? "is-on" : ""}`}
                  >
                    {summary.face ? (
                      <Check size={12} strokeWidth={2} />
                    ) : (
                      <span className="tryon-chip-dot" />
                    )}
                    Face
                  </span>
                  <span
                    className={`tryon-chip ${summary.pose ? "is-on" : ""}`}
                  >
                    {summary.pose ? (
                      <Check size={12} strokeWidth={2} />
                    ) : (
                      <span className="tryon-chip-dot" />
                    )}
                    Pose
                  </span>
                </>
              )}
              <span className="tryon-chip tryon-chip-placement">
                {placement === "tracked"
                  ? "Precisely placed"
                  : placement === "manual"
                    ? "Manual fit"
                    : "Finding position"}
              </span>
            </div>
          </div>

          {/* DOWNLOAD + SCAN BUTTONS */}
          <div className="tryon-action-row tryon-action-row-desktop">
            <button
              type="button"
              className="tryon-action tryon-dl-btn"
              onClick={handleDownload}
            >
              <Download size={15} strokeWidth={1.6} />
              Save Image
            </button>
            <button
              type="button"
              className={`tryon-action tryon-scan-btn ${
                scanState === "on" ? "is-active" : "is-outline"
              }`}
              onClick={handleScanToggle}
            >
              <ScanLine size={15} strokeWidth={1.6} />
              {scanState === "on" ? "Close Scan" : "Compare"}
            </button>
            {downloadMsg && (
              <span className="tryon-dl-msg">{downloadMsg}</span>
            )}
          </div>
        </div>

        <aside className="tryon-sidebar">
          <section className="tryon-card tryon-piece-card">
            <div className="tryon-piece-media">
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.name}
              />
              <span className="tryon-piece-index">
                {String(selectedProduct.id).padStart(2, "0")}
              </span>
            </div>

            <div className="tryon-piece-copy">
              <span className="tryon-card-eyebrow">SELECTED PIECE</span>
              <h2>{selectedProduct.name}</h2>

              <div className="tryon-piece-price">
                <span>$</span>
                {selectedProduct.price.toLocaleString()}
                <small>USD</small>
              </div>

              <p>
                {CATEGORY_COPY[asset.type]} · {asset.label}
              </p>

              <Link
                href={`/shop/${selectedProduct.id}/`}
                className="tryon-piece-link"
              >
                View product details
                <ArrowUpRight size={14} strokeWidth={1.7} />
              </Link>
            </div>
          </section>
          

          <section className="tryon-card">
            <div className="tryon-card-head">
              <h3>AI Tracking & Live Preview</h3>
              <span className={`tryon-head-status ${statusTone}`}>
                <i />
                {statusLabel}
              </span>
            </div>

            <p className="tryon-help">{statusMessage}</p>

            {aiState === "error" && (
              <p className="tryon-note">
                AI tracking could not start on this device. The piece is shown
                in a refined default position — use the sliders below to
                personalise the fit.
              </p>
            )}

            {mode === "camera" && (
              <div className="tryon-camera-actions">
                {cameraState === "live" ? (
                  <>
                    <button
                      type="button"
                      className="tryon-action is-outline"
                      onClick={() =>
                        setFacing((current) =>
                          current === "user" ? "environment" : "user"
                        )
                      }
                    >
                      <SwitchCamera size={16} strokeWidth={1.6} />
                      Flip camera
                    </button>

                    <button
                      type="button"
                      className="tryon-action is-quiet"
                      onClick={stopCamera}
                    >
                      <X size={15} strokeWidth={1.7} />
                      Stop
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="tryon-action"
                    disabled={cameraState === "starting"}
                    onClick={() => void startCamera(facing)}
                  >
                    {cameraState === "starting" ? (
                      <Loader2
                        size={16}
                        strokeWidth={1.6}
                        className="tryon-spin"
                      />
                    ) : (
                      <Video size={16} strokeWidth={1.6} />
                    )}
                    {cameraState === "starting"
                      ? "Requesting access…"
                      : cameraError
                        ? "Try camera again"
                        : "Enable camera"}
                  </button>
                )}
              </div>
            )}

            {mode === "camera" && (
              <p className="tryon-note">
                {facing === "user"
                  ? "Front camera · mirrored live preview."
                  : "Rear camera · live preview."}
              </p>
            )}
          </section>

          {mode === "photo" && photoUrl && (
            <section className="tryon-card tryon-photo-fit-card">
              <div className="tryon-card-head">
                <h3>Photo Fit</h3>
                <button
                  type="button"
                  className="tryon-reset"
                  onClick={resetFit}
                >
                  <RotateCcw size={13} strokeWidth={1.6} />
                  Reset
                </button>
              </div>

              <label className="tryon-slider">
                <span>
                  Scale
                  <output>{size}%</output>
                </span>
                <input
                  type="range"
                  min={40}
                  max={200}
                  step={1}
                  value={size}
                  onChange={(event) => setSize(Number(event.target.value))}
                />
              </label>

              <label className="tryon-slider">
                <span>
                  Rotation
                  <output>{rotation > 0 ? `+${rotation}` : rotation}°</output>
                </span>
                <input
                  type="range"
                  min={-45}
                  max={45}
                  step={1}
                  value={rotation}
                  onChange={(event) => setRotation(Number(event.target.value))}
                />
              </label>

              <label className="tryon-slider">
                <span>
                  Horizontal
                  <output>{horizontal > 0 ? `+${horizontal}` : horizontal}%</output>
                </span>
                <input
                  type="range"
                  min={-20}
                  max={20}
                  step={1}
                  value={horizontal}
                  onChange={(event) => setHorizontal(Number(event.target.value))}
                />
              </label>

              <label className="tryon-slider">
                <span>
                  Vertical
                  <output>{vertical > 0 ? `+${vertical}` : vertical}</output>
                </span>
                <input
                  type="range"
                  min={-100}
                  max={140}
                  step={1}
                  value={vertical}
                  onChange={(event) => setVertical(Number(event.target.value))}
                />
              </label>

              <p className="tryon-note">
                AI fitted the piece to your photo. Use these controls for
                subtle personal adjustments.
              </p>
            </section>
          )}

          {/*
          <section className="tryon-card">
            <div className="tryon-card-head">
              <h3>Personalised Jewellery Fit</h3>
              <button
                type="button"
                className="tryon-reset"
                onClick={resetFit}
              >
                <RotateCcw size={13} strokeWidth={1.6} />
                Reset
              </button>
            </div>

            <label className="tryon-slider">
              <span>
                Jewellery size
                <output>{size}%</output>
              </span>
              <input
                type="range"
                min={40}
                max={200}
                step={1}
                value={size}
                onChange={(event) => setSize(Number(event.target.value))}
              />
            </label>

            <label className="tryon-slider">
              <span>
                Vertical position
                <output>{vertical > 0 ? `+${vertical}` : vertical}</output>
              </span>
              <input
                type="range"
                min={-100}
                max={140}
                step={1}
                value={vertical}
                onChange={(event) => setVertical(Number(event.target.value))}
              />
            </label>

            <p className="tryon-note">
              AI places the piece anatomically for a realistic fit. Use the
              sliders only for subtle personal adjustments.
            </p>
          </section>
          */}

          <section className="tryon-card tryon-switcher-card">
            <div className="tryon-card-head">
              <h3>Switch Jewellery</h3>
              <span className="tryon-count">{catalogEntries.length} pieces</span>
            </div>

            {/* Category filter tabs */}
            <div className="tryon-cat-tabs">
              {(["all", "bracelet", "ring", "necklace", "earrings"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`tryon-cat-tab${switcherFilter === cat ? " is-active" : ""}`}
                  onClick={() => setSwitcherFilter(cat)}
                >
                  {cat === "all" ? "All" : CATEGORY_COPY[cat]}
                </button>
              ))}
            </div>

            {allSelectedEntries.length > 1 && (
              <div className="tryon-combo-bar">
                <span className="tryon-combo-label">Wearing together:</span>
                <div className="tryon-combo-chips">
                  {allSelectedEntries.map((e) => (
                    <span key={e.product.id} className="tryon-combo-chip">
                      {CATEGORY_COPY[e.asset.type]}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="tryon-switcher">
              {catalogEntries.filter((e) => switcherFilter === "all" || e.asset.type === switcherFilter).map((entry) => {
                const type = entry.asset.type;
                const slotId = type === "ring" ? selRing : type === "bracelet" ? selBracelet : type === "necklace" ? selNecklace : selEarrings;
                const isActive = slotId === entry.product.id;
                const isPrimary = entry.product.id === primaryId;

                return (
                  <button
                    key={entry.product.id}
                    type="button"
                    className={`tryon-switch-item ${isActive ? "is-active" : ""} ${isActive && !isPrimary ? "is-extra" : ""}`}
                    onClick={() => selectProduct(entry.product.id)}
                    aria-pressed={isActive}
                  >
                    <span className="tryon-switch-thumb">
                      <img src={entry.product.images[0]} alt="" loading="lazy" />
                    </span>
                    <span className="tryon-switch-copy">
                      <strong>{entry.product.name}</strong>
                      <small>{CATEGORY_COPY[entry.asset.type]} · {entry.asset.label}</small>
                    </span>
                    <span className="tryon-switch-price">${entry.product.price.toLocaleString()}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </aside>
      </section>

      {/* ── Mobile bottom panel: always-visible category nav + carousel ── */}
      <div className="tryon-mobile-bottom">

        {/* Category tab navigation */}
        <nav className="tryon-mobile-cats" aria-label="Jewellery categories">
          {(["earrings", "ring", "necklace", "bracelet"] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              className={`tryon-mobile-cat-btn${switcherFilter === cat ? " is-active" : ""}`}
              onClick={() => setSwitcherFilter(cat)}
            >
              {CATEGORY_COPY[cat]}
            </button>
          ))}
          <button
            type="button"
            className={`tryon-mobile-cat-btn${switcherFilter === "all" ? " is-active" : ""}`}
            onClick={() => setSwitcherFilter("all")}
          >
            All
          </button>
        </nav>

        {/* Horizontal product carousel */}
        <div className="tryon-mobile-carousel" role="list">
          {catalogEntries.filter((e) => switcherFilter === "all" || e.asset.type === switcherFilter).map((entry) => {
            const type = entry.asset.type;
            const slotId = type === "ring" ? selRing : type === "bracelet" ? selBracelet : type === "necklace" ? selNecklace : selEarrings;
            const isActive = slotId === entry.product.id;
            const isPrimary = entry.product.id === primaryId;

            return (
              <button
                key={entry.product.id}
                type="button"
                role="listitem"
                className={`tryon-mobile-carousel-item${isActive ? " is-active" : ""}${isActive && !isPrimary ? " is-extra" : ""}`}
                onClick={() => selectProduct(entry.product.id)}
                aria-pressed={isActive}
              >
                <span className="tryon-mobile-carousel-thumb">
                  <img src={entry.product.images[0]} alt={entry.product.name} loading="lazy" />
                </span>
                <span className="tryon-mobile-carousel-name">{entry.product.name}</span>
                <span className="tryon-mobile-carousel-price">${entry.product.price.toLocaleString()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Preload all unique assets that are currently selected */}
      <div className="tryon-asset-preload" aria-hidden="true">
        {Array.from(new Map(allSelectedEntries.map((e) => [e.asset.id, e.asset])).values()).map((a) => (
          <img
            key={a.id}
            src={assetUrl(a.src)}
            alt=""
            crossOrigin={isCorsAsset(a.src) ? "anonymous" : undefined}
            ref={(el) => {
              if (el) assetImgRefsMap.current.set(a.id, el);
              else assetImgRefsMap.current.delete(a.id);
            }}
            onLoad={() => {
              assetLoadedMap.current.set(a.id, true);
              if (a.id === asset.id) setAssetLoaded(true);
              paint();
            }}
            onError={() => {
              if (a.id === asset.id) setAssetFailed(true);
            }}
          />
        ))}
      </div>
    </main>
  );
}

function UnsupportedTryOn({ product }: { product: Product }) {
  return (
    <main className="tryon-page">
      <div className="tryon-ambient tryon-ambient-one" aria-hidden="true" />

      <Link href={`/shop/${product.id}/`} className="tryon-back">
        <ArrowLeft size={15} strokeWidth={1.7} />
        <span>Back to Product</span>
      </Link>

      <section className="tryon-unsupported">
        <span className="tryon-unsupported-icon">
          <CameraOff size={30} strokeWidth={1.3} />
        </span>

        <span className="tryon-eyebrow">VIRTUAL TRY-ON</span>

        <h1>
          This piece is not part of the
          <em> virtual atelier.</em>
        </h1>

        <p>
          {product.name} sits outside the necklace, earring, ring and bracelet
          categories supported by live try-on. Its product page, pricing and
          checkout are unchanged.
        </p>

        <div className="tryon-unsupported-actions">
          <Link href={`/shop/${product.id}/`} className="tryon-action">
            <ArrowLeft size={15} strokeWidth={1.7} />
            Back to Product
          </Link>

          <Link href="/shop/" className="tryon-action is-outline">
            Explore the collection
            <ArrowUpRight size={14} strokeWidth={1.7} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function TryOnStudio({
  product,
  catalog,
}: {
  product: Product;
  catalog?: Product[];
}) {
  const initialAsset = getTryOnAssetForProduct(product);

  if (!initialAsset) {
    return <UnsupportedTryOn product={product} />;
  }

  return (
    <TryOnStudioInner
      product={product}
      initialAsset={initialAsset}
      catalog={catalog}
    />
  );
}

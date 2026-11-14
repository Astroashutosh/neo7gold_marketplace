// Extract real MediaPipe landmarks from the bundled model photos.
// Runs the same task models the browser app uses, in Node (CPU delegate).
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { FaceLandmarker, PoseLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const visRoot = path.join(root, "node_modules", "@mediapipe", "tasks-vision", "wasm");

const mime = { ".js": "text/javascript", ".wasm": "application/wasm" };
const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "").split("?")[0]);
  const file = path.join(visRoot, path.basename(urlPath));
  if (!fs.existsSync(file)) {
    res.writeHead(404);
    res.end("not found");
    return;
  }
  res.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const port = server.address().port;

async function toImageData(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data: new Uint8ClampedArray(data), width: info.width, height: info.height };
}

const fileset = await FilesetResolver.forVisionTasks(`http://127.0.0.1:${port}`);

const faceTask = await FaceLandmarker.createFromOptions(fileset, {
  runningMode: "IMAGE",
  numFaces: 1,
  outputFaceBlendshapes: false,
  outputFacialTransformationMatrixes: false,
  baseOptions: {
    modelAssetBuffer: new Uint8Array(fs.readFileSync(path.join(root, "public/tryon/models/mediapipe/face_landmarker.task"))),
    delegate: "CPU",
  },
});

const poseTask = await PoseLandmarker.createFromOptions(fileset, {
  runningMode: "IMAGE",
  numPoses: 1,
  outputSegmentationMasks: false,
  baseOptions: {
    modelAssetBuffer: new Uint8Array(fs.readFileSync(path.join(root, "public/tryon/models/mediapipe/pose_landmarker_lite.task"))),
    delegate: "CPU",
  },
});

const models = ["model.jpg", "model2.jpg", "model3.jpg"];
const output = {};

for (const name of models) {
  const file = path.join(root, "public", "tryon", "models", name);
  const img = await toImageData(file);
  const face = faceTask.detect(img);
  const pose = poseTask.detect(img);
  output[name] = {
    width: img.width,
    height: img.height,
    face: face.faceLandmarks?.[0] || null,
    pose: pose.landmarks?.[0] || null,
  };
  console.log(name, "face", Boolean(face.faceLandmarks?.[0]), "pose", Boolean(pose.landmarks?.[0]));
}

fs.writeFileSync(path.join(root, "scripts", "model-landmarks.json"), JSON.stringify(output));
faceTask.close();
poseTask.close();
server.close();

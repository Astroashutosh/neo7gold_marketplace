"""Extract real MediaPipe landmarks from bundled model photos (browser-equivalent models)."""
import json
import os

import cv2
import mediapipe as mp
from mediapipe.tasks.python import vision
from mediapipe.tasks.python.core.base_options import BaseOptions

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS = os.path.join(ROOT, "public", "tryon", "models")

face_opts = vision.FaceLandmarkerOptions(
    base_options=BaseOptions(
        model_asset_path=os.path.join(MODELS, "mediapipe", "face_landmarker.task")
    ),
    running_mode=vision.RunningMode.IMAGE,
    num_faces=1,
    output_face_blendshapes=False,
    output_facial_transformation_matrixes=False,
)
pose_opts = vision.PoseLandmarkerOptions(
    base_options=BaseOptions(
        model_asset_path=os.path.join(MODELS, "mediapipe", "pose_landmarker_lite.task")
    ),
    running_mode=vision.RunningMode.IMAGE,
    num_poses=1,
    output_segmentation_masks=False,
)

face = vision.FaceLandmarker.create_from_options(face_opts)
pose = vision.PoseLandmarker.create_from_options(pose_opts)

out = {}
for name in ["model.jpg", "model2.jpg", "model3.jpg"]:
    path = os.path.join(MODELS, name)
    bgr = cv2.imread(path)
    h, w = bgr.shape[:2]
    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
    image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
    fr = face.detect(image)
    pr = pose.detect(image)

    def lm(landmarks):
        return [{"x": p.x, "y": p.y, "z": getattr(p, "z", 0), "visibility": getattr(p, "visibility", 1)} for p in landmarks]

    out[name] = {
        "width": w,
        "height": h,
        "face": lm(fr.face_landmarks[0]) if fr.face_landmarks else None,
        "pose": lm(pr.pose_landmarks[0]) if pr.pose_landmarks else None,
    }
    print(name, "face", bool(fr.face_landmarks), "pose", bool(pr.pose_landmarks))

with open(os.path.join(ROOT, "scripts", "model-landmarks.json"), "w", encoding="utf-8") as handle:
    json.dump(out, handle)

face.close()
pose.close()

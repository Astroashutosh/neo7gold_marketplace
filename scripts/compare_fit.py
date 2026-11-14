import json, math

D = json.load(open("scripts/model-landmarks.json"))


def dist(a, b, w, h):
    return math.hypot((a["x"] - b["x"]) * w, (a["y"] - b["y"]) * h)


for name, m in D.items():
    w, h = m["width"], m["height"]
    f, p = m["face"], m["pose"]
    sh = dist(p[11], p[12], w, h)
    head = dist(f[234], f[454], w, h)
    jaw = dist(f[132], f[361], w, h)
    face = dist(f[10], f[152], w, h)
    pxcm = sh / 40
    left = {
        "x": f[152]["x"] + (p[11]["x"] - f[152]["x"]) * 0.42,
        "y": f[152]["y"] + (p[11]["y"] - f[152]["y"]) * 0.42,
    }
    right = {
        "x": f[152]["x"] + (p[12]["x"] - f[152]["x"]) * 0.42,
        "y": f[152]["y"] + (p[12]["y"] - f[152]["y"]) * 0.42,
    }
    anchors = dist(left, right, w, h)
    neck_old = sh * 30 / 40
    print(
        name,
        "shoulderPx",
        round(sh, 1),
        "headPx",
        round(head, 1),
        "jawPx",
        round(jaw, 1),
        "facePx",
        round(face, 1),
        "px/cm",
        round(pxcm, 3),
        "anchorPx",
        round(anchors, 1),
        "old neckPx(30cm)",
        round(neck_old, 1),
    )
    for pid, wcm, hcm, ds in [
        ("chain", 16.5, 18, 1.0),
        ("crown", 16, 20, 0.92),
        ("diamond", 15, 16, 1.06),
    ]:
        oldw = neck_old * (wcm / 30) * 1.35 * ds
        oldh = hcm * pxcm * ds
        print(
            "  ",
            pid,
            "old w/h",
            round(oldw, 1),
            round(oldh, 1),
            "drawn aspect",
            round(oldh / oldw, 3),
            "natural .502 stretch",
            round((oldh / oldw) / 0.5018, 2),
        )
    for pid, chain in [("chain", 50), ("crown", 45), ("diamond", 45)]:
        worn = chain * 0.45
        tw = worn * pxcm
        print(
            "  ",
            pid,
            "new wornCm",
            worn,
            "w",
            round(tw, 1),
            "h",
            round(tw * 0.5018, 1),
        )

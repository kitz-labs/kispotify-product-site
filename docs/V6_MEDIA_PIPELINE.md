# V6 Media Pipeline

This folder documents the reproducible customer-facing video workflow for the KI Spotify Agent product website.

## Rules
- No OpenArt.
- Video rendering is repository-based and reproducible.
- Runtime renderer: FFmpeg, upstream repository: https://github.com/FFmpeg/FFmpeg
- Final browser format: H.264 / MP4 / yuv420p / 1280x720 / faststart.
- All videos are silent by design and use native HTML video with CSS/JS fallbacks.

## Render
From the repository root:

```bash
bash tools/render-v6-videos.sh
```

Optional output directory:

```bash
bash tools/render-v6-videos.sh /path/to/output
```

## Outputs
- assets/v6/product-film-v6.mp4 — 10s product story
- assets/v6/qr-guest-wishes-v6.mp4 — 8s QR guest-wish flow
- assets/v6/daypart-timeline-v6.mp4 — 10s hospitality daypart flow

## Frontend behavior
The website keeps lightweight CSS/JS motion previews as fallbacks. If a video cannot load, the customer still sees a complete visual explanation instead of a broken player.

#!/usr/bin/env bash
# Encode a raw video into web-ready assets for the start page hero.
# Usage: scripts/encode-video.sh <input-file> [name]   (name defaults to "drone")
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <input-file> [name]" >&2
  exit 1
fi

input="$1"
name="${2:-drone}"
out="$(dirname "$0")/../src/assets/videos"
mkdir -p "$out"

ffmpeg -y -i "$input" -vf "scale=-2:1080" -c:v libx264 -crf 26 -preset slow \
  -pix_fmt yuv420p -an -movflags +faststart "$out/$name.mp4"
ffmpeg -y -i "$input" -vf "scale=-2:1080" -c:v libvpx-vp9 -crf 34 -b:v 0 \
  -row-mt 1 -an "$out/$name.webm"
ffmpeg -y -ss 1 -i "$input" -vf "scale=-2:1080" -frames:v 1 -q:v 3 "$out/$name.jpg"

ls -lh "$out/$name".*
echo "Keep each file under ~20 MB (Cloudflare Pages limit is 25 MB per file)."

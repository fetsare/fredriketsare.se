#!/usr/bin/env bash
# Compress a raw video (e.g. drone footage) into a web-ready MP4 for a Ghost video card.
# Usage: scripts/encode-video.sh <input-file>   → writes <input>-web.mp4 next to it
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <input-file>" >&2
  exit 1
fi

input="$1"
output="${input%.*}-web.mp4"

ffmpeg -y -i "$input" -vf "scale=-2:1080" -c:v libx264 -crf 26 -preset slow \
  -pix_fmt yuv420p -an -movflags +faststart "$output"

ls -lh "$output"

import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const GALLERY_DIR = path.join(process.cwd(), "public/images/gallery");
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const toAlt = (filename: string) =>
  path
    .basename(filename, path.extname(filename))
    .replace(/[-_]+/g, " ")
    .trim();

export async function getGalleryImages(): Promise<GalleryImage[]> {
  let files: string[];
  try {
    files = readdirSync(GALLERY_DIR);
  } catch {
    return [];
  }

  const candidates = files
    .filter((file) => ALLOWED_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .map((file) => ({
      file,
      mtime: statSync(path.join(GALLERY_DIR, file)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime);

  return Promise.all(
    candidates.map(async ({ file }) => {
      const metadata = await sharp(path.join(GALLERY_DIR, file)).metadata();
      return {
        src: `/images/gallery/${file}`,
        alt: toAlt(file),
        width: metadata.width ?? 800,
        height: metadata.height ?? 600,
      };
    }),
  );
}

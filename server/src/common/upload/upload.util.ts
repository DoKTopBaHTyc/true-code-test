import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname, join } from "path";
import * as fs from "fs";
import { config } from "../../config";

export function ensureUploadsDir(): string {
  const dir = join(process.cwd(), config.uploadsDir);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export function deleteFileSafely(absPath: string): void {
  try {
    if (fs.existsSync(absPath)) fs.unlinkSync(absPath);
  } catch {}
}

export function toAbsoluteUploadPath(relative: string): string {
  // relative like '/uploads/xxx.jpg' or 'uploads/xxx.jpg'
  const clean = relative.replace(/^\//, "");
  return join(process.cwd(), clean);
}

export function toPublicUploadPath(filename: string): string {
  return `/${config.uploadsDir}/${filename}`;
}

export function getImageMulterOptions(maxSizeBytes = 5 * 1024 * 1024): any {
  ensureUploadsDir();
  return {
    storage: diskStorage({
      destination: (_req, _file, cb) => cb(null, `./${config.uploadsDir}`),
      filename: (_req, file, cb) => {
        const name = uuidv4() + extname(file.originalname).toLowerCase();
        cb(null, name);
      },
    }),
    limits: { fileSize: maxSizeBytes },
    fileFilter: (_req: any, file: any, cb: any) => {
      const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (allowed.includes(file.mimetype)) return cb(null, true);
      return cb(null, false);
    },
  };
}

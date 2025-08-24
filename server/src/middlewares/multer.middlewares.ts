import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

// Helper: ensure directory exists
const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// General storage factory
const createUserStorage = (subFolder: "avatar" | "certification-medias" | "prompt-medias") =>
  multer.diskStorage({
    destination: (req: Request, file, cb) => {
      const userId = (req as any).user?._id;
      const userName = (req as any).user?.fullName || "user"; // fallback if no name
      const safeName = userName.replace(/\s+/g, "-").toLowerCase();
      const userFolder = `${userId}-${safeName}`;

      const dir = path.join("public", userFolder, subFolder);
      ensureDir(dir);
      cb(null, dir);
    },
    filename: (req: Request, file, cb) => {
      const userId = (req as any).user?._id;
      const originalExt = path.extname(file.originalname);

      // Use custom naming only for prompt uploads
      if (file.fieldname === "promptContent") {
        const title = (req.body?.title || "prompt")
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")      // replace spaces with dash
          .replace(/[^\w\-]/g, "");  // remove special characters
        cb(null, `${userId}-${title}${originalExt}`);
      } else {
        // default for other uploads
        cb(null, `${userId}-${file.fieldname}${originalExt}`);
      }
    },
  });


// Multer instances for each type
export const avatarUpload = multer({ storage: createUserStorage("avatar") });
export const promptContentUpload = multer({ storage: createUserStorage("prompt-medias") });
export const certificationUpload = multer({ storage: createUserStorage("certification-medias") });

// Dynamic certification upload middleware
const certificationUploadDynamic = (req: Request, res: Response, next: NextFunction) => {
  // Get idType from body (frontend must send before files)
  const idType = req.body?.idType;

  const fields: { name: string; maxCount: number }[] = [];

  if (idType === "nationalId") {
    fields.push({ name: "nidFront", maxCount: 1 });
    fields.push({ name: "nidBack", maxCount: 1 });
  } else if (idType === "passport") {
    fields.push({ name: "passport", maxCount: 1 });
  }

  // Resume is always required
  fields.push({ name: "resume", maxCount: 1 });

  // Max 5 education files
  for (let i = 0; i < 5; i++) {
    fields.push({ name: `educationEntriesFiles[${i}]`, maxCount: 1 });
  }

  // Max 5 additional certificates
  for (let i = 0; i < 5; i++) {
    fields.push({ name: `additionalCertificates[${i}]`, maxCount: 1 });
  }

  // Create multer instance using the same storage as certificationUpload
  const upload = multer({ storage: createUserStorage("certification-medias") });
  const multerMiddleware = upload.fields(fields);

  multerMiddleware(req, res, next);
};

export default certificationUploadDynamic;

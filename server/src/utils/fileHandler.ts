import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

/**
 * Helper: Ensure a directory exists. Creates recursively if missing.
 */
const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

/**
 * Storage factory for multer that supports dynamic folders and custom filenames
 */
const createUserStorage = (
  subFolder: "avatar" | "certification-medias" | "prompt-medias"
) =>
  multer.diskStorage({
    // Destination folder
    destination: (req: Request, file, cb) => {
      const userId = (req as any).user?._id;
      const userName = (req as any).user?.fullName || "user";
      const safeName = userName.replace(/\s+/g, "-").toLowerCase(); // sanitize
      const userFolder = `${userId}-${safeName}`;

      const dir = path.join("public", userFolder, subFolder);
      ensureDir(dir);
      cb(null, dir);
    },

    // Filename logic
    filename: (req: Request, file, cb) => {
      const userId = (req as any).user?._id;
      const fieldName = file.fieldname; // multer sets this
      const originalExt = path.extname(file.originalname);

      let filename = "";

      // Certification ID files
      if (fieldName === "nidFront") filename = `${userId}-nationalId-front${originalExt}`;
      else if (fieldName === "nidBack") filename = `${userId}-nationalId-back${originalExt}`;
      else if (fieldName === "passport") filename = `${userId}-passport${originalExt}`;
      else if (fieldName === "resume") filename = `${userId}-resume${originalExt}`;

      // Education files
      else if (fieldName.startsWith("educationEntriesFiles")) {
        const idx = fieldName.match(/\d+/)?.[0] || "0";
        filename = `${userId}-education-certificate-${Number(idx) + 1}${originalExt}`;
      }

      // Additional certificates
      else if (fieldName.startsWith("additionalCertificates")) {
        const idx = fieldName.match(/\d+/)?.[0] || "0";
        filename = `${userId}-additional-certificate-${Number(idx) + 1}${originalExt}`;
      }

      // Avatar
      else if (fieldName === "avatar") filename = `${userId}-avatar${originalExt}`;

     // Prompt content
else if (fieldName === "promptContent") {
  const { title } = req.body; // make sure 'title' is sent in FormData BEFORE the file
  const promptTitle = (title || "prompt")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")      // replace spaces with dash
    .replace(/[^\w\-]/g, "");  // remove special characters
  filename = `${userId}-${promptTitle}${path.extname(file.originalname)}`;
}


      // Default fallback
      else filename = `${userId}-${fieldName}${originalExt}`;

      cb(null, filename);
    },
  });

/**
 * Multer instances for different use-cases
 */
export const avatarUpload = multer({ storage: createUserStorage("avatar") });
export const promptContentUpload = multer({ storage: createUserStorage("prompt-medias") });
export const certificationUpload = multer({ storage: createUserStorage("certification-medias") });

/**
 * Dynamic certification upload middleware.
 * Handles different ID types (NID / Passport) + resume + education files + additional certificates
 */
const certificationUploadDynamic = (req: Request, res: Response, next: NextFunction) => {
  const idType = req.body?.idType;
  const fields: { name: string; maxCount: number }[] = [];

  // ID-specific fields
  if (idType === "nationalId") {
    fields.push({ name: "nidFront", maxCount: 1 });
    fields.push({ name: "nidBack", maxCount: 1 });
  } else if (idType === "passport") {
    fields.push({ name: "passport", maxCount: 1 });
  }

  // Resume always required
  fields.push({ name: "resume", maxCount: 1 });

  // Max 5 education files
  for (let i = 0; i < 5; i++) fields.push({ name: `educationEntriesFiles[${i}]`, maxCount: 1 });

  // Max 5 additional certificates
  for (let i = 0; i < 5; i++) fields.push({ name: `additionalCertificates[${i}]`, maxCount: 1 });

  // Use the same storage as certificationUpload
  const upload = multer({ storage: createUserStorage("certification-medias") });
  const multerMiddleware = upload.fields(fields);

  // Execute multer middleware
  multerMiddleware(req, res, next);
};

export default certificationUploadDynamic;

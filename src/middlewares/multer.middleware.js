// middlewares/conditionalUpload.js
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

// Folder to store uploads
const uploadFolder = "uploads/profile";

// Ensure folder exists
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder, { recursive: true });

// Use memory storage first to check file hash
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file");

export const conditionalUpload = (req, res, next) => {
  const contentType = req.headers["content-type"] || "";

  if (!contentType) return next(); // skip multer if no file

  upload(req, res, (err) => {
    if (err) return next(err);

    if (!req.file) return next();

    // Generate hash of file content
    const hash = crypto.createHash("md5").update(req.file.buffer).digest("hex");
    const ext = path.extname(req.file.originalname);
    const filename = `${hash}${ext}`;
    const filepath = path.join(uploadFolder, filename);

    // If file already exists, just set req.file.path
    if (fs.existsSync(filepath)) {
      req.file.path = filepath;
      return next();
    }

    // Otherwise, save file to disk
    fs.writeFileSync(filepath, req.file.buffer);
    req.file.path = filepath;

    next();
  });
};

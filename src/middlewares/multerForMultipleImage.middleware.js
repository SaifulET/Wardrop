import multer from "multer";
import crypto from "crypto";
import path from "path";
import fs from "fs";

const uploadFolder = "uploads/wishlists";

// ensure folder exists
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// store files in memory to compute hash first
const storage = multer.memoryStorage();
const upload = multer({ storage }).array("images", 10); // field name = images, max 10 files

export const conditionalMultipleUpload = (req, res, next) => {
  const contentType = req.headers["content-type"] || "";

  if (!contentType.includes("multipart/form-data")) return next(); // skip if no files

  upload(req, res, (err) => {
    if (err) return next(err);

    
    if (!req.files || req.files.length === 0) return next();

    req.savedFiles = [];

    req.files.forEach((file) => {
      // create hash
      const hash = crypto.createHash("md5").update(file.buffer).digest("hex");
      const ext = path.extname(file.originalname);
      const filename = `${hash}${ext}`;
      const filepath = path.join(uploadFolder, filename);

      // if already exists, skip writing
      if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, file.buffer);
      }

      // push file path (for saving in DB)
      req.savedFiles.push(`/uploads/wishlists/${filename}`);
      
    });

    next();
  });
};

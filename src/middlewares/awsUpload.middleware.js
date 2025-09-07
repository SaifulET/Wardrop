import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../services/aws.service.js";

export const conditionalUploads = (req, res, next) => {
  const contentType = req.headers["content-type"] || "";

  if (!contentType.includes("multipart/form-data")) {
    return next();
  }

  const upload = multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET_NAME,
      key: (req, file, cb) => {
        const safeName = file.originalname.replace(/\s+/g, "-");
        cb(null, `uploads/${Date.now()}-${safeName}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) cb(null, true);
      else cb(new Error("Only image files are allowed!"), false);
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  });

  upload.any()(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });

    if (req.files && req.files.length > 0) {
      req.uploadedFiles = req.files.map((file) => ({
        key: file.key,
        bucket: file.bucket,
        location: file.location, // may be undefined if ACLs disabled
      }));
    }

    next();
  });
};

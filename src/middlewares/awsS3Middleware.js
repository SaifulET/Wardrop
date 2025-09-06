import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const conditionalUpload = (req, res, next) => {
  const contentType = req.headers["content-type"] || "";

  // If no multipart/form-data, skip multer
  if (!contentType.includes("multipart/form-data")) {
    return next();
  }

  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME,
      acl: "public-read", // or "private"
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, `uploads/${Date.now()}-${file.originalname}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      // only images
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed!"), false);
      }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  });

  // Use `.any()` so it works for one or many files
  upload.any()(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    next();
  });
};

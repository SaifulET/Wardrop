import dotenv from "dotenv";
dotenv.config();

import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// ✅ Init S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

if (!process.env.AWS_BUCKET_NAME) {
  throw new Error("AWS_BUCKET_NAME is not defined in .env");
}

// ✅ Generate presigned URL helper
const getPresignedUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });
  return await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hour
};

// ✅ Middleware
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
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed!"), false);
      }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  });

  upload.any()(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (req.files && req.files.length > 0) {
      // Generate presigned URLs for uploaded files
      req.uploadedFiles = await Promise.all(
        req.files.map(async (file) => {
          const url = await getPresignedUrl(file.key);
          return {
            key: file.key,
            bucket: file.bucket,
            url, // presigned URL for viewing
          };
        })
      );
    }

    next();
  });
};

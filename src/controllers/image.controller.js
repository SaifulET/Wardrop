import { getPresignedUrl } from "../services/aws.service.js";

// Upload controller
export const uploadImages = async (req, res) => {
  if (!req.uploadedFiles || req.uploadedFiles.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  // Generate presigned URLs for all files
  const filesWithUrls = await Promise.all(
    req.uploadedFiles.map(async (file) => {
      const url = await getPresignedUrl(file.key);
      return {
        key: file.key,
        url,
      };
    })
  );

  res.json({
    message: "Upload successful!",
    files: filesWithUrls,
  });
};

// Get single image presigned URL
export const getImage = async (req, res) => {
  const { key } = req.params; // key should be URL encoded if contains special chars

  if (!key) return res.status(400).json({ error: "Key is required" });

  try {
    const url = await getPresignedUrl(key);
    res.json({ key, url });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate presigned URL", details: err.message });
  }
};

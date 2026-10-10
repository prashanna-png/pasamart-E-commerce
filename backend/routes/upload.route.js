import express from "express";
import multer from "multer";
import path from "path";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "_" + file.originalname;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  const allowedTypes = [".jpg", ".jpeg", ".png", ".gif"];

  if (file.mimetype.startsWith("image/") || allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, //optional
});

router.post("/", upload.single("image"), async(req, res) => {
  const resp  = await cloudinary.uploader.upload(req.file.path, {
    folder: "HimalayaShop",
  });
  res.send({ message: "Image uploaded ", image: resp.secure_url });
});

export default router;
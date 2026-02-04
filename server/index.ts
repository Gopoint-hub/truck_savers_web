import express from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Middleware para parsear JSON
app.use(express.json());

// Endpoint para subir imágenes a Cloudinary
app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No image provided" });
    }

    // Subir a Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "truck_savers",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file!.buffer);
    });

    res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ success: false, error: "Failed to upload image" });
  }
});

// Endpoint para subir múltiples imágenes
app.post("/api/upload-multiple", upload.array("images", 20), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, error: "No images provided" });
    }

    const uploadPromises = files.map((file) =>
      new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "truck_savers",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(file.buffer);
      })
    );

    const results = await Promise.all(uploadPromises);

    res.json({
      success: true,
      images: results.map((r) => ({
        url: r.secure_url,
        public_id: r.public_id,
        width: r.width,
        height: r.height,
      })),
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ success: false, error: "Failed to upload images" });
  }
});

// Servir archivos estáticos del frontend
const distPath = path.join(__dirname, "..");
app.use(express.static(distPath));

// SPA fallback - todas las rutas no encontradas van al index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

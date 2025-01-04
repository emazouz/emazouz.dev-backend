import { mongooseConnect } from "@/lib/mongoose";
import cloudinary from "cloudinary";
import multiparty from "multiparty";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handle(req, res) {
  await mongooseConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new multiparty.Form();
  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const fileArray = files.file || []; // assuming the uploaded field name is "file"

    const links = await Promise.all(
      fileArray.map(async (file) => {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: "vbm-admin",
          public_id: `file_${Date.now()}`,
          resource_type: "auto",
        });
        return result.secure_url;
      })
    );

    return res.status(200).json({ links });
  } catch (error) {
    console.error("Error uploading files:", error);
    return res.status(500).json({ error: "File upload failed" });
  }
}

export const config = {
  api: { bodyParser: false }, // Disable bodyParser to handle file uploads
};

import { Schema, models, model } from "mongoose";

// تعريف مخطط المشروع
const PhotoSchema = new Schema(
  {
    title: { type: String, required: true }, // عنوان المشروع
    slug: { type: String, required: true, unique: true }, // معرّف المشروع (slug)
    images: [{ type: String, required: true }], // قائمة روابط الصورة
  },
  {
    timestamps: true, // يضيف createdAt و updatedAt تلقائيًا
  }
);

// تصدير النموذج
export default models.Photo || model("Photo", PhotoSchema, "photos");

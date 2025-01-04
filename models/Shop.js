import { Schema, models, model } from "mongoose";

// تعريف مخطط المشروع
const ProductSchema = new Schema(
  {
    title: { type: String, required: true }, // عنوان المشروع
    slug: { type: String, required: true, unique: true }, // معرّف المشروع (slug)
    images: [{ type: String }], // قائمة روابط الصور
    description: { type: String, required: true }, // وصف المشروع
    productCategory: [{ type: String }], // تصنيفات المشروع
    tags: [{ type: String }], // علامات المشروع
    afilink: { type: String }, // رابط المعاينة المباشرة
    price: { type: String }, // رابط المعاينة المباشرة
    status: { type: String },
  },
  {
    timestamps: true, // يضيف createdAt و updatedAt تلقائيًا
  }
);

// تصدير النموذج
export default models.Product || model("Product", ProductSchema, "shops");

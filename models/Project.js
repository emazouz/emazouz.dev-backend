import mongoose, { Schema, models, model } from "mongoose";

// تعريف مخطط المشروع
const ProjectSchema = new Schema(
  {
    title: { type: String, required: true }, // عنوان المشروع
    slug: { type: String, required: true, unique: true }, // معرّف المشروع (slug)
    images: [{ type: String }], // قائمة روابط الصور
    description: { type: String, required: true }, // وصف المشروع
    client: { type: String }, // اسم العميل
    projectCategory: [{ type: String }], // تصنيفات المشروع
    tags: [{ type: String }], // علامات المشروع
    livePreview: { type: String }, // رابط المعاينة المباشرة
    overview: { type: String },
    openSource: { type: String },
    status: { type: String },
  },
  {
    timestamps: true, // يضيف createdAt و updatedAt تلقائيًا
  }
);

// تصدير النموذج
export default models.Project || model("Project", ProjectSchema, "projects");

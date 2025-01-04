// import { Schema, models, model } from "mongoose";

// // تعريف مخطط التعليقات
// const CommentSchema = new Schema(
//   {
//     name: { type: String, required: true }, // اسم المستخدم
//     email: { type: String }, // البريد الإلكتروني
//     title: { type: String }, // عنوان التعليق
//     contentpera: { type: String, required: true }, // نص التعليق
//     mainComment: { type: Boolean, default: true }, // يشير إلى ما إذا كان تعليقًا رئيسيًا
//     blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true }, // الربط بالمدونة
//     parent: { type: Schema.Types.ObjectId, ref: "Comment", default: null }, // تعليق الأب (للردود)
//     children: [{ type: Schema.Types.ObjectId, ref: "Comment" }], // الردود (مصفوفة من التعليقات)
//     parentName: { type: String, default: null }, // اسم صاحب التعليق الأب
//   },
//   {
//     timestamps: true, // يضيف createdAt و updatedAt تلقائيًا
//   }
// );

// // تصدير النموذج
// export default models.Comment || model("Comment", CommentSchema, "Comments");

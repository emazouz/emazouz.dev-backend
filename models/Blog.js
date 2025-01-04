import { Schema, models, model } from "mongoose";

const BlogSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, require: true },
    overview: { type: String },
    images: [{ type: String }],
    description: { type: String },
    blogCategory: [{ type: String }],
    tags: [{ type: String }],
    authorsName: [{ type: String }],
    authorsImg: [{ type: String }],
    status: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
  },
  { timestamps: true }
);

export default models.Blog || model("Blog", BlogSchema, "Blogs");

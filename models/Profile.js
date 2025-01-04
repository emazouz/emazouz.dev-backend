import { Schema, models, model } from "mongoose";

const ProfileSchema = new Schema(
  {
    email: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);

export default models.Profile || model("Profile", ProfileSchema, "admin");

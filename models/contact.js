import { Schema, models, model } from "mongoose";

const ContactSchema = new Schema(
  {
    name: { type: String, require: true },
    lname: { type: String },
    email: { type: String, require: true },
    company: { type: String },
    phone: { type: String, require: true },
    country: { type: String },
    price: { type: String },
    description: { type: String },
    project: [{ type: String }],
  },
  { timestamps: true }
);

export default models.Contact || model("Contact", ContactSchema, "contacts");

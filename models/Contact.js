import { Schema, model } from "mongoose";
import { handleSaveError, updateSettings } from "./hooks.js";
import Joi from "joi";

//       MONGOOSE SCHEMA
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  avatarURL: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", updateSettings);
contactSchema.post("findOneAndUpdate", handleSaveError);

//      JOI SCHEMA
export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).or("name", "email", "phone");

export const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

export default Contact;

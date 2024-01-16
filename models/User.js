import { Schema, model } from "mongoose";
import { handleSaveError, updateSettings } from "./hooks.js";
import Joi from "joi";

// const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//       MONGOOSE SCHEMA
const userMongooseSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      // match: regexEmail,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userMongooseSchema.post("save", handleSaveError);
userMongooseSchema.pre("findOneAndUpdate", updateSettings);
userMongooseSchema.post("findOneAndUpdate", handleSaveError);

//     JOI SCHEMA
export const signupJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const signinJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const emailJoiSchema = Joi.object({
  email: Joi.string().required(),
});

export const User = model("user", userMongooseSchema);

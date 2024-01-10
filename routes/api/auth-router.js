import express from "express";
import { validateBody } from "../../decorators/index.js";
import { signupJoiSchema, signinJoiSchema } from "../../models/User.js";

import { isEmptyBody, authenticate, upload } from "../../middlewares/index.js";

import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(signupJoiSchema),
  authController.signup
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(signinJoiSchema),
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

export default authRouter;

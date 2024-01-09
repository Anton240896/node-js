import express from "express";
import contactController from "../../controllers/contact-controller.js";

import {
  authenticate,
  isEmptyBody,
  isValidId,
  upload,
} from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import {
  contactAddSchema,
  contactUpdateSchema,
  contactFavoriteSchema,
} from "../../models/Contact.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

//   GET CONTACTS
contactsRouter.get("/", authenticate, contactController.getAll);

//   GET ID CONTACTS
contactsRouter.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactController.getById
);

//   ADD CONTACTS
contactsRouter.post(
  "/",
  upload.single("avatar"),
  authenticate,
  isEmptyBody,
  validateBody(contactAddSchema),
  contactController.addById
);

//   DELETE CONTACTS
contactsRouter.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactController.deleteById
);

//   UPDATE CONTACTS
contactsRouter.put(
  "/:contactId",
  authenticate,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactController.updateById
);

//   EXAMINATION (TRUE OR FALSE)
contactsRouter.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody(contactFavoriteSchema),
  contactController.updateById
);

export default contactsRouter;

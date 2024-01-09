import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import fs from "fs/promises";
import path from "path";

const avatarsPath = path.resolve("public", "avatars");

//  GET CONTACTS
const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "", { skip, limit }).populate(
    "owner",
    "name email"
  );
  res.json(result);
};

//  GET ID CONTACTS
const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, error.message);
  }
  res.json(result);
};

//  ADD ID CONTACTS
const addById = async (req, res) => {
  const { _id: owner } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);
  const avatar = path.join("public", "avatars", filename);
  const result = await Contact.create({ ...req.body, avatar, owner });
  res.status(201).json(result);
};

//  UPDATE CONTACTS
const updateById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId, req.body, {
    new: true,
    runValitadors: true,
  });

  if (!result) {
    throw HttpError(404, error.message);
  }
  res.json(result);
};

//  DELETE CONTACTS
const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, error.message);
  }
  res.json({
    message: "Delete success",
  });
};

//     UPDATE FAVORITE CONTACTS
const updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  const existingContact = await Contact.findByIdAndUpdate(id);
  if (!existingContact) {
    throw HttpError(404, error.message);
  }

  if (!req.body.favorite) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).send(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addById: ctrlWrapper(addById),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
};

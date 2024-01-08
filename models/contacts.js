import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");
// const contactsPath = path.join(__dirname, "contacts.json"); - work only CommonJS

export const contactsService = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));

//  Повертає масив контактів.
export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

//  Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contactId === contact.id) || null;
};

// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contactId === contact.id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await contactsService(contacts);
  return result;
};

// Повертає об'єкт доданого контакту.
export const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await contactsService(contacts);
  return newContact;
};

// Повертає об'єкт в json-форматі c оновленням
export const updatContactById = async (name, email, phone) => {
  const contacts = await listContacts();
  const index = movies.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  movies[index] = { ...movies[index], ...data };
  await updateMovies(movies);
  return movies[index];
};

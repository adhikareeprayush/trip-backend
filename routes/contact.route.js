import express from "express";
import {
  getContacts,
  createContact,
  updateContactStatus,
  deleteContact,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.get("/contacts", getContacts);
router.post("/contacts", createContact);
router.put("/contacts/:id", updateContactStatus);
router.delete("/contacts/:id", deleteContact);

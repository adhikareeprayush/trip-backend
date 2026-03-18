import {
  addSubscriber,
  deleteSubscriber,
  getSubscribers,
  updateSubsbcriberStatus,
} from "../controllers/subscriber.controller.js";
import express from "express";

const router = express.Router();

router.get("/subscribers", getSubscribers);
router.post("/subscribers", addSubscriber);
router.put("/subscribers/:id", updateSubsbcriberStatus);
router.delete("/subscribers/:id", deleteSubscriber);

export default router;

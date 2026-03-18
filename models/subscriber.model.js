import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  source: {
    type: String,
  },
});

export const Subscriber = mongoose.model("Subscriber", subscriberSchema);

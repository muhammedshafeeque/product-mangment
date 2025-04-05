import mongoose from "mongoose";
import { COLLECTIONS } from "../Constants/Collections.js";

const profileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: COLLECTIONS.USERS,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ["customer", "seller","admin"],
    default: "customer",
  },
},
{
  timestamps: true,
}
);

export const PROFILES = mongoose.model(COLLECTIONS.PROFILES, profileSchema);

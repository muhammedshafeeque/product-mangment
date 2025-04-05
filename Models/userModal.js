import mongoose from "mongoose";
import { COLLECTIONS } from "../Constants/Collections.js";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

},
{
  timestamps: true,
}
);

export const USERS = mongoose.model(COLLECTIONS.USERS, userSchema);

import mongoose from "mongoose";
import { COLLECTIONS } from "../Constants/Collections.js";

const manufactureSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
    email: {
    type: String,
    required: true,
    unique:true
  },
  address: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
}
);

export const MANUFACTURES = mongoose.model(
  COLLECTIONS.MANUFACTURES,
  manufactureSchema
);
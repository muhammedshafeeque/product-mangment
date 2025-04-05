import mongoose from "mongoose";
import { COLLECTIONS } from "../Constants/Collections.js";

const sellerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: COLLECTIONS.PROFILES,
    required: true,
  },
},
{
  timestamps: true,
}
);

export const SELLERS = mongoose.model(COLLECTIONS.SELLERS, sellerSchema);

import mongoose from "mongoose";
import { COLLECTIONS } from "../Constants/Collections.js";
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  manufacture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: COLLECTIONS.MANUFACTURES,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: COLLECTIONS.SELLERS,
    required: true,
  },
  status: {
    type: String,
    enum: ["instock", "outofsotck","faulty"],
    default: "instock",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: COLLECTIONS.PROFILES,
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: COLLECTIONS.PROFILES,
  },
},
{
  timestamps: true,
}
);

export const PRODUCTS = mongoose.model(COLLECTIONS.PRODUCTS, productSchema);
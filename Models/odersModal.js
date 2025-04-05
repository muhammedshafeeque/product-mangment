import mongoose from "mongoose";
import { COLLECTIONS } from "../Constants/Collections.js";

const orderSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: COLLECTIONS.PROFILES,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: COLLECTIONS.PRODUCTS,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
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
  { timestamps: true }
);

export const ORDERS = mongoose.model(COLLECTIONS.ORDERS, orderSchema);

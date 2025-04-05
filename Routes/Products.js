import express from "express";
import {  VerifySeller } from "../middleWares/VerifyUser.js";
import { getProducts, createProduct, updateProduct } from "../Controllers/ProductController.js";

import { ProductSchema, updateProductStatusSchema, updateProductSchema } from "../Schema/Product.js";
import { validate } from "../middleWares/Validator.js";
const router = express.Router();

router.get("/",  getProducts);
router.post("/",  VerifySeller, validate(ProductSchema), createProduct);
router.patch("/update-status/:id",  VerifySeller, validate(updateProductStatusSchema), updateProduct);
router.patch("/:id",  VerifySeller, validate(updateProductSchema), updateProduct);

export default router;

import express from "express";
import { createManufacture, getManufactures } from "../Controllers/ManufactureController.js";
import { validate } from "../middleWares/Validator.js";
import { ManufactureSchema } from "../Schema/Manufactures.js";
const router = express.Router();

router.get("/",  getManufactures);
router.post("/", validate(ManufactureSchema), createManufacture);

export default router;

import express from "express";
import AuthRouter from "./AuthRouter.js";
import ProductsRouter from "./Products.js";
import ManufacturesRouter from "./Manufactures.js";
import { VerifyLogin } from "../middleWares/VerifyUser.js";
import OrderRouter from "./OrderRouter.js";
const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/products",VerifyLogin, ProductsRouter);
router.use("/manufactures", VerifyLogin, ManufacturesRouter);
router.use("/orders", VerifyLogin, OrderRouter);


export default router;
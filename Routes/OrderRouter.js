import { Router } from "express";
   
import { createOrder, getOrders, mostOrderedProducts, getMonthlyOrderStats } from "../Controllers/orderController.js";
import { OrderSchema } from "../Schema/Order.js";
import { validate } from "../middleWares/Validator.js";
const router = Router();

router.post("/", validate(OrderSchema), createOrder);
router.get("/", getOrders);
router.get("/most-ordered-products", mostOrderedProducts);
router.get("/monthly-stats", getMonthlyOrderStats);

export default router;
import express from "express";
import { register, login } from "../Controllers/AuthController.js";
import { validate } from "../middleWares/Validator.js";
import { registerSchema, loginSchema } from "../Schema/Auth.js";
const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { register, login, getMe } from "../controllers/authController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(register));
router.post("/login", validate(loginSchema), asyncHandler(login));
router.get("/me", authMiddleware, asyncHandler(getMe));
export default router;

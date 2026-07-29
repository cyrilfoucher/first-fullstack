import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  register,
  login,
  getMe,
  putMe,
  changePassword,
  forgotPassword,
} from "../controllers/authController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { validate } from "../middlewares/validate.js";
import {
  registerSchema,
  loginSchema,
  putMeSchema,
  changePasswordSchema,
  forgotPasswordSchema,
} from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(register));
router.post("/login", validate(loginSchema), asyncHandler(login));
router.get("/me", authMiddleware, asyncHandler(getMe));
router.put("/me", authMiddleware, validate(putMeSchema), asyncHandler(putMe));
router.put(
  "/me/password",
  authMiddleware,
  validate(changePasswordSchema),
  asyncHandler(changePassword),
);
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  asyncHandler(forgotPassword),
);
export default router;

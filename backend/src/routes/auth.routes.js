import { Router } from "express";
import { Register } from "../controllers/authController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const router = Router();

router.post("/register", asyncHandler(register));

export default router;

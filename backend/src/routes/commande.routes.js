import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { createCommande } from "../controllers/commandeControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();
router.post("/", authMiddleware, asyncHandler(createCommande));

export default router;

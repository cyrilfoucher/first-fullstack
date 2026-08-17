import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import {
  createCommande,
  getCommandes,
} from "../controllers/commandeControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();
router.post("/", authMiddleware, asyncHandler(createCommande));
router.get("/me", authMiddleware, asyncHandler(getCommandes));
export default router;

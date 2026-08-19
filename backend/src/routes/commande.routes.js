import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import {
  createCommande,
  getCommandes,
  getToutesCommandes,
  updateStatutCommande,
} from "../controllers/commandeControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorize.js";

const router = Router();
router.post("/", authMiddleware, asyncHandler(createCommande));
router.get("/me", authMiddleware, asyncHandler(getCommandes));
router.get(
  "/",
  authMiddleware,
  authorize("admin"),
  asyncHandler(getToutesCommandes),
);
router.patch(
  "/:id",
  authMiddleware,
  authorize("admin"),
  asyncHandler(updateStatutCommande),
);
export default router;

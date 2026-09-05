import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import {
  getCommandes,
  getToutesCommandes,
  updateStatutCommande,
  annulerCommande,
} from "../controllers/commandeControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorize.js";

const router = Router();
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
router.patch("/:id/annulation", authMiddleware, asyncHandler(annulerCommande));
export default router;

import { Router } from "express";
import {
  creerSessionPaiement,
  webhookStripe,
} from "../controllers/stripeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
const router = Router();

router.post("/checkout", authMiddleware, asyncHandler(creerSessionPaiement));
router.post("/webhook", webhookStripe);

export default router;

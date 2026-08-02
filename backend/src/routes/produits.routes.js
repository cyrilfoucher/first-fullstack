import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorize.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { upload } from "../middlewares/upload.js";
import {
  getProduits,
  getProduit,
  postProduit,
  putProduit,
  deleteProduit,
} from "../controllers/produitsController.js";
import {
  createProduitSchema,
  updateProduitSchema,
} from "../schemas/produits.schema.js";

const router = Router();

router.get("/", asyncHandler(getProduits));
router.get("/:id", asyncHandler(getProduit));
router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  upload.single("image"),
  validate(createProduitSchema),
  asyncHandler(postProduit),
);
router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  validate(updateProduitSchema),
  asyncHandler(putProduit),
);
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  asyncHandler(deleteProduit),
);

export default router;

import {
  productCreateValidator,
  productPatchValidator,
} from "../validation/product";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/products";
import { Router } from "express";
import { authMiddleware } from "../middlewares/jwtMiddleware";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.patch("/:id", authMiddleware, productPatchValidator, updateProductById);
router.delete("/:id", authMiddleware, deleteProductById);
router.post("/", authMiddleware, productCreateValidator, createProduct);

export default router;

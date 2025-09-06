import { productCreateValidator, productPatchValidator } from "../joiSchemas/product";
import {
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/products";
import { Router } from "express";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.patch("/:id", productPatchValidator, updateProductById);
router.delete("/:id", deleteProductById);
router.post('/', productCreateValidator,  )

export default router;

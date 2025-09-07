import {
  productCreateValidator,
  productPatchValidator,
} from "../joiSchemas/product";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/products";
import { Router } from "express";
import { fileUpload } from "../middlewares/fileUpload";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.patch("/:id", productPatchValidator, updateProductById);
router.delete("/:id", deleteProductById);
router.post(
  "/",
  productCreateValidator,
  fileUpload.single("file"),
  createProduct
);

export default router;

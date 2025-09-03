import { deleteProductById, getAllProducts, getProductById, updateProductById } from "../controllers/products";
import { Router } from "express";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.patch("/:id", updateProductById);
router.delete("/:id", deleteProductById);

export default router;

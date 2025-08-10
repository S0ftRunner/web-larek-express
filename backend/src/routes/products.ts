import { getAllProducts, getProductById } from "../controllers/products";
import { Router } from "express";

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

export default router;
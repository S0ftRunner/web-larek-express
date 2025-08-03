import { getAllProducts } from "../controllers/products";
import { Router } from "express";

const router = Router();

router.get('/', getAllProducts);

export default router;
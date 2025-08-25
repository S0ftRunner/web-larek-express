import { orderValidator } from "../joiSchemas/order";
import { makeOrder } from "../controllers/order";
import { Router } from "express";

const router = Router();

router.post('/', orderValidator ,makeOrder);

export default router;
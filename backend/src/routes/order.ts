import { orderValidator } from "../validation/order";
import { makeOrder } from "../controllers/order";
import { Router } from "express";

const router = Router();

router.post("/", orderValidator, makeOrder);

export default router;

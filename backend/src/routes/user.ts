import { authMiddleware } from "../middlewares/jwtMiddleware";
import { user, login, register } from "../controllers/user";
import { Router } from "express";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get('/user', authMiddleware, user)

export default router;

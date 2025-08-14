import { user, login, register } from "../controllers/user";
import { Router } from "express";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get('/user', user)

export default router;

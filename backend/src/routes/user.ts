import { authMiddleware } from "../middlewares/jwtMiddleware";
import {
  user,
  login,
  register,
  logout,
  refreshAccessToken,
} from "../controllers/user";
import { Router } from "express";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", authMiddleware, user);
router.get("/logout", logout);
router.get("/token", refreshAccessToken);

export default router;

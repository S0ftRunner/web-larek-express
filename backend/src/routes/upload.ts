import { Router } from "express";
import { fileUpload } from "../middlewares/fileUpload";
import { upload } from "../controllers/upload";

const router = Router();

router.post("/", fileUpload.single("file"), upload);

export default router;

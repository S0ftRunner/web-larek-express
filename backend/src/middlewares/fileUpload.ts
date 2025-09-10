import multer from "multer";
import path from "path";

export const fileUpload = multer({ dest: path.join(__dirname, '../uploads') });

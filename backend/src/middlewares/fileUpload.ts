import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { extname, join } from "path";
import { FileTypes } from "../types";
import uniqueSlug from "unique-slug";
import { configs } from "../config";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, fileName: string) => void;

const storage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    cb(
      null,
      join(
        __dirname,
        configs.uploadTempPath
          ? `../public/${configs.uploadTempPath}`
          : "../public"
      )
    );
  },

  filename: (_req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    cb(
      null,
      `${uniqueSlug(new Date().toUTCString())}${extname(file.originalname)}`
    );
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (FileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const fileUpload = multer({
  storage,
  fileFilter,
});

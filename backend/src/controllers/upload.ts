import { configs } from "../config";
import BadRequestError from "../errors/bad-request-error";
import { NextFunction, Request, Response } from "express";
import { constants } from "http2";

export const upload = (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    if (!file) {
      throw new BadRequestError("Файл не загружен");
    }
    const fileName = configs.uploadPath
      ? `/${configs.uploadPath}/${req.file?.filename}`
      : `/${req.file?.filename}`;

    return res.status(constants.HTTP_STATUS_CREATED).send({
      fileName,
      originalName: req.file?.originalname,
    });
  } catch (error) {
    return next(error);
  }
};

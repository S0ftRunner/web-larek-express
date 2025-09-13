import { NextFunction, Request, Response } from "express";

export const upload = async (req: Request, res: Response, next: NextFunction) => {
  const file = req.file;
  // file.originalname - название файла
  // 
  if (!file) {
    return res.status(404).send({ message: "нет файла" });
  }

  return res.send({
    fileName: `/images/${file.filename}.${file.}`
  });
};
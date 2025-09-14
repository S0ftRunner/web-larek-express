import { Request, Response } from "express";

export const upload = (req: Request, res: Response) => {
  const file = req.file;
  console.log(JSON.stringify(req.body));
  if (!file) {
    return res.status(404).send({ message: "нет файла" });
  }
  return res.send({
    fileName: `/images/${file.filename}`,
    originalName: file.originalname,
  });
};

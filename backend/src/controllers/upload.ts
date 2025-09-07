import { Request, Response } from "express";

export const upload = async (req: Request, res: Response) => {
  console.log(req.file);
  const file = req.file;
  if (!file) {
    return res.status(404).send({ message: "нет файла" });
  }

  console.log(file);
  return res.send({ message: "ok" });
};
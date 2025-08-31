import { Request, Response } from "express";

export const makeOrder = (req: Request, res: Response) => {
  return res.send({ message: "Заказ выполнен успешно!" });
};

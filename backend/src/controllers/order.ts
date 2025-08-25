import { Request, Response } from "express";

export const makeOrder = (req: Request, res: Response) => {
  console.log("все ок");
  return res.send({ message: "Заказ выполнен успешно!" });
};

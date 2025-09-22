import { Request, Response } from "express";

export const makeOrder = async (req: Request, res: Response) => {
  const randomId =
    Math.random().toString(36).substring(2) + Date.now().toString(36);
  return res.send({ total: req.body.total, id: randomId });
};

import { Request, Response } from "express";
import product from "models/product";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await product.find({});

  return res.status(200).send({ message: products });
};

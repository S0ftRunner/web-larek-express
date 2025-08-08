import { Request, Response } from "express";
import product from "../models/product";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await product.find({});

    return res.status(200).send({ items: products });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

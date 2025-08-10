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

export const getProductById = async (req: Request, res: Response) => {
  try {
    const selectedProduct = product.findById(req.body.id);
    return res.status(200).send({ items: selectedProduct, total: 1 });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

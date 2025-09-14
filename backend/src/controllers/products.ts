import { Request, Response } from "express";
import fs from "fs/promises";
import product from "../models/product";
import path from "path";

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

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await product.findOneAndUpdate(
      req.body.id,
      { $set: { ...req.body } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: "Продукт не найден" });
    }
    return res.send(updatedProduct);
  } catch (err) {
    return res.status(500).send({ message: "Ошибка на стороне сервера" });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).send({ message: "Продукт не найден" });
    }

    return res.send(deletedProduct);
  } catch (err) {
    return res.status(500).send({ message: "Ошибка на стороне сервера" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const createdProduct = await product.create(req.body);

    const tempFileName = req.body.image.fileName.replace("/images/", "");

    const sourcePath = path.join(__dirname, "..", "uploads", tempFileName);
    const destPath = path.join(
      __dirname,
      "..",
      "public",
      "images",
      req.body.image.originalName
    );

    await fs.rename(sourcePath, destPath);
    return res.send(createdProduct);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "ошибка сохранения файла" });
  }
};

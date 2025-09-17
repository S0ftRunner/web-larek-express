import { NextFunction, Request, Response } from "express";
import product from "../models/product";
import { join } from "path";
import { movingFile } from "../utils/movingFile";
import { configs } from "../config";

export const getAllProducts = async (_req: Request, res: Response, next: NextFunction) => {
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
    const { image } = req.body;

    if (image) {
      movingFile(
        image.fileName,
        join(__dirname, `../public/${configs.uploadTempPath}`),
        join(__dirname, `../public/${configs.uploadPath}`)
      );
    }
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
    const { description, category, price, image, title } = req.body;
    if (image) {
      movingFile(
        image.fileName,
        join(__dirname, `../public/${configs.uploadTempPath}`),
        join(__dirname, `../public/${configs.uploadPath}`)
      );
    }

    const createdProduct = await product.create({
      description,
      image,
      category,
      price,
      title,
    });

    return res.send(createdProduct);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "ошибка сохранения файла" });
  }
};

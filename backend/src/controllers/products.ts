import { NextFunction, Request, Response } from "express";
import product from "../models/product";
import { join } from "path";
import { movingFile } from "../utils/movingFile";
import { configs } from "../config";
import { error } from "console";
import { HttpStatuses } from "../errors/errorsStatuses";

export const getAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await product.find({});

    return res.status(200).send({ items: products });
  } catch (err) {
    return res
      .status(HttpStatuses.NotFoundError)
      .send({ message: "Товаров нет!" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const selectedProduct = product.findById(req.body.id);
    return res.status(200).send({ items: selectedProduct, total: 1 });
  } catch (err) {
    return res
      .status(HttpStatuses.NotFoundError)
      .send({ message: "Товар не был найден!" });
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
      return res
        .status(HttpStatuses.NotFoundError)
        .send({ message: "Продукт не найден" });
    }

    return res.send(deletedProduct);
  } catch (err) {
    return res
      .status(HttpStatuses.InternalServerError)
      .send({ message: "Ошибка на стороне сервера" });
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
    if (error instanceof Error && error.message.includes("E11000")) {
      return res
        .status(HttpStatuses.DuplicateError)
        .send({ message: "Такое название уже есть в товарах!" });
    }
    return res
      .status(HttpStatuses.InternalServerError)
      .send({ message: "ошибка сохранения файла" });
  }
};

import { celebrate, Joi, Segments } from "celebrate";
import { TCategory, TImage } from "../types";

export interface IProduct {
  description?: string;
  image?: TImage;
  title?: string;
  category?: TCategory;
  price?: number;
}

const productJoiSchema = Joi.object({
  description: Joi.string().min(2),
  image: Joi.object({
    fileName: Joi.string().min(2),
    originalName: Joi.string().min(2),
  }),
  title: Joi.string().min(2),
  category: Joi.valid(
    "софт-скил",
    "хард-скил",
    "другое",
    "дополнительное",
    "кнопка"
  ),
  price: Joi.number().min(0),
});

export const productValidator = celebrate({
  [Segments.BODY]: productJoiSchema,
});

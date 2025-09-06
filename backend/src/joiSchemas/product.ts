import { celebrate, Joi, Segments } from "celebrate";
import { TCategory, TImage } from "../types";

export interface IProductPatch {
  description?: string;
  image?: TImage;
  title?: string;
  category?: TCategory;
  price?: number;
}

export interface IProductCreate {
  description: string;
  image: TImage;
  title: string;
  category: TCategory;
  price: number;
}

const productPatchJoiSchema: Joi.ObjectSchema<IProductPatch> = Joi.object({
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

const productCreateSchema: Joi.ObjectSchema<IProductCreate> = Joi.object({
  description: Joi.string().min(2).required(),
  image: Joi.object({
    fileName: Joi.string().min(2).required(),
    originalName: Joi.string().min(2).required(),
  }),
  title: Joi.string().min(2).required(),
  category: Joi.valid(
    "софт-скил",
    "хард-скил",
    "другое",
    "дополнительное",
    "кнопка"
  ).required(),
  price: Joi.number().min(0).required(),
});

export const productPatchValidator = celebrate({
  [Segments.BODY]: productPatchJoiSchema,
});

export const productCreateValidator = celebrate({
  [Segments.BODY]: productCreateSchema,
});

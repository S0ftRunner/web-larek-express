import mongoose from "mongoose";
import { Payment } from "../types";
import { celebrate, Joi, Segments } from "celebrate";

export interface IOrder {
  items: Array<mongoose.Types.ObjectId>;
  total: number;
  payment: Payment;
  email: string;
  phone: string;
  address: string;
}

export const orderJoiSchema = Joi.object({
  items: Joi.array().min(1).required(),
  total: Joi.number().required(),
  payment: Joi.valid(...Object.values(Payment)).required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const orderValidator = celebrate({
  [Segments.BODY]: orderJoiSchema,
});

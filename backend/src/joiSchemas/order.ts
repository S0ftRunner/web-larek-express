import mongoose from "mongoose";
import { Payment } from "../types";
import { Joi } from "celebrate";

export interface IOrder {
  items: Array<mongoose.Types.ObjectId>;
  total: number;
  payment: Payment;
  email: string;
  phone: string;
  address: string;
}

export const orderJoiSchema = Joi.object({
  items: Joi.array().required(),
  total: Joi.number(),
});

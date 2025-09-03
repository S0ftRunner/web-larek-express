import { TCategory, TImage } from "../types";

export interface IProduct {
  description?: string;
  image?: TImage;
  title?: string;
  category?: TCategory;
  price?: number; 
}
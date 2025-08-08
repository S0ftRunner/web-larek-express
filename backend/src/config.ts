import mongoose from "mongoose";
import dotenv from "dotenv";

export const configService = async () => {
  dotenv.config();
  await mongoose.connect(process.env.DB_ADDRESS || "");
};

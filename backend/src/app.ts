import express from "express";
import cors from "cors";
import productRoute from "./routes/products";
import mongoose from "mongoose";
import dotenv from 'dotenv';

const app = express();

app.use(cors());

dotenv.config();
app.use("/products", productRoute);
mongoose.connect(process.env.DB_ADDRESS || '');

app.listen(3000, () => {
  console.log("Сервер запущен");
});

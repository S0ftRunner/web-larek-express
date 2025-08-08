import express from "express";
import cors from "cors";
import productRoute from "./routes/products";
import { configService } from "./config";

const app = express();

app.use(cors());

configService();

app.use("/product", productRoute);

app.listen(3000, () => {
  console.log("Сервер запущен");
});

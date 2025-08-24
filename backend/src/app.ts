import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import productRoute from "./routes/products";
import userRoute from "./routes/user";
import { configs, configService } from "./config";

const app = express();
const { port, originAllow } = configs;
configService();

app.use(
  cors({
    origin: originAllow,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/product", productRoute);
app.use("/auth", userRoute);

app.listen(port, () => {
  console.log("Сервер запущен");
});

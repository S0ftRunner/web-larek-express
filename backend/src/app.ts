import express from "express";
import cors from "cors";
import productRoute from "./routes/products";
import userRoute from "./routes/user";
import { configService } from "./config";
import path from "path";

const app = express();

configService();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/product", productRoute);
app.use("/auth", userRoute);

app.listen(3000, () => {
  console.log("Сервер запущен");
});

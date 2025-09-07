import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import productRoute from "./routes/products";
import userRoute from "./routes/user";
import orderRoute from "./routes/order";
import uploadRoute from "./routes/upload";
import { configs, configService } from "./config";
import { errors } from "celebrate";
import { errorLogger, requestLogger } from "./middlewares/logger";
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

app.use(requestLogger);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errors());

app.use("/product", productRoute);
app.use("/auth", userRoute);
app.use("/order", orderRoute);
app.use("/upload", uploadRoute);
app.use(errorLogger);

app.listen(port, () => {
  console.log("Сервер запущен");
});

import { configs } from "../config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { MiddleWareRequestBody } from "types";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  const { jwtSecret } = configs;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, jwtSecret) as { _id: string };
  } catch (err) {
    return res.status(401).send({ message: "Нужна авторизация" });
  }

  console.log(payload);
  req.user!._id = payload._id;

  next();
};

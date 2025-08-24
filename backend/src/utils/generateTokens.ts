import jwt from "jsonwebtoken";
import { TGeneratedTokens } from "../types";
import { configs } from "../config";
import mongoose from "mongoose";

export const generateTokens = (
  id: mongoose.Types.ObjectId
): TGeneratedTokens => {
  const { accessTokenExpiry, refreshTokenExpiry } = configs.auth;
  const { jwtSecret } = configs;
  if (jwtSecret?.length === 0) {
    throw new Error("На сервере отсутствует jwt-секрет");
  }

  const accessToken = jwt.sign({ _id: id }, jwtSecret!, {
    expiresIn: accessTokenExpiry,
  });

  const refreshToken = jwt.sign({ _id: id }, jwtSecret!, {
    expiresIn: refreshTokenExpiry,
  });

  return {
    accessToken,
    refreshToken,
  };
};

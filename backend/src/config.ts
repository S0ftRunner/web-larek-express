import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NOT_FOUNDED_ENV_KEY } from "./utils/constants";


dotenv.config();

export const getEnvByKey = (envName: string, defaultValue?: string) => {
  const value = process.env[envName] || defaultValue;
  if (!value) {
    throw new Error(NOT_FOUNDED_ENV_KEY);
  }
  return value;
};

export const configs = {
  jwtSecret: getEnvByKey("JWT_SECRET", "secret-key"),
  auth: {
    refreshTokenExpiry: getEnvByKey("AUTH_REFRESH_TOKEN_EXPIRY", "secret-key") as jwt.SignOptions["expiresIn"],
    accessTokenExpiry: getEnvByKey("AUTH_ACCESS_TOKEN_EXPIRY", "secret-key") as jwt.SignOptions["expiresIn"],
  },
  port: getEnvByKey("PORT", "3000"),
  originAllow: getEnvByKey("ORIGIN_ALLOW", "secret-key"),
  dbAddress: getEnvByKey("DB_ADDRESS"),
};

export const configService = async () => {
  await mongoose.connect(configs.dbAddress);
};

import jwt from "jsonwebtoken";

export const SALT_SIZE = 10;

export const NOT_FOUNDED_USER = "Неправильный логин или пароль!";

export const MAX_AGE = 30 * 24 * 60 * 60 * 1000;

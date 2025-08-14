import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserLoginBodyDto, UserRegisterBodyDto } from "types";
import { SALT_SIZE } from "../utils/constants";
import User from "../models/user";
import ms from "ms";

export const register = async (
  req: Request<{}, {}, UserRegisterBodyDto>,
  res: Response
) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;

    const refreshTokenExpire = process.env
      .AUTH_REFRESH_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"];

    const accessTokenExpire = process.env
      .AUTH_ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"];

    if (jwtSecret?.length === 0) {
      return Promise.reject(new Error("На сервере отсутствует jwt-секрет"));
    }

    const { email, name, password } = req.body;
    const hash = await bcrypt.hash(password, SALT_SIZE);
    const createdUser = await User.create({
      name,
      email,
      password: hash,
    });
    const accessToken = jwt.sign({ _id: createdUser._id }, jwtSecret!, {
      expiresIn: accessTokenExpire!,
    });

    const refreshToken = jwt.sign({ _id: createdUser._id }, jwtSecret!, {
      expiresIn: refreshTokenExpire!,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: ms(
        (process.env.AUTH_REFRESH_TOKEN_EXPIRY || "7d") as ms.StringValue
      ),
      path: "/",
    });

    res.send({
      user: {
        name: createdUser.name,
        email: createdUser.email,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

export const login = async (
  req: Request<{}, {}, UserLoginBodyDto>,
  res: Response
) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;

    const refreshTokenExpire = process.env
      .AUTH_REFRESH_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"];

    const accessTokenExpire = process.env
      .AUTH_ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"];
    const { email, password } = req.body;

    if (jwtSecret?.length === 0) {
      return Promise.reject(new Error("На сервере отсутствует jwt-секрет"));
    }

    const findedUser = await User.findUserByCredentials(email, password);
    console.log(findedUser);

    const accessToken = jwt.sign({ _id: findedUser._id }, jwtSecret!, {
      expiresIn: accessTokenExpire!,
    });

    const refreshToken = jwt.sign({ _id: findedUser._id }, jwtSecret!, {
      expiresIn: refreshTokenExpire!,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: ms(
        (process.env.AUTH_REFRESH_TOKEN_EXPIRY || "7d") as ms.StringValue
      ),
      path: "/",
    });

    res.send({
      user: {
        name: findedUser.name,
        email: findedUser.email,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: err });
  }
};

export const user = async (res: Response, req: Request) => {

}
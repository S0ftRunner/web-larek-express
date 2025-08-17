import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ms from "ms";
import {
  MiddleWareRequestBody,
  RequestWithId,
  UserLoginBodyDto,
  UserRegisterBodyDto,
} from "types";
import User from "../models/user";
import { SALT_SIZE } from "../utils/constants";
import { configs } from "../config";

export const register = async (
  req: Request<{}, {}, UserRegisterBodyDto>,
  res: Response
) => {
  try {
    const { jwtSecret } = configs;

    const { refreshTokenExpiry, accessTokenExpiry } = configs.auth;

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
      expiresIn: accessTokenExpiry,
    });

    const refreshToken = jwt.sign({ _id: createdUser._id }, jwtSecret!, {
      expiresIn: refreshTokenExpiry,
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
    const { jwtSecret } = configs;

    const { refreshTokenExpiry, accessTokenExpiry } = configs.auth;

    const { email, password } = req.body;

    if (jwtSecret?.length === 0) {
      return Promise.reject(new Error("На сервере отсутствует jwt-секрет"));
    }

    const findedUser = await User.findUserByCredentials(email, password);

    const accessToken = jwt.sign({ _id: findedUser._id }, jwtSecret!, {
      expiresIn: accessTokenExpiry,
    });

    const refreshToken = jwt.sign({ _id: findedUser._id }, jwtSecret!, {
      expiresIn: refreshTokenExpiry!,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: ms((refreshTokenExpiry || "7d") as ms.StringValue),
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
  const id = req.user!._id;
  console.log(id);
  const findedUser = await User.findById({ id });
  console.log(`founded user is ${findedUser}`);
};

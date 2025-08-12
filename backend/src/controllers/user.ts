import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserLoginBodyDto, UserRegisterBodyDto } from "types";
import { NOT_FOUNDED_USER, SALT_SIZE } from "../utils/constants";
import user from "../models/user";

export const register = async (
  req: Request<{}, {}, UserRegisterBodyDto>,
  res: Response
) => {
  try {
    const { email, name, password } = req.body;
    const hash = await bcrypt.hash(password, SALT_SIZE);
    const createdUser = await user.create({
      name,
      email,
      password: hash,
    });

    res.status(200).send({
      user: { email: createdUser.email, name: createdUser.name },
      success: true,
      accessToken: "fesf",
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
    const findedUser = await user.findOne({ email });

    if (jwtSecret?.length === 0) {
      return Promise.reject(new Error("На сервере отсутствует jwt-секрет"));
    }

    if (!findedUser) {
      return Promise.reject(new Error(NOT_FOUNDED_USER));
    }

    const matched = await bcrypt.compare(password, findedUser.password);

    if (!matched) {
      return Promise.reject(new Error(NOT_FOUNDED_USER));
    }

    const accessToken = jwt.sign({ _id: findedUser._id }, jwtSecret!, {
      expiresIn: accessTokenExpire!,
    });

    const refreshToken = jwt.sign({ _id: findedUser._id }, jwtSecret!, {
      expiresIn: refreshTokenExpire!,
    });

    res.cookie("REFRESH_TOKEN", refreshToken, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.send({ accessToken });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: err });
  }
};

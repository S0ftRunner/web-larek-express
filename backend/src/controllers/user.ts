import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import ms from "ms";

import { RequestWithId, UserLoginBodyDto } from "../types";
import User from "../models/user";
import { NOT_FOUNDED_USER, SALT_SIZE } from "../utils/constants";
import { configs } from "../config";
import { generateTokens } from "../utils/generateTokens";
import { HttpStatuses } from "../errors/errorsStatuses";

export const register = async (req: Request, res: Response) => {
  try {
    const { refreshTokenExpiry } = configs.auth;
    const { email, name, password } = req.body;
    const hash = await bcrypt.hash(password, SALT_SIZE);
    const createdUser = await User.create({
      name,
      email,
      password: hash,
    });

    const { accessToken, refreshToken } = generateTokens(createdUser._id);

    createdUser.tokens.push(refreshToken);
    await createdUser.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: ms((refreshTokenExpiry || "7d") as ms.StringValue),
      path: "/",
    });

    res.send({
      user: {
        name: createdUser.name,
        email: createdUser.email,
      },
      accessToken,
    });
  } catch (err) {
    res
      .status(HttpStatuses.InternalServerError)
      .send({ message: `Ошибка при регистрации: ${err}` });
  }
};

export const login = async (
  req: Request<{}, {}, UserLoginBodyDto>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const { refreshTokenExpiry } = configs.auth;

    const findedUser = await User.findUserByCredentials(email, password);

    const { accessToken, refreshToken } = generateTokens(findedUser._id);
    findedUser.tokens.push(refreshToken);
    await findedUser.save();

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
    });
  } catch (err) {
    res.status(HttpStatuses.NotFoundError).send({ message: NOT_FOUNDED_USER });
  }
};

export const user = async (req: Request & RequestWithId, res: Response) => {
  const id = req.user?._id;
  const findedUser = await User.findById(id).select("+tokens");
  if (!findedUser) {
    return res
      .status(HttpStatuses.NotFoundError)
      .send({ message: "Пользователь не был найден" });
  }

  return res.send({
    user: {
      name: findedUser.name,
      email: findedUser.email,
    },
    succes: true,
  });
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res
      .status(HttpStatuses.InvalidTokenError)
      .send({ message: "Токен не найден!" });
  }

  // Удаляем рефреш токен
  const user = await User.updateOne(
    { tokens: refreshToken },
    {
      $pull: { tokens: refreshToken },
    }
  );

  if (user.matchedCount === 0) {
    return res
      .status(HttpStatuses.NotFoundError)
      .send({ message: "Пользователь не найден" });
  }

  res.clearCookie("refreshToken");

  return res.send({
    success: true,
  });
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshTokenExpiry } = configs.auth;
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res
      .status(HttpStatuses.InvalidTokenError)
      .send({ message: "Пожалуйста, выполните вход" });
  }

  const user = await User.findOne({ tokens: refreshToken }).select("+tokens");

  if (!user) {
    return res
      .status(HttpStatuses.NotFoundError)
      .send({ message: "Пользователь не найден!" });
  }

  const { accessToken, refreshToken: newRefreshToken } = generateTokens(
    user._id
  );

  user.tokens = user.tokens.filter((token) => token !== refreshToken);
  user.tokens.push(newRefreshToken);
  await user.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: ms((refreshTokenExpiry || "7d") as ms.StringValue),
    path: "/",
  });

  return res.send({
    user: {
      name: user.name,
      email: user.email,
    },
    success: true,
    accessToken,
  });
};

import { Request, Response } from "express";
import { UserRegisterBodyDto } from "types";
import bcrypt from "bcryptjs";
import { SALT_SIZE } from "../utils/constants";
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

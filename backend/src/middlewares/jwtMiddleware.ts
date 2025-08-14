import { NextFunction, Request, Response } from "express";

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  console.log(authorization);
  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).send({message: "Необходима авторизация"});
  }

}
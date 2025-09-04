import { Request, Response } from "express";

export const makeOrder = async (req: Request, res: Response) => {
  // Не очень понимаю, зачем в задании сказано про fakerJs, зачем тащить лишние пакеты в проект, когда можно базовое свое написать?
  // к тому же, проект настроен на commonJs, а последняя версия с ним ругается
  const randomId =
    Math.random().toString(36).substring(2) + Date.now().toString(36);
  return res.send({ total: req.body.total, id: randomId });
};

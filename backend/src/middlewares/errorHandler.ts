import { CelebrateError, isCelebrateError } from "celebrate";
import DuplicateError from "../errors/duplicate-error";
import { HttpStatuses } from "../errors/errorsStatuses";
import { ErrorRequestHandler } from "express";

const getCelebrateError = (err: CelebrateError) => {
  const errorDetails = err.details;
  for (const key of errorDetails.keys()) {
    const errorDetail = errorDetails.get(key);
    if (errorDetail && errorDetail.details && errorDetail.details.length > 0) {
      return errorDetail.details[0].message;
    }
  }

  return "Ошибка валидации данных";
};

const parseDuplicateErrors = (
  errorMessage: string
): { field: string; value: string } | null => {
  const match = errorMessage.match(/index (.+?) dup key: \{ (.+?): "(.+?)" \}/);
  if (match) {
    return { field: match[2], value: match[3] };
  }

  return null;
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const message = getCelebrateError(err);
    return res.status(HttpStatuses.IncorrectDataError).send({ message });
  }

  if (err instanceof DuplicateError) {
    const parsedError = parseDuplicateErrors(err.message);
    if (parsedError) {
      return res.status(HttpStatuses.DuplicateError).send({
        message: `Возник конфликт в поле ${parsedError.field} со значением ${parsedError.value}`,
      });
    } else {
      return res.status(HttpStatuses.DuplicateError).send({
        message: "Возник конфликт дублирования ключа",
      });
    }
  }
};

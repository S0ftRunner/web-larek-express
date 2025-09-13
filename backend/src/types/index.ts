import { JwtPayload } from "jsonwebtoken";

export interface IUser {
  email: string;
  name: string;
}

export type UserRegisterBodyDto = {
  password: string;
  tokens: Array<string>;
} & IUser;

export type UserLoginBodyDto = {
  email: string;
  password: string;
};

export type MiddleWareRequestBody = {
  user: {
    _id: string | JwtPayload;
  };
};

export type RequestWithId = {
  user?: { _id: string | JwtPayload };
};

export type TGeneratedTokens = {
  accessToken: string;
  refreshToken: string;
};

export enum Payment {
  Card = "card",
  Online = "online",
}

export type TImage = {
  fileName: string;
  originalName: string;
};

export type TCategory =
  | "софт-скил"
  | "хард-скил"
  | "другое"
  | "дополнительное"
  | "кнопка";

export enum FileTypes {
  "JPG" = 'image/jpeg',
  
}
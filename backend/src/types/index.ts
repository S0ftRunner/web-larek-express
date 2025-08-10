export interface IUser {
	email: string;
	name: string;
}

export type UserRegisterBodyDto = {
	password: string;
} & IUser;
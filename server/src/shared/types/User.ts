import { Types } from 'mongoose';

export interface IUser {
	firstName: string;
	lastName: string;
	password: string;
	email: string;
	isActivated: boolean;
	activationLink: string;
}

export interface IUserDto {
	id: Types.ObjectId;
	email: string;
	isActivated: boolean;
}

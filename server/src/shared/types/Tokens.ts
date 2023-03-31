import { Schema } from 'mongoose';

export interface ITokens {
	user: Schema.Types.ObjectId;
	refreshToken: string;
}

export type Tokens = {
	accessToken: string;
	refreshToken: string;
};

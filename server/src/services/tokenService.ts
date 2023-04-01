import jwt from 'jsonwebtoken';

import TokenModel from '../models/tokenModel';
import { Tokens } from '../shared/types/Tokens';
import { IUserDto } from '../shared/types/User';

const JWT_SECRET = process.env.JWT_SECRET as string;

const generateTokens = (payload: IUserDto): Tokens => {
	const accessToken = jwt.sign({ ...payload }, JWT_SECRET, {
		expiresIn: '30m',
	});
	const refreshToken = jwt.sign({ ...payload }, JWT_SECRET, {
		expiresIn: '30d',
	});

	return {
		accessToken,
		refreshToken,
	};
};

const saveTokens = async (userId: IUserDto['id'], refreshToken: string) => {
	const tokenData = await TokenModel.findOne({ userId });
	if (tokenData) {
		tokenData.refreshToken = refreshToken;
		return tokenData.save();
	}

	const token = await TokenModel.create({ userId, refreshToken });
	return token;
};

const removeToken = async (refreshToken: string) => {
	const tokenData = await TokenModel.deleteOne({ refreshToken });

	return tokenData;
};

const validateToken = (token: string) => {
	try {
		const jwtPayload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

		return jwtPayload;
	} catch (error) {
		return null;
	}
};

const findTokenInDB = async (refreshToken: string) => {
	const token = await TokenModel.findOne({ refreshToken });

	return token;
};

export {
	generateTokens,
	saveTokens,
	removeToken,
	validateToken,
	findTokenInDB,
};

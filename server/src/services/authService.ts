import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';

import UserDto from '../dtos/userDto';
import { CustomError } from '../middlewares/errorMiddleware';
import UserModel from '../models/userModel';
import { IUser } from '../shared/types/User';

import { sendActivationMail } from './mailService';
import * as tokenService from './tokenService';

const registration = async (reqBody: IUser) => {
	const { firstName, lastName, email, password } = reqBody;

	const existedUser = await UserModel.findOne({ email });
	if (existedUser) {
		throw CustomError.BadRequest('User already exists!');
	}

	const activationLink = uuidv4();
	const hashPassword = await argon2.hash(password);
	const dbUser = await UserModel.create({
		email,
		password: hashPassword,
		firstName,
		lastName,
		activationLink,
	});

	await sendActivationMail(
		email,
		`${process.env.API_URL}/auth/activate/${activationLink}`
	);

	const userDtoData = new UserDto(dbUser);
	const tokens = tokenService.generateTokens(userDtoData);
	await tokenService.saveTokens(userDtoData.id, tokens.refreshToken);

	return {
		...tokens,
		user: userDtoData,
	};
};

const login = async (email: string, password: string) => {
	const existedUser = await UserModel.findOne({ email });
	if (!existedUser) {
		throw CustomError.BadRequest('User with such an email does not exist!');
	}

	if (!existedUser.isActivated) {
		throw CustomError.BadRequest('User has not activated account yet!');
	}

	const isPassEqual: boolean = await argon2.verify(
		existedUser.password,
		password
	);
	if (!isPassEqual) {
		throw CustomError.BadRequest('Incorrect password!');
	}

	const userDtoData = new UserDto(existedUser);
	const tokens = tokenService.generateTokens(userDtoData);
	await tokenService.saveTokens(userDtoData.id, tokens.refreshToken);

	return {
		...tokens,
		user: userDtoData,
	};
};

const logout = async (refreshToken: string) => {
	const tokenData = await tokenService.removeToken(refreshToken);

	return tokenData;
};

const refresh = async (refreshToken: string) => {
	if (!refreshToken) {
		throw CustomError.UnauthorizedError();
	}

	const userData = tokenService.validateToken(refreshToken);
	const tokenFromDB = await tokenService.findTokenInDB(refreshToken);
	if (!userData || !tokenFromDB) {
		throw CustomError.UnauthorizedError();
	}

	const user = await UserModel.findById(userData.id);
	if (!user) {
		throw CustomError.UnauthorizedError();
	}

	const userDto = new UserDto(user);
	const tokens = tokenService.generateTokens({ ...userDto });
	await tokenService.saveTokens(userDto.id, tokens.refreshToken);

	return {
		...tokens,
		user: userDto,
	};
};

const activate = async (activationLink: string) => {
	const user = await UserModel.findOne({ activationLink });
	if (!user) {
		throw CustomError.BadRequest('Not valid activation link!');
	}

	user.isActivated = true;
	await user.save();
};

export { registration, login, logout, refresh, activate };

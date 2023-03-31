import { NextFunction, Request, Response } from 'express';

import * as authService from '../services/authService';
import { Tokens } from '../shared/types/Tokens';
import { IUser } from '../shared/types/User';
import { validateRequest } from '../validation';

// const CLIENT_URL = process.env.CLIENT_URL;

const registration = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const validationError = validateRequest(req);
		if (validationError) {
			return next(validationError);
		}
		const data = await authService.registration(req.body);

		res.cookie('refreshToken', data.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		res.send(data);
	} catch (error) {
		next(error);
	}
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const validationError = validateRequest(req);
		if (validationError) {
			return next(validationError);
		}

		const { email, password } = req.body as Pick<IUser, 'email' | 'password'>;
		const data = await authService.login(email, password);

		res.cookie('refreshToken', data.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		return res.send(data);
	} catch (error) {
		next(error);
	}
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { refreshToken } = req.cookies as Pick<Tokens, 'refreshToken'>;
		const data = await authService.logout(refreshToken);

		res.clearCookie('refreshToken');

		res.send(data);
	} catch (error) {
		next(error);
	}
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { refreshToken } = req.cookies as Pick<Tokens, 'refreshToken'>;
		const data = await authService.refresh(refreshToken);

		res.cookie('refreshToken', data.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		res.send(data);
	} catch (error) {
		next(error);
	}
};

const activate = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const activationLink = req.params.link;
		await authService.activate(activationLink);

		return res.redirect('https://www.hltv.org/matches');
	} catch (error) {
		next(error);
	}
};

export { registration, login, logout, refresh, activate };

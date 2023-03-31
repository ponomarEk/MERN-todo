import { NextFunction, Request, Response } from 'express';

import * as tokenService from '../services/tokenService';

import { CustomError } from './errorMiddleware';

export const authHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			return next(CustomError.UnauthorizedError());
		}

		const accessToken = authorizationHeader.split(' ')[1];
		if (!accessToken) {
			return next(CustomError.UnauthorizedError());
		}

		const userData = tokenService.validateToken(accessToken);
		if (!userData) {
			return next(CustomError.UnauthorizedError());
		}

		next();
	} catch (error) {
		return next(CustomError.UnauthorizedError());
	}
};

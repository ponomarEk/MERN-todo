import { Request } from 'express';
import { body, validationResult } from 'express-validator';

import { CustomError } from '../middlewares/errorMiddleware';

export const validateRequest = (req: Request) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return CustomError.BadRequest('Validation error!', errors.array());
	}
	return null;
};

// POST /v1/auth/login
export const login = [
	body('email').isEmail().trim().toLowerCase().notEmpty(),
	body('password').isString().notEmpty(),
];

// POST /v1/auth/registration
export const registration = [
	body('email').isEmail().trim().toLowerCase().notEmpty(),
	body('password').isString().isLength({ min: 8, max: 32 }),
	body('firstName').isString().trim().notEmpty(),
	body('lastName').isString().trim().notEmpty(),
];

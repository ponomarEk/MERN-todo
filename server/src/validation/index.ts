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

// POST /api/auth/login
export const login = [
	body('email').isEmail().trim().toLowerCase().notEmpty(),
	body('password').isString().notEmpty(),
];

// POST /api/auth/registration
export const registration = [
	body('email').isEmail().trim().toLowerCase().notEmpty(),
	body('password').isString().isLength({ min: 8, max: 32 }),
	body('firstName').isString().trim().notEmpty(),
	body('lastName').isString().trim().notEmpty(),
];

// POST /api/todos/
export const addTodo = [body('description').notEmpty()];

import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'express-validator'

export class CustomError extends Error {
	status;
	errors;
	constructor(status: number, message: string, errors: ValidationError[] = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static UnauthorizedError() {
		return new CustomError(401, 'User is unauthorized!');
	}

	static BadRequest(message: string, errors: ValidationError[] = []) {
		return new CustomError(400, message, errors);
	}
}

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof CustomError) {
		return res
			.status(err.status)
			.json({ message: err.message, errors: err.errors });
	}
	return res.status(500).json({ message: 'Unhandled error!' });
};

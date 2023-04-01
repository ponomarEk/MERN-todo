import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../middlewares/errorMiddleware';
import * as todoService from '../services/todoService';
import { ITodo } from '../shared/types/Todo';
import { validateRequest } from '../validation';

const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = req.query.userId as string;
		if (!userId) {
			return next(CustomError.UnauthorizedError());
		}
		const todosData = await todoService.getAllTodos(userId);

		res.json(todosData);
	} catch (error) {
		next(error);
	}
};

const addTodo = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const validationError = validateRequest(req);
		if (validationError) {
			return next(validationError);
		}

		const { description, userId } = req.body as Omit<ITodo, 'isCompleted'>;
		const todoData = await todoService.addTodo(description, userId);

		res.json(todoData);
	} catch (error) {
		next(error);
	}
};

const removeTodo = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const todoData = await todoService.removeTodo(id);

		res.json(todoData);
	} catch (error) {
		next(error);
	}
};

export { getAllTodos, addTodo, removeTodo };

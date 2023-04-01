import TodoDto from '../dtos/todoDto';
import { CustomError } from '../middlewares/errorMiddleware';
import TodoModel from '../models/todoModel';

const getAllTodos = async (userId: string) => {
	const todosData = await TodoModel.find({ userId });
	const todosDtoData = todosData.map(todo => new TodoDto(todo));

	return todosDtoData;
};

const addTodo = async (description: string, userId: string) => {
	const todoData = await TodoModel.create({ description, userId });
	const todoDtoData = new TodoDto(todoData);

	return todoDtoData;
};

const removeTodo = async (id: string) => {
	const todoData = await TodoModel.findByIdAndRemove(id);
	if (!todoData) {
		throw CustomError.BadRequest('This todo does not exist in DB!');
	}
	const todoDtoData = new TodoDto(todoData);

	return todoDtoData;
};

export { getAllTodos, addTodo, removeTodo };

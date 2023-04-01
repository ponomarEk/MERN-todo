import { HydratedDocument, Types } from 'mongoose';

import { ITodo } from '../shared/types/Todo';

class TodoDto {
	id: Types.ObjectId;
	description: string;
	isCompleted?: boolean;

	constructor(todoModel: HydratedDocument<ITodo>) {
		this.id = todoModel._id;
		this.description = todoModel.description;
		this.isCompleted = todoModel.isCompleted;
	}
}

export default TodoDto;

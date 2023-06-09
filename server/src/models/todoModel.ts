import { model, Schema } from 'mongoose';

import { ITodo } from '../shared/types/Todo';

const TodoSchema = new Schema<ITodo>(
	{
		userId: {
			type: String,
			required: true,
			index: true,
		},
		description: { type: String, required: true },
		isCompleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const TodoModel = model<ITodo>('Todo', TodoSchema);
export default TodoModel;

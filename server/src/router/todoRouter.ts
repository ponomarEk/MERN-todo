import { Router } from 'express';

import * as todoController from '../controllers/todoController';
import * as validator from '../validation';

const router = Router();

router.get('/', todoController.getAllTodos);
router.post('/', ...validator.addTodo, todoController.addTodo);
router.delete('/:id', todoController.removeTodo);

export default router;

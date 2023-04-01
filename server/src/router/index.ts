import { Router } from 'express';

import authRouter from './authRouter';
import todoRouter from './todoRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/todos', todoRouter);

export default router;

import { Router } from 'express';

import * as authController from '../controllers/authController';
import * as validator from '../validation';

const router = Router();

router.post(
	'/registration',
	...validator.registration,
	authController.registration
);
router.post('/login', ...validator.login, authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);
router.get('/activate/:link', authController.activate);

export default router;

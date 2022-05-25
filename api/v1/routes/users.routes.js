import { Router } from 'express';

// Import controllers
import {
	register,
	authenticate,
	confirm,
	forgotPassword,
	resetPassword,
	profile,
} from '../controllers/users.controller.js';

// Import validations
import {
	validateUserExistForRegister,
	validateUserExistForLogin,
	validateUserExistForgotPassword,
	validateUserConfirmed,
	validateToken,
} from '../validations/users.validations.js';

// Import middlewares
import checkAuth from '../middlewares/checkAuth.js';

// Create router
const router = Router();

router.post('/', validateUserExistForRegister, register);

router.post(
	'/login',
	validateUserExistForLogin,
	validateUserConfirmed,
	authenticate
);

router.get('/confirm-account/:token', validateToken, confirm);

router.post(
	'/forgot-password',
	validateUserExistForgotPassword,
	forgotPassword
);

router.get('/forgot-password/:token', validateToken, (req, res) => {
	res.status(200).json({ msg: 'Token valido' });
});

router.post('/forgot-password/:token', validateToken, resetPassword);

router.get('/profile', checkAuth, profile);

export default router;

import Users from '../models/Users.js';
import generaID from '../helpers/generaID.js';
import generaJWT from '../helpers/generaJWT.js';

import {
	sendEmailForgotPassword,
	sendEmailRegister,
} from '../helpers/email.js';

const register = async (req, res) => {
	try {
		const user = new Users(req.body);
		user.token = generaID();
		await user.save();
		const { email, username, token } = user;
		sendEmailRegister({
			email,
			username,
			token,
		});
		res.json({
			msg: 'Te has registrado correctamente. Por favor, revisa tu correo electrónico para confirmar tu cuenta.',
		});
	} catch (error) {
		console.log(error);
	}
};

const authenticate = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await Users.findOne({ email });
		if (await user.isValidPassword(password)) {
			res.json({
				_id: user._id,
				username: user.username,
				email: user.email,
				token: generaJWT(user._id),
			});
		} else {
			const error = new Error(
				'El correo o la contraseña son incorrectos. Verifica la información y vuelve a intentarlo.'
			);
			res.status(403).json({ msg: error.message });
		}
	} catch (error) {
		console.log(error);
	}
};

const confirm = async (req, res) => {
	try {
		const { token } = req.params;
		const user = await Users.findOne({ token });
		user.confirmed = true;
		user.token = '';
		await user.save();
		res.json({
			msg: 'Tu cuenta ha sido confirmada correctamente. Ya puedes iniciar sesión.',
		});
	} catch (error) {
		console.log(error);
	}
};

const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await Users.findOne({ email });
		user.token = generaID();
		await user.save();

		sendEmailForgotPassword({
			email: user.email,
			username: user.username,
			token: user.token,
		});

		res.json({
			msg: 'Te hemos enviado un correo electrónico con las instrucciones para recuperar tu contraseña. Si no lo encuentras en tu bandeja de entrada, revisa la carpeta de spam.',
		});
	} catch (error) {
		console.log(error);
	}
};

const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;
		const user = await Users.findOne({ token });
		user.password = password;
		user.token = '';
		await user.save();
		res.json({
			msg: 'Tu contraseña ha sido cambiada correctamente. Ya puedes iniciar sesión con tu nueva contraseña.',
		});
	} catch (error) {
		console.log(error);
	}
};

const profile = async (req, res) => {
	try {
		const { user } = req;
		res.json(user);
	} catch (error) {
		console.log(error);
	}
};

export {
	register,
	authenticate,
	confirm,
	forgotPassword,
	resetPassword,
	profile,
};

import Users from '../models/Users.js';

// Check if the user already exists for register
const validateUserExistForRegister = async (req, res, next) => {
	const { email } = req.body;
	const userExist = await Users.findOne({ email });
	if (userExist) {
		const error = new Error(
			'El correo electrónico ya está registrado. Intenta iniciar sesión, o recuperar tu contraseña.'
		);
		return res.status(400).json({ msg: error.message });
	}
	next();
};

// Check if the user already exists for login
const validateUserExistForLogin = async (req, res, next) => {
	const { email } = req.body;
	const userExist = await Users.findOne({ email });
	if (!userExist) {
		const error = new Error(
			'El correo electrónico no está registrado. Intenta registrarte para poder iniciar sesión.'
		);
		return res.status(404).json({ msg: error.message });
	}
	next();
};

// Check if the user already exists for forgot password
const validateUserExistForgotPassword = async (req, res, next) => {
	const { email } = req.body;
	const userExist = await Users.findOne({ email });
	if (!userExist) {
		const error = new Error(
			'El correo electrónico no está registrado. Intenta registrarte para poder recuperar tu contraseña.'
		);
		return res.status(404).json({ msg: error.message });
	}
	next();
};

// Check if the user is confirmed
const validateUserConfirmed = async (req, res, next) => {
	const { email } = req.body;
	const userExist = await Users.findOne({ email });
	if (!userExist.confirmed) {
		const error = new Error(
			'Tu cuenta no ha sido confirmada aún. Intenta confirmar tu cuenta, te enviamos un correo electrónico. Revisa tu bandeja de entrada o la carpeta de spam.'
		);
		return res.status(403).json({ msg: error.message });
	}
	next();
};

// Check if the token is valid
const validateToken = async (req, res, next) => {
	const { token } = req.params;
	const userExist = await Users.findOne({ token });
	if (!userExist) {
		const error = new Error(
			'El link es inválido. Revisa la información y utiliza el link que enviamos a tu correo.'
		);
		return res.status(404).json({ msg: error.message });
	}
	next();
};

// Check if the user exists with the email
const validateUserExists = async (req, res, next) => {
	const { email } = req.body;
	const userExist = await Users.findOne({ email });
	if (!userExist) {
		const error = new Error(
			'El usuario no existe o está registrado con otro correo electrónico..'
		);
		return res.status(404).json({ msg: error.message });
	}
	req.user = userExist;
	next();
};

// Export validations
export {
	validateUserExistForRegister,
	validateUserExistForLogin,
	validateUserExistForgotPassword,
	validateUserConfirmed,
	validateToken,
	validateUserExists,
};

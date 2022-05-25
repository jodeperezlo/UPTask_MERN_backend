import jwt from 'jsonwebtoken';
import Users from '../models/Users.js';
import config from '../../../config/config.js';

const checkAuth = async (req, res, next) => {
	let token = req.headers.authorization;
	if (!token) {
		return res
			.status(403)
			.json({ msg: 'No tienes autorización para realizar esta acción.' });
	}
	try {
		token = token.split(' ')[1];
		const { id } = jwt.verify(token, config.JWT_SECRET);
		if (!id) {
			return res
				.status(403)
				.json({ msg: 'No tienes autorización para realizar esta acción.' });
		} else if (id) {
			req.user = await Users.findById(id).select(
				'-password -token -confirmed -createdAt -updatedAt -__v'
			);
			return next();
		}
	} catch (error) {
		return res.status(404).json({
			msg: 'Hubo un error con la autenticación, inicie sesión nuevamente.',
		});
	}
};

export default checkAuth;

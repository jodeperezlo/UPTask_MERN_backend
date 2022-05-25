import jwt from 'jsonwebtoken';
import config from '../../../config/config.js';

const generaJWT = (id) => {
	const token = jwt.sign({ id }, config.JWT_SECRET, {
		expiresIn: '30d',
	});
	return token;
};

export default generaJWT;

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

var myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

export default {
	DB_STRING_CONNECTION:
		process.env.DB_STRING_CONNECTION || 'mongodb://localhost:27017/uptask',
	API_PROTOCOLO: process.env.API_PROTOCOLO || 'http',
	API_HOST: process.env.API_HOST || 'localhost',
	API_PORT: process.env.API_PORT || 4000,
	API_PATH: process.env.API_PATH || '/api/v1',
	API_URL: process.env.API_URL || 'http://localhost:4000/api/v1',
	JWT_SECRET: process.env.JWT_SECRET || 'SecretKey',
	FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
	EMAIL_USER: process.env.EMAIL_USER || '',
	EMAIL_PASS: process.env.EMAIL_PASS || '',
	EMAIL_HOST: process.env.EMAIL_HOST || '',
	EMAIL_PORT: process.env.EMAIL_PORT || '',
};

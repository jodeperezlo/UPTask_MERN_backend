import mongoose from 'mongoose';
import config from './config.js';

const conectaDB = async () => {
	try {
		const connection = await mongoose.connect(
			'mongodb+srv://SuperAdmin:admin@cluster0.u19en.mongodb.net/uptask?retryWrites=true&w=majority',
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		const url = `${connection.connection.host}:${connection.connection.port}/${connection.connection.name}`;
		console.log(`MongoDB is running on: ${url}`);
	} catch (error) {
		console.log(`Error connecting database: ${error.message}`);
		process.exit(1); // Termina el proceso por no poder conectarse a la base de datos
	}
};

export default conectaDB;

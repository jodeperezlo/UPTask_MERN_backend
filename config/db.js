import mongoose from 'mongoose';
import config from './config.js';

const conectaDB = async () => {
	try {
		const connection = await mongoose.connect(config.DB_STRING_CONNECTION, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const url = `${connection.connection.host}:${connection.connection.port}/${connection.connection.name}`;
		console.log(`MongoDB is running on: ${connection.connection.name}`);
	} catch (error) {
		console.log(`Error connecting database: ${error.message}`);
		process.exit(1); // Termina el proceso por no poder conectarse a la base de datos
	}
};

export default conectaDB;

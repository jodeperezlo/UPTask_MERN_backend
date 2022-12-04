import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

// Config for variables of environment and database connection
import config from './config/config.js';
import conectaDB from './config/db.js';

// Import Routes
import routerAPI from './api/v1/routes/index.js';

// Verify Email
import { verifyTransporterEmail } from './api/v1/helpers/email.js';
verifyTransporterEmail();

// Create Express App
const app = express();

// Connect to Database
conectaDB();

// Settings
app.set('port', config.PORT || 4000);

// Configure CORS
const whiteList = [config.FRONTEND_URL];
const corsOptions = {
	origin: (origin, callback) => {
		if (whiteList.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Acceso no permitido por CORS'));
		}
	},
	credentials: true,
};
app.use(cors(corsOptions));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());

// Routing
app.get('/', (req, res) => {
	res.end(`Access to URL: ${config.API_PATH}`);
});

app.get(`${config.API_PATH}`, (req, res) => {
	res.send(
		`<h1>Bienvenido</h1> <p>Access to: <b>${config.API_PATH}/api-docs</b> for more information.</p>`
	);
});

// Routes
routerAPI(app);

// Export App
export default app;

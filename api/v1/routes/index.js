import { Router } from 'express';

// Config para variables de entorno
import config from '../../../config/config.js';

// Import Routes
import usersRoutes from './users.routes.js';
import projectsRoutes from './projects.routes.js';
import tasksRoutes from './tasks.routes.js';

const routerAPI = (app) => {
	const router = Router();

	const api = config.API_PATH;

	app.use(api, router);

	// Routes
	router.use('/users', usersRoutes);
	router.use('/projects', projectsRoutes);
	router.use('/tasks', tasksRoutes);

	// Return Router
	return router;
};

export default routerAPI;

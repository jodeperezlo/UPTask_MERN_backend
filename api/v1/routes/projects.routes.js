import { Router } from 'express';

// Import controllers
import {
	getAllProjects,
	newProject,
	getProject,
	updateProject,
	deleteProject,
	searchCollaborator,
	addCollaborator,
	removeCollaborator,
} from '../controllers/projects.controller.js';

// Import validations
import { validateObjectID } from '../validations/index.js';
import {
	projectExists,
	isCreator,
	userIsCreator,
	collaboratorIsInProject,
	isCreatorOrCollaborator,
} from '../validations/projects.validations.js';

// Import middlewares
import checkAuth from '../middlewares/checkAuth.js';
import { validateUserExists } from '../validations/users.validations.js';

// Create router
const router = Router();

router.route('/').get(checkAuth, getAllProjects).post(checkAuth, newProject);

router
	.route('/:id')
	.get(
		checkAuth,
		validateObjectID,
		projectExists,
		isCreatorOrCollaborator,
		getProject
	)
	.put(checkAuth, validateObjectID, projectExists, isCreator, updateProject)
	.delete(checkAuth, validateObjectID, projectExists, isCreator, deleteProject);

router.post('/collaborators', checkAuth, searchCollaborator);

router.post(
	'/collaborators/:id',
	checkAuth,
	projectExists,
	isCreator,
	validateUserExists,
	userIsCreator,
	collaboratorIsInProject,
	addCollaborator
);

router.post(
	'/collaborators-remove/:id',
	checkAuth,
	projectExists,
	isCreator,
	removeCollaborator
);

export default router;

import { Router } from 'express';

// Import controllers
import {
	addTask,
	getTask,
	updateTask,
	deleteTask,
	changeStatus,
} from '../controllers/tasks.controller.js';

// Import validations
import { validateObjectID } from '../validations/index.js';
import {
	projectExistForTask,
	validateUserCreator,
	validateTaskExist,
	validateAccessToTask,
	taskIsCreatorOrCollaborator,
} from '../validations/tasks.validations.js';

// Import middlewares
import checkAuth from '../middlewares/checkAuth.js';

// Create router
const router = Router();

router.post('/', checkAuth, projectExistForTask, validateUserCreator, addTask);

router
	.route('/:id')
	.get(
		checkAuth,
		validateObjectID,
		validateTaskExist,
		validateAccessToTask,
		getTask
	)
	.put(
		checkAuth,
		validateObjectID,
		validateTaskExist,
		validateAccessToTask,
		updateTask
	)
	.delete(
		checkAuth,
		validateObjectID,
		validateTaskExist,
		validateAccessToTask,
		deleteTask
	);

router.post(
	'/status/:id',
	checkAuth,
	validateObjectID,
	validateTaskExist,
	taskIsCreatorOrCollaborator,
	changeStatus
);

export default router;

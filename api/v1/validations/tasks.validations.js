import Tasks from '../models/Tasks.js';
import Projects from '../models/Projects.js';

const validateObjectIDReq = (objectID) => {
	if (!objectID.match(/^[0-9a-fA-F]{24}$/)) {
		return false;
	}
	return true;
};

const projectExistForTask = async (req, res, next) => {
	const { project } = req.body;
	const validID = validateObjectIDReq(project);
	if (!validID) {
		const error = new Error('El ID del proyecto no es válido.');
		return res.status(400).json({ msg: error.message });
	}
	const projectExist = await Projects.findById(project);
	if (!projectExist) {
		const error = new Error(
			'El proyecto no existe. Verifica la información y vuelve a intentarlo.'
		);
		return res.status(404).json({ msg: error.message });
	}
	req.project = projectExist;
	next();
};

const validateUserCreator = async (req, res, next) => {
	const { user, project } = req;
	if (user._id.toString() !== project.creator.toString()) {
		const error = new Error(
			'El usuario no es el creador del proyecto. No puedes crear tareas.'
		);
		return res.status(403).json({ msg: error.message });
	}
	next();
};

const validateTaskExist = async (req, res, next) => {
	const { id } = req.params;
	const taskFound = await Tasks.findById(id).populate('project');
	if (!taskFound) {
		const error = new Error('La tarea no existe.');
		return res.status(404).json({ msg: error.message });
	}
	req.task = taskFound;
	next();
};

const validateAccessToTask = async (req, res, next) => {
	const { user, task } = req;
	if (user._id.toString() !== task.project.creator.toString()) {
		const error = new Error(
			'Acceso denegado. El usuario no tiene permitido ver las tareas.'
		);
		return res.status(403).json({ msg: error.message });
	}
	next();
};

const taskIsCreatorOrCollaborator = async (req, res, next) => {
	const { user, task } = req;
	if (
		user._id.toString() !== task.project.creator.toString() &&
		!task.project.collaborators.some(
			(collaborator) => collaborator._id.toString() === req.user._id.toString()
		)
	) {
		const error = new Error(
			'Acceso denegado. El usuario no tiene permitida esta acción.'
		);
		return res.status(403).json({ msg: error.message });
	}
	next();
};

export {
	projectExistForTask,
	validateUserCreator,
	validateTaskExist,
	validateAccessToTask,
	taskIsCreatorOrCollaborator,
};

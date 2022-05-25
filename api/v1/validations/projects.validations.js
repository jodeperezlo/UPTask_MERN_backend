import Projects from '../models/Projects.js';

const projectExists = async (req, res, next) => {
	try {
		const { id } = req.params;
		const project = await Projects.findById(id)
			.populate({
				path: 'tasks',
				populate: { path: 'completedBy', select: 'username' },
			})
			.populate('collaborators', 'username email');
		if (!project) {
			const error = new Error('El proyecto no existe.');
			return res.status(404).json({ msg: error.message });
		}
		req.project = { project };
		next();
	} catch (error) {
		console.log(error);
	}
};

const isCreator = async (req, res, next) => {
	try {
		const { project } = req;
		const projectFound = project.project;

		if (projectFound.creator.toString() !== req.user._id.toString()) {
			const error = new Error('No tienes permisos para realizar esta acción.');
			return res.status(401).json({ msg: error.message });
		}
		return next();
	} catch (error) {
		console.log(error);
	}
};

const isCreatorOrCollaborator = async (req, res, next) => {
	try {
		const { project } = req;
		const projectFound = project.project;

		if (
			projectFound.creator.toString() !== req.user._id.toString() &&
			!projectFound.collaborators.some(
				(collaborator) =>
					collaborator._id.toString() === req.user._id.toString()
			)
		) {
			const error = new Error('No tienes permisos para realizar esta acción.');
			return res.status(401).json({ msg: error.message });
		}
		return next();
	} catch (error) {
		console.log(error);
	}
};

const userIsCreator = async (req, res, next) => {
	try {
		const { project } = req;
		const projectFound = project.project;
		if (projectFound.creator.toString() === req.user._id.toString()) {
			const error = new Error(
				'El creador del proyecto no puede ser agregado como colaborador.'
			);
			return res.status(405).json({ msg: error.message });
		}
		next();
	} catch (error) {
		console.log(error);
	}
};

const collaboratorIsInProject = async (req, res, next) => {
	try {
		const { project } = req;
		const projectFound = project.project;
		const { user } = req;
		let alreadyAdded = false;
		await projectFound.collaborators.forEach((collaborator) => {
			if (collaborator._id.toString() === user._id.toString()) {
				alreadyAdded = true;
			}
		});
		if (alreadyAdded) {
			const error = new Error(
				'El usuario ya es colaborador en el proyecto y no se puede volver a agregar.'
			);
			return res.status(405).json({ msg: error.message });
		}
		next();
	} catch (error) {
		console.log(error);
	}
};

// Export functions
export {
	projectExists,
	isCreator,
	isCreatorOrCollaborator,
	userIsCreator,
	collaboratorIsInProject,
};

import Projects from '../models/Projects.js';
import Users from '../models/Users.js';

const getAllProjects = async (req, res) => {
	try {
		const projects = await Projects.find({
			$or: [
				{ collaborators: { $in: req.user._id } },
				{ creator: { $in: req.user._id } },
			],
		}).select('-tasks');
		res.status(200).json(projects);
	} catch (error) {
		console.log(error);
	}
};

const newProject = async (req, res) => {
	try {
		const project = new Projects(req.body);
		project.creator = req.user._id;
		const projectSaved = await project.save();
		res.status(201).json(projectSaved);
	} catch (error) {
		console.log(error);
	}
};

const getProject = async (req, res) => {
	try {
		const { project } = req;
		res.status(200).json(project.project);
	} catch (error) {
		console.log(error);
	}
};

const updateProject = async (req, res) => {
	try {
		const { project } = req;
		const projectFound = project.project;
		const { projectname, description, customer, dateToBeCompleted } = req.body;
		projectFound.projectname = projectname || projectFound.projectname;
		projectFound.description = description || projectFound.description;
		projectFound.customer = customer || projectFound.customer;
		projectFound.dateToBeCompleted =
			dateToBeCompleted || projectFound.dateToBeCompleted;

		const projectUpdated = await Projects.findOneAndUpdate(
			{ _id: projectFound._id },
			projectFound,
			{
				new: true,
			}
		);
		res.status(200).json(projectUpdated);
	} catch (error) {
		console.log(error);
	}
};

const deleteProject = async (req, res) => {
	try {
		const { project } = req;
		const projectDeleted = await Projects.findOneAndDelete({
			_id: project.project._id,
		});
		res
			.status(200)
			.json({ msg: 'Proyecto eliminado correctamente.', projectDeleted });
	} catch (error) {
		console.log(error);
	}
};

const searchCollaborator = async (req, res) => {
	try {
		const { email } = req.body;
		const collaboratorFound = await Users.findOne({ email }).select(
			'_id email username'
		);
		if (!collaboratorFound) {
			const error = new Error('El usuario que buscas no está registrado.');
			return res.status(404).json({ msg: error.message });
		}
		res.status(200).json(collaboratorFound);
	} catch (error) {
		console.log(error);
	}
};

const addCollaborator = async (req, res) => {
	const { project } = req.project;
	const { user } = req;
	project.collaborators.push(user._id);
	await project.save();
	res.status(200).json({
		msg: 'El colaborador ha sido agregado al proyecto correctamente.',
		collaborator: user._id,
	});
};

const removeCollaborator = async (req, res) => {
	const { project } = req.project;
	const { id } = req.body;
	project.collaborators.pull(id);
	await project.save();
	res.status(200).json({
		msg: 'El colaborador ha sido removido del proyecto correctamente.',
		collaborator: id,
	});
};

export {
	getAllProjects,
	newProject,
	getProject,
	updateProject,
	deleteProject,
	searchCollaborator,
	addCollaborator,
	removeCollaborator,
};

import Projects from '../models/Projects.js';
import Tasks from '../models/Tasks.js';

const addTask = async (req, res) => {
	try {
		const project = req.project;
		const taskSaved = await Tasks.create(req.body);
		project.tasks.push(taskSaved._id);
		await project.save();
		res.status(201).json({
			msg: 'Tarea creada con éxito',
			task: taskSaved,
		});
	} catch (error) {
		console.log(error);
	}
};

const getTask = async (req, res) => {
	try {
		const { task } = req;
		res.status(200).json({
			task,
		});
	} catch (error) {
		console.log(error);
	}
};

const updateTask = async (req, res) => {
	const { task } = req;
	task.taskname = req.body.taskname || task.taskname;
	task.description = req.body.description || task.description;
	task.status = req.body.status || task.status;
	task.priority = req.body.priority || task.priority;
	task.date = req.body.date || task.date;

	try {
		const taskUpdated = await task.save();
		res.status(200).json({
			msg: 'Tarea actualizada con éxito',
			task: taskUpdated,
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteTask = async (req, res) => {
	const { task } = req;
	try {
		const project = await Projects.findById(task.project);
		project.tasks.pull(task._id);
		await Promise.allSettled([await project.save(), await task.deleteOne()]);
		res.status(200).json({
			msg: 'Tarea eliminada con éxito',
		});
	} catch (error) {
		console.log(error);
	}
};

const changeStatus = async (req, res) => {
	const { task } = req;

	try {
		task.status = !task.status;
		task.completedBy = req.user._id;
		const taskUpdated = await task.save();
		const savedTask = await Tasks.findById(taskUpdated._id)
			.populate('project')
			.populate('completedBy');
		res.status(200).json({
			msg: 'Tarea actualizada con éxito',
			task: savedTask,
		});
	} catch (error) {
		console.log(error);
	}
};

export { addTask, getTask, updateTask, deleteTask, changeStatus };

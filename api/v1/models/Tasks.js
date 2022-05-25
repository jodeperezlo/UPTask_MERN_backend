import mongoose from 'mongoose';

const tasksSchema = new mongoose.Schema(
	{
		taskname: {
			type: String,
			trim: true,
			required: true,
		},
		description: {
			type: String,
			trim: true,
			required: true,
		},
		status: {
			type: Boolean,
			default: false,
		},
		date: {
			type: Date,
			required: true,
			default: Date.now,
		},
		priority: {
			type: String,
			enum: ['Baja', 'Media', 'Alta'],
			default: 'Baja',
		},
		project: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Projects',
			required: true,
		},
		completedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
		},
	},
	{
		timestamps: true,
	}
);

const Tasks = mongoose.model('Tasks', tasksSchema, 'Tasks');
export default Tasks;

import mongoose from 'mongoose';

const projectsSchema = new mongoose.Schema(
	{
		projectname: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		dateToBeCompleted: {
			type: Date,
			default: Date.now,
			trim: true,
		},
		customer: {
			type: String,
			required: true,
			trim: true,
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
		},
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Tasks',
			},
		],
		collaborators: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Users',
			},
		],
	},
	{
		timestamps: true,
	}
);

const Projects = mongoose.model('Projects', projectsSchema, 'Projects');
export default Projects;

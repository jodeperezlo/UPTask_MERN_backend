// Socket.io
import { Server } from 'socket.io';
import config from '../config/config.js';

export const socketIO = (server) => {
	const io = new Server(server, {
		pingTimeout: 60000,
		cors: {
			origin: config.FRONTEND_URL,
		},
	});

	io.on('connection', (socket) => {
		// ? Define los eventos
		socket.on('open project', (project) => {
			socket.join(project);
		});

		socket.on('new task', (task) => {
			const project = task.project;
			socket.to(project).emit('task added', task);
		});

		socket.on('delete task', (task) => {
			const project = task.project;
			socket.to(project).emit('task deleted', task);
		});

		socket.on('update task', (task) => {
			const project = task.project._id;
			socket.to(project).emit('task updated', task);
		});

		socket.on('change status task', (task) => {
			const project = task.project._id;
			socket.to(project).emit('status task changed', task);
		});
	});
};

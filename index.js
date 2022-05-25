import app from './app.js';
import config from './config/config.js';

const servidor = app.listen(app.get('port'));
console.log(app.get('INDEX port'));
// Socket.io
import { Server } from 'socket.io';
const io = new Server(servidor, {
	pingTimeout: 60000,
	cors: {
		origin: '*',
	},
});

io.on('connection', (socket) => {
	// console.log('Connected to socket.io');

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

console.log(`Server is running on: ${config.API_URL}`);

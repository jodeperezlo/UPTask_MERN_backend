import { socketIO } from './socket/socketIO.js';
import app from './app.js';
import config from './config/config.js';

const server = app.listen(app.get('port'));

socketIO(server);

console.log(`Server is running on: ${config.API_URL}`);

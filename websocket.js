import { WebSocketServer } from 'ws';
import utils from './utils.js';
const { server, emitter, alertLocations } = utils;

const configureWSS = () => {
	const wss = new WebSocketServer({server});

	const broadcastMessage = (msg, id) => {
		wss.clients.forEach( client => {
			client.send(JSON.stringify(msg));
		});
	};

	wss.on('connection', (socket) => {
		socket.send(JSON.stringify(alertLocations));


		socket.on('message', (msg) => {
			console.log('received from client: ' + msg);
			if (msg == '__ping__') socket.send('__pong__');
		})
		
		socket.on('close', () => console.log('Connecion closed.'));

		emitter.on('update', (arr) => {
			broadcastMessage(arr);
		});
	});
};

export default configureWSS;
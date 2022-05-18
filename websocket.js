import { Server } from 'ws';
import { server, emitter } from './utils.js';
const wss = new Server({server});

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

	emitter.on('update', (arr) => {
		broadcastMessage(arr);
	});
});

const express = require("express");
const PORT = process.env.PORT ?? 5000;
const app = express();
const server = require('http').createServer(app);
const ws = require('ws');
const wss = new ws.Server({server});
const events = require('events');
const emitter = new events.EventEmitter();

const alertLocations = [
	{
		dangerLevel: 'MEDIUM',
		title: 'Odessa',
		dateFrom: '2022-05-18T07:00:00.000Z',
		dateTo: '2022-05-18T07:30:00.000Z'
	}
]

wss.on('connection', (socket) => {

	socket.send(JSON.stringify(alertLocations));

	socket.on('message', (msg) => {
		console.log('received from client: ' + msg)
		if (msg == '__ping__') socket.send('__pong__');
    })

	emitter.on('alertUpdate', () => {
		broadcastMessage(alertLocations);
	});
	
})

const broadcastMessage = (msg, id) => {
    wss.clients.forEach( client => {
        client.send(JSON.stringify(msg));
    });
};

app.use(express.json());

app.get('/api/alertLocations', (req, res) => {
	res.json({alertLocations});
});

app.post('/api/enableAlert', (req, res)=>{
	try {
		alertLocations.push(req.body);
		res.json({index: alertLocations.length-1});
	} catch (e) { res.sendStatus(400) }
	console.log('enabled alert for '+ JSON.stringify(alertLocations[alertLocations.length-1]));
	emitter.emit('alertUpdate', alertLocations);
});

app.post('/api/disableAlert', (req, res)=>{
	try {
		const ind = parseInt(req.body.index);
		if (ind >= alertLocations.length) {res.json({message: "No such element"}); return}
		console.log('disabled alert for '+ JSON.stringify(alertLocations[ind]));
		alertLocations.splice(ind);
		res.sendStatus(200);		
	} catch (e) { res.sendStatus(400) };
	emitter.emit('alertUpdate', alertLocations);
});

app.get('*', (req, res) => {
	res.sendStatus(404);
});

server.listen(PORT, ()=> {
	console.log("server has started on port " + PORT);
});
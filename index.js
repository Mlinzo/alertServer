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
];

const sanctuaries = [
	{
		destination: 100,
		number: 50,
		address: 'просп. Маршала Жукова, 2'
	}
];


const broadcastMessage = (msg, id) => {
    wss.clients.forEach( client => {
        client.send(JSON.stringify(msg));
    });
};
wss.on('connection', (socket) => {
	socket.send(JSON.stringify(alertLocations));

	socket.on('message', (msg) => {
		console.log('received from client: ' + msg)
		if (msg == '__ping__') socket.send('__pong__');
    })

	emitter.on('update', (arr) => {
		broadcastMessage(arr);
	});
})

app.use(express.json());

const tryAddElement = (arr, req, res) => {
	try {
		arr.push(req.body);
		res.json({index: arr.length-1});
		return true;
	} catch (e) { res.sendStatus(400); return false };
};

const tryDeleteElement = (arr, req, res) => {
	try {
		const ind = parseInt(req.body.index);
		if (ind >= arr.length) {res.json({message: "No such element"}); return false}
		arr.splice(ind, ind+1);
		res.sendStatus(200);
		return true;	
	} catch (e) { res.sendStatus(400); return false };
};

app.get('/api/alertLocations', (req, res) => {
	res.json({alertLocations});
});
app.post('/api/enableAlert', (req, res)=>{
	const success = tryAddElement(alertLocations, req, res);
	if (!success) return;
	emitter.emit('update', alertLocations);
});
app.post('/api/disableAlert', (req, res)=>{
	const success = tryDeleteElement(alertLocations, req, res);
	if (!success) return;
	emitter.emit('update', alertLocations);
});

app.get('/api/sanctuaries', (req, res) => {
	res.json({sanctuaries});
});
app.post('/api/addSanctuary', (req, res)=>{
	const success = tryAddElement(sanctuaries, req, res);
	if (!success) return;
	emitter.emit('update', sanctuaries);
});
app.post('/api/removeSanctuary', (req, res)=>{
	const success = tryDeleteElement(sanctuaries, req, res);
	if (!success) return;
	emitter.emit('update', sanctuaries);
});

app.get('*', (req, res) => {
	res.sendStatus(404);
});

server.listen(PORT, ()=> {
	console.log("server has started on port " + PORT);
});
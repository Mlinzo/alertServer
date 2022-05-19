import { json } from 'express';
import utils from './utils.js';
import alertRouter from './routes/alert.routes.js';
import sanctuaryRouter from './routes/sanctuary.routes.js';
import otherRouter from './routes/other.routes.js';
import configureWSS from './websocket.js';

const { app, server } = utils;
const PORT = process.env.PORT ?? 5000;

configureWSS();

app.use(json());

app.use('/api', alertRouter);
app.use('/api', sanctuaryRouter);
app.use('/api', otherRouter);

server.listen(PORT, () => console.log("server has started on port " + PORT) );
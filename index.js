import Express, { json } from 'express';
import * as http from 'http';
import alertRouter from './routes/alert.routes.js';
import sanctuaryRouter from './routes/sanctuary.routes.js';
import otherRouter from './routes/other.routes.js';

const PORT = process.env.PORT ?? 5000;
const app = Express();
const server = http.createServer(app);

app.use(json());

app.use('/api', alertRouter);
app.use('/api', sanctuaryRouter);
app.use('/api', otherRouter);

server.listen(PORT, () => console.log("server has started on port " + PORT) );
require('dotenv').config();
const Express = require('express');
const {json} = require('express');
const http = require('http');
const alertRouter = require('./routes/alert.routes.js');
const sanctuaryRouter = require('./routes/sanctuary.routes.js');
const otherRouter = require('./routes/other.routes.js');
const clientRouter = require('./routes/client.routes.js');
const alertAPILoop = require('./alertApi/alertApiLoop.js');
const errorMiddleware = require('./middleware/error.middleware.js');

const PORT = process.env.PORT ?? 5000;
const app = Express();
const server = http.createServer(app);

app.use(json());

app.use('/api', alertRouter);
app.use('/api', sanctuaryRouter);
app.use('/api', clientRouter);
app.use(otherRouter);

app.use(errorMiddleware);

server.listen(PORT, () => console.log("server has started on port " + PORT) );

alertAPILoop(10 * 1000, () => console.log('Alert API loop has started'));
import Router from "express";
import clientController from '../controllers/client.controller.js';
import middleware from '../middleware/middleware.js';
const { login, clients, updateRegion, removeClient, updateOnline } = clientController;
const { authenticateClient } = middleware;

const clientRouter = Router();

clientRouter.post( '/login', login );
clientRouter.get( '/clients', clients);
clientRouter.post( '/updateRegion', authenticateClient, updateRegion);
clientRouter.post( '/removeClient', removeClient);
clientRouter.get( '/online', authenticateClient, updateOnline);

export default clientRouter;
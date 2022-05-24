import Router from "express";
import clientController from '../controllers/client.controller.js';
import middleware from '../middleware/middleware.js';
const { login, clients, updateRegion, removeClient } = clientController;
const { authenticateClient } = middleware;

const clientRouter = Router();

clientRouter.get( '/login', login );
clientRouter.get( '/clients', clients);
clientRouter.post( '/updateRegion', authenticateClient, updateRegion);
clientRouter.post( '/removeClient', removeClient);

export default clientRouter;
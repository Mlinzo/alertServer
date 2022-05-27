const {Router} = require("express");
const clientController = require('../controllers/client.controller.js');
const { authenticateClient } = require('../middleware/middleware.js');

const clientRouter = Router();

clientRouter.post( '/login', clientController.login );
clientRouter.get( '/clients', clientController.clients);
clientRouter.post( '/updateRegion', authenticateClient, clientController.updateRegion);
clientRouter.post( '/removeClient', clientController.removeClient);
clientRouter.get( '/online', authenticateClient, clientController.updateOnline);

module.exports = clientRouter;
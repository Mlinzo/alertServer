const {Router} = require("express");
const clientController = require('../controllers/client.controller.js');
const { verifyJWT, verifyRefreshJWT } = require('../middleware/jwt.middleware.js');

const clientRouter = Router();

clientRouter.post( '/login', clientController.login );
clientRouter.get( '/clients', clientController.clients);
clientRouter.post( '/updateRegion', verifyJWT, clientController.updateRegion);
clientRouter.post( '/removeClient', clientController.removeClient);
clientRouter.get( '/refresh', verifyRefreshJWT, clientController.refresh);

module.exports = clientRouter;
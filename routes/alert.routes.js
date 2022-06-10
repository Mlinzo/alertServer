const { Router } = require('express');
const alertController = require('../controllers/alert.controller.js');
const { verifyJWT } = require('../middleware/jwt.middleware.js');

const alertRouter = Router();

alertRouter.get( '/alertLocations', verifyJWT, alertController.getAlerts );

module.exports = alertRouter;
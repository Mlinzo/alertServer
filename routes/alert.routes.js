const { Router } = require('express');
const alertController = require('../controllers/alert.controller.js');

const alertRouter = Router();

alertRouter.get( '/alertLocations', alertController.getAlerts );

alertRouter.post( '/enableAlert', alertController.addAlert );
alertRouter.post( '/disableAlert', alertController.removeAlert );
alertRouter.post( '/changeAlert', alertController.changeAlert );

module.exports = alertRouter;
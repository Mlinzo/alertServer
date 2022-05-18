import Router from "express";
import alertController from '../controllers/alert.controller.js';
const { getAlerts, addAlert, removeAlert } = alertController;

const alertRouter = Router();

alertRouter.get( '/alertLocations', getAlerts);
alertRouter.post( '/enableAlert', addAlert );
alertRouter.post( '/disableAlert', removeAlert );

export default alertRouter;
import Router from "express";
import sanctuaryController from '../controllers/sanctuary.controller.js';
const { getSanctuaries, addSanctuary, removeSanctuary } = sanctuaryController;
const sanctuaryRouter = Router();

sanctuaryRouter.get( '/sanctuaries', getSanctuaries);
sanctuaryRouter.post( '/addSanctuary', addSanctuary );
sanctuaryRouter.post( '/removeSanctuary', removeSanctuary );

export default sanctuaryRouter;
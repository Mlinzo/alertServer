const {Router} = require("express");
const sanctuaryController = require('../controllers/sanctuary.controller.js');

const sanctuaryRouter = Router();

sanctuaryRouter.get( '/sanctuaries', sanctuaryController.getSanctuaries);
sanctuaryRouter.post( '/addSanctuary', sanctuaryController.addSanctuary );
sanctuaryRouter.post( '/removeSanctuary', sanctuaryController.removeSanctuary );

module.exports = sanctuaryRouter;
const {Router} = require("express");
const otherController = require('../controllers/other.controller.js');

const otherRouter = Router();

otherRouter.get('*', otherController.notFound);

module.exports = otherRouter;
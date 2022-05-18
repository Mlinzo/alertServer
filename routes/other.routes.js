import Router from "express";
import otherController from '../controllers/other.controller.js';
const { notFound } = otherController;

const otherRouter = Router();

otherRouter.get('*', notFound);

export default otherRouter;
import express from 'express';
import { serviceExist } from '../middlewares/serviceExist.js';
import { getServiceController } from '../controllers/operationServices/getServiceController.js';

// Creamos un router
export const serviceRouter = express.Router();

serviceRouter.get('/service/:serviceId', serviceExist, getServiceController);

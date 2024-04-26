import express from 'express';
import { customerExists } from '../../middlewares/customerExists.js';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { 
    getCustomerListController, 
    newCustomerController, 
    updateCustomerController 
} from '../../controllers/mainControllers.js';

// Creamos un router
export const customerRouter = express.Router();

// Agregar cliente
customerRouter.post('/customer/register', authenticateUser, newCustomerController);

// Obtener lista de clientes
customerRouter.get('/customer/list', authenticateUser, getCustomerListController);

// Modificar cliente
customerRouter.put('/customer/:customerId',authenticateUser, customerExists, updateCustomerController);
import {Router} from 'express';
import { createOrderController, getOrdersDetailsController, getMyOrdersController, totalSalesController, totalUsersController, updateOrderStatusController } from '../controllers/ordercontroller.js';
import auth from '../middleware/auth.js';

const orderRouter = Router();

orderRouter.post('/create', auth, createOrderController)
orderRouter.get("/order-list",auth, getOrdersDetailsController)
orderRouter.get("/my-orders",auth, getMyOrdersController)
orderRouter.put("/order-status/:id",auth, updateOrderStatusController)
orderRouter.get('/sales',auth, totalSalesController)
orderRouter.get('/users',auth,totalUsersController)


export default orderRouter;


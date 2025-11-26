import {Router} from "express";
import auth from "../middleware/auth.js";
import {  createOrderController,  getOrderDetailsController, updateOrderStatusController, getTotalOrdersCountController, totalSalesController,totalUsersController } from "../controllers/ordercontroller.js";

const orderRouter = Router();


orderRouter.post('/create', auth, createOrderController);
orderRouter.get('/order-list', auth, getOrderDetailsController);
orderRouter.put('/order-status/:id', auth, updateOrderStatusController );
orderRouter.get('/count', auth, getTotalOrdersCountController );
orderRouter.get('/sales', auth, totalSalesController );
orderRouter.get('/users', auth, totalUsersController );





export default orderRouter;
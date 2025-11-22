import {Router} from "express";
import auth from "../middleware/auth.js";
import {  createOrderController,  getOrderDetailsController } from "../controllers/ordercontroller.js";

const orderRouter = Router();


orderRouter.post('/create', auth, createOrderController);
orderRouter.get('/order-list', auth, getOrderDetailsController);



export default orderRouter;
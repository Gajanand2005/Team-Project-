import { Router } from 'express'
import { adminLoginController } from '../controllers/admincontroller.js';

const adminRouter = Router()

adminRouter.post('/auth/login', adminLoginController)

export default adminRouter;

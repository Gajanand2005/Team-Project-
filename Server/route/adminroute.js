import { Router } from 'express'
import { adminLoginController, adminForgotPasswordController, adminVerifyForgotPasswordOtp } from '../controllers/admincontroller.js';

const adminRouter = Router()

adminRouter.post('/auth/login', adminLoginController)

adminRouter.post('/auth/forgot-password', adminForgotPasswordController)

adminRouter.post('/auth/verify-forgot-password-otp', adminVerifyForgotPasswordOtp)

export default adminRouter;

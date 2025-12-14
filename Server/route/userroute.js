import { Router } from 'express'
import { addReview, authWithGoogle, forgotPasswordController, getAllUsers, getReviews, loginUserController, logoutController, refreshToken, registerUserController, removeImageFromCloudinary, resetPassword, updateUserDetails, userAvatarController, userDetails, verifyEmailController, verifyForgotPasswordOtp } from '../controllers/usercontroller.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
const userRouter = Router()

userRouter.post('/register', registerUserController)
userRouter.post('/verifyEmail', verifyEmailController)
userRouter.post('/login', loginUserController)
userRouter.post('/authWithGoogle',authWithGoogle)
userRouter.get('/logout', auth, logoutController);
userRouter.post('/user-avatar', auth, (req, res, next) => {
    upload.array('avatar')(req, res, function(err) {
        if (err) {
            return res.status(400).json({
                message: err.message || 'File upload error',
                error: true,
                success: false
            });
        }
        next();
    });
}, userAvatarController);
userRouter.delete('/deleteImage', auth, removeImageFromCloudinary);
userRouter.put('/:id', auth, updateUserDetails);
userRouter.post('/forgot-password', forgotPasswordController);
userRouter.post('/verify-forgot-password-otp', verifyForgotPasswordOtp)
userRouter.post('/reset-password', resetPassword)
userRouter.post('/refresh-token', refreshToken)
userRouter.get('/user-details', auth, userDetails);
userRouter.post('/addReview', auth, addReview);
userRouter.get('/getReviews', getReviews);
userRouter.get('/getAllUsers', auth, getAllUsers);
export default userRouter;
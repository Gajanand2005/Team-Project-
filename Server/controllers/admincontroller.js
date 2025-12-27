import bcrypt from "bcrypt";
import UserModel from './../models/usermodel.js';
import generatedAccessToken from "../utils/generatedAcessToken.js";
import generatedRefreshToken from "../utils/generatedRefresToken.js";
import sendEmailFun from "../config/sendEmail.js";
import VerificationEmail from "../utils/verifyEmailTemplate.js";

// admin login controller
export async function adminLoginController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "provide email and password",
                error: true,
                success: false,
            });
        }

        const user = await UserModel.findOne({ email: new RegExp('^' + email.toLowerCase() + '$', 'i') })

        if (!user) {
            console.log(`Admin login attempt failed: User not found for email ${email}`);
            return res.status(400).json({
                message: "User not registered",
                error: true,
                success: false
            })
        }


        if (user.signUpWithGoogle) {
            console.log(`Admin login attempt failed: User signed up with Google, cannot login with password for ${email}`);
            return res.status(400).json({
                message: "Please login with Google",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            console.log(`Admin login attempt failed: Incorrect password for user ${email}`);
            return res.status(400).json({
                message: "Incorrect password",
                error: true,
                success: false
            })
        }

        const accessToken = await generatedAccessToken(user._id);
        const refreshToken = await generatedRefreshToken(user._id);

        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            last_login_date: new Date()
        })

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        res.cookie('adminAccessToken', accessToken, cookiesOption);
        res.cookie('adminRefreshToken', refreshToken, cookiesOption);

        return res.json({
            message: "Admin login successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    mobile: user.mobile,
                    role: user.role
                }
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// admin verify forgot password otp controller
export async function adminVerifyForgotPasswordOtp(req, res) {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Provide required fields: email, otp.",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email: new RegExp('^' + email.toLowerCase() + '$', 'i') });

        if (!user) {
            return res.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            });
        }

        if (otp !== user.otp) {
            return res.status(400).json({
                message: "Invalid OTP",
                error: true,
                success: false
            });
        }

        const currentTime = new Date();
        if (user.otpExpires < currentTime) {
            return res.status(400).json({
                message: "OTP is expired",
                error: true,
                success: false
            });
        }

        // Reset OTP fields after successful verification
        user.otp = "";
        user.otpExpires = "";
        user.forgotPasswordVerified = true;

        await user.save();

        return res.status(200).json({
            message: "Verify OTP successfully",
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// admin forgot password controller
export async function adminForgotPasswordController(req, res) {
    try {
        const { email } = req.body
        const user = await UserModel.findOne({ email: new RegExp('^' + email.toLowerCase() + '$', 'i') })
        if (!user) {
            return res.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }
        let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = verifyCode;
        user.otpExpires = Date.now() + 600000;
        await user.save();

        await sendEmailFun({
            sendTo: email,
            subject: "Verify OTP from SmalCouture ",
            text: "",
            html: VerificationEmail(user.name, verifyCode)
        })

        return res.json({
            message: "Otp sent to your email",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

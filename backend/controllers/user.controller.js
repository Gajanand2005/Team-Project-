import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sendEmailFun from '../config/sendEmail.js';
import VerificationEmail from '../utils/verifyEmailTemplate.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';
import { json, response } from 'express';

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


cloudinary.config({
    cloud_name: process.env.cloudinary_Config_cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true,
});

export async function registerUserController(request, response) {
    try {
        let user;

        const { name, email, password } = request.body;
        if (!name || !email || !password) {
            return response.status(400).json({
                message: "provide email, name, password",
                error: true,
                success: false
            })
        }

        user = await UserModel.findOne({ email: email });

        if (user) {
            return response.json({
                message: "User already registered with this email!",
                error: true,
                success: false
            })
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        user = new UserModel({
            email: email,
            password: hashPassword,
            name: name,
            otp: verifyCode,
            otpExpires: Date.now() + 600000
        });

        await user.save();

        //send verification email
        const verifyEmail = await sendEmailFun({
            sendTo: email,
            subject: "Verify email from Ecommerce App",
            text: "",
            html: VerificationEmail(name, verifyCode)
        })

        //Create a JWT token for verification purposes
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JSON_WEB_TOKEN_SECRET_KEY
        );

        return response.status(200).json({
            success: true,
            error: false,
            message: "User Registered successfully! Please verify your email.",
            token: token, // Optional: include this if needed for verification.s
        });



    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function verifyEmailController(request, response) {
    try {
        const { email, otp } = request.body;

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return response.status(400).json({ error: true, success: false, message: "User not found" });
        }

        const isCodeValid = user.otp === otp;
        const isNotExpired = user.otpExpires > Date.now();

        if (isCodeValid && isNotExpired) {
            user.verify_email = true;
            user.otp = null;
            user.otpExpires = null;
            await user.save();
            return response.status(200).json({ error: false, success: true, message: "Email verified successfully" });
        } else if (!isCodeValid) {
            return response.status(400), json({ error: true, success: false, message: "Invalid OTP" });
        } else {
            return response.status(400).json({ error: true, success: false, message: "OTP Expired" });
        }


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: true
        })
    }
}

export async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email: email })

        if (!user) {
            return res.status(400).json({
                message: "User not register",
                error: true,
                success: false
            })
        }

        if (user.verify_email !== true) {
            return res.status(400).json({
                message: "Your Email.is not verify yet please verify your email first",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcryptjs.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({
                message: "Check your password",
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
        res.cookie('accessToken', accessToken, cookiesOption);
        res.cookie('refreshToken', refreshToken, cookiesOption);


        return res.json({
            message: "Login successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
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


// logout controller 
export async function logoutController(request, res) {
    try {
        const userid = request.userId;  //middleware

        const cokkiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.clearCookie('accessToken', cokkiesOption);
        res.clearCookie('refreshToken', cokkiesOption);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
            refresh_token: ""
        })

        return res.json({
            message: "Logout successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//image upload
var imagesArr = [];
export async function userAvatarController(request, response) {
    try {
        imagesArr = [];

        const userId = request.userId; // auth middleware
        const image = request.files;

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return response.status(500).json({
                message: "User not found",
                error: true,
                success: false
            })
        }

        // first remove image from cloudinary
        const imgUrl = user.avatar;

        const urlArr = imgUrl.split("/");
        const avatar_image = urlArr[urlArr.length - 1];

        const imageName = avatar_image.split(".")[0];


        if (imageName) {
            const res = await cloudinary.uploader.destroy(
                imageName,
                (error, result) => {
                    // console.log(error,res)
                }
            );
        }



        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        for (let i = 0; i < image?.length; i++) {

            const img = await cloudinary.uploader.upload(
                image[i].path,
                options,
                function (error, result) {

                    imagesArr.push(result.secure_url);
                    fs.unlinkSync(`uploads/${request.files[i].filename}`);
                    console.log(request.files[i].filename)
                }
            );
        }

        user.avatar = imagesArr[0];
        await user.save();

        return response.status(200).json({
            _id: userId,
            avatar: imagesArr[0]
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// '/api/user?removeImg=?imh1.jpg' or remove image

export async function removeImageFromCloudinary(request, response) {
    const imgUrl = request.query.img;

    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];

    const imageName = image.split(".")[0];

    if (imageName) {
        const res = await cloudinary.uploader.destroy(
            imageName,
            (error, result) => {
                // console.log(error,res)
            }
        );

        if (res) {
            response.status(200).send(res);
        }
    }
}


// update user details
export async function updateUserDetails(request, response) {
    try {
        const userId = request.userId //auth middleware 
        const { name, email, mobile, password } = request.body;
        const userExist = await UserModel.findById(userId);
        if (!userExist)
            return response.status(400).send('The user cannot be Updated!');

        let verifyCode = "";
        if (email !== userExist.email) {
            verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        }
        let hashPassword = ""

        if (password) {
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password, salt)
        } else {
            hashPassword = userExist.password;
        }

        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                name: name,
                mobile: mobile,
                email: email,
                verify_email: email !== userExist.email ? false : true,
                password: hashPassword,
                otp: verifyCode !== "" ? verifyCode : null,
                otpExpires: verifyCode !== "" ? Date.now() + 600000 : ''
            },
            { new: true }
        )

        if (email !== userExist.email) {
            //send verification email
            await sendEmailFun({
                sendTo: email,
                subject: "Verrify email from Ecommerce App",
                text: "",
                html: VerificationEmail(name, verifyCode)
            })
        }

        return response.json({
            message: "User Updated successfully",
            error: false,
            success: true,
            user: updateUser
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}

//forget password

export async function forgotPasswordController(request, response) {
    try {
        const { email } = request.body
        const user = await UserModel.findOne({ email: email })

        if (!user) {
            return response.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }
        else {

            let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

            user.otp = verifyCode;
            user.otpExpires = Date.now() + 600000;
            await user.save();



            await sendEmailFun({
                sendTo: email,
                subject: "Verify email from Ecommerce App",
                text: "",
                html: VerificationEmail(user.name, verifyCode)
            })

            return response.json({
                message: "check your email",
                error: false,
                success: true
            })

        }



    } catch (error) {

    }
}

// verify forgot password otp 
export async function verifyForgotPasswordOtp(request, response) {
    try {
        const { email, otp } = request.body;

        if (!email || !otp) {
            return response.status(400).json({
                message: "Provide required fields: email, otp.",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return response.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            });
        }

        if (otp !== user.otp) {
            return response.status(400).json({
                message: "Invalid OTP",
                error: true,
                success: false
            });
        }

        const currentTime = new Date();
        if (user.otpExpires < currentTime) {
            return response.status(400).json({
                message: "OTP is expired",
                error: true,
                success: false
            });
        }

        // Reset OTP fields after successful verification
        user.otp = "";
        user.otpExpires = "";

        await user.save();

        return response.status(200).json({
            message: "Verify OTP successfully",
            error: false,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// reset password

export async function resetPassword(request, response) {
    try {
        const { email, newPassword, confirmPassword } = request.body;
        if (!email || !newPassword || !confirmPassword) {
            return response.status(400).json({
                message: "Provide required feilds email,newPassword,confirmPassword"
            })
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(400).json({
                message: "Email is not available",
                error: true,
                success: false
            })
        }

        if (newPassword !== confirmPassword) {
            return response.status(400).json({
                message: "newPassword and confirmPassword must be same.",
                error: true,
                success: false,
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(confirmPassword, salt);

        user.password = jashPassword;
        await user.save();


        return response.json({
            message: "password updated successfully.",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// refresh token controller

export async function refreshToken(request, response) {
    try {

        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split("")[1] // bear token

        if (!refreshToken) {
            return response.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            })
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN)
        if (!verifyToken) {
            return response.status(401).json({
                message: "Token is expired",
                error: true,
                success: false
            })
        }

        const userId = verifyToken?._id
        const newAccessToken = await generatedAccessToken(userId)

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        response.cookie('accessToken', newAccessToken, cookiesOption)

        return response.json({
            message: "New Access token generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// get login user details
export async function userDetails(request, response) {
    try {
        const userId = request.userId
        console.log(userId)
        const user = await UserModel.findById(userId).select('-password -refresh_token')
        return response.json({
            message: 'user details',
            date: user,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: "Something is wrong",
            error: true,
            success: false
        })
    }
}

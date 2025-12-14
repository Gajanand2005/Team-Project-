import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from './../models/usermodel.js';
import VerificationEmail from "../utils/verifyEmailTemplate.js";
import sendEmailFun from "../config/sendEmail.js";
import generatedAccessToken from "../utils/generatedAcessToken.js";
import generatedRefreshToken from "../utils/generatedRefresToken.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import ReviewModel from "../models/reviewsmodel.js";
import { error } from "console";



cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true,
});
//register User
export async function registerUserController(req, res) {
  try {
    let user;

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "provide email, name, password",
        error: true,
        success: false,
      });
    }

    user = await UserModel.findOne({ email: new RegExp('^' + email.toLowerCase() + '$', 'i') });

    if (user) {
      return res.json({
        message: "User already registered with this email!",
        error: true,
        success: false,
      });
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user = new UserModel({
      email: email.toLowerCase(),
      password: hashPassword,
      name: name,
      otp: verifyCode,
      otpExpires: Date.now() + 600000,
    });

    await user.save();

    //send verification email
    const verifyEmail = await sendEmailFun({
      sendTo: email,
      subject: "Verify email from smalcouture",
      text: "",
      html: VerificationEmail(name, verifyCode),
    });

    //Create a JWT token for verification purposes
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JSON_WEB_TOKEN_SECRET_KEY
    );

    return res.status(200).json({
      success: true,
      error: false,
      message: "User Registered successfully! Please verify your email.",
      token: token, // Optional: include this if needed for verification.s
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//verify email
export async function verifyEmailController(req, res) {
    try {
        const { email, otp } = req.body;

        const user = await UserModel.findOne({ email: new RegExp('^' + email.toLowerCase() + '$', 'i') });
        if (!user) {
            return res.status(400).json({ error: true, success: false, message: "User not found" });
        }

        const isCodeValid = user.otp === otp;
        const isNotExpired = user.otpExpires > Date.now();

        if (isCodeValid && isNotExpired) {
            user.verify_email = true;
            user.otp = null;
            user.otpExpires = null;
            await user.save();
            return res.status(200).json({ error: false, success: true, message: "Email verified successfully" });
        } else if (!isCodeValid) {
            return res.status(400).json({ error: true, success: false, message: "Invalid OTP" });
        } else {
            return res.status(400).json({ error: true, success: false, message: "OTP Expired" });
        }


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
//authWithGoogle
export async function authWithGoogle(req, res) {
    const {name,email,password,avatar,mobile,role}= req.body;

    try {
        const existingUser = await UserModel.findOne({email: new RegExp('^' + email.toLowerCase() + '$', 'i')});
        if(!existingUser){
            const userData = {
                name:name,
                mobile:mobile,
                email:email.toLowerCase(),
                password: "null",
                role: role,
                verify_email: true,
                signUpWithGoogle: true
            };
            if (avatar) {
                userData.avatar = avatar;
            }
            const user = await UserModel.create(userData);
            await user.save();
            
        const accessToken = await generatedAccessToken(user._id);
        const refreshToken = await generatedRefreshToken(user._id);

      await UserModel.findByIdAndUpdate(user?._id, {
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
        }else{
            const accessToken = await generatedAccessToken(existingUser._id);
        const refreshToken = await generatedRefreshToken(existingUser._id);

      await UserModel.findByIdAndUpdate(existingUser?._id, {
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
                refreshToken,
                user: {
                    _id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    avatar: existingUser.avatar,
                    mobile: existingUser.mobile,
                    role: existingUser.role
                }
            }
        })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}

//login user
export async function loginUserController(req, res) {
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
            console.log(`Login attempt failed: User not found for email ${email}`);
            return res.status(400).json({
                message: "User not registered",
                error: true,
                success: false
            })
        }

        if (user.signUpWithGoogle) {
            console.log(`Login attempt failed: User signed up with Google, cannot login with password for ${email}`);
            return res.status(400).json({
                message: "Please login with Google",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            console.log(`Login attempt failed: Incorrect password for user ${email}`);
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
        res.cookie('accessToken', accessToken, cookiesOption);
        res.cookie('refreshToken', refreshToken, cookiesOption);


        return res.json({
            message: "Login successfully",
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

// logout controller
export async function logoutController(req, res) {
    try {
        const userid = req.userId;  //middleware

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
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
//image upload
var imagesArr = [];
export async function userAvatarController(req, res) {
    try {
        imagesArr = [];

        const userId = req.userId; // auth middleware
        const image = req.files;

        if (!image || image.length === 0) {
            return res.status(400).json({
                message: "No image file provided",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // first remove image from cloudinary if exists
        if (user.avatar) {
            const imgUrl = user.avatar;
            const urlArr = imgUrl.split("/");
            const avatar_image = urlArr[urlArr.length - 1];
            const imageName = avatar_image.split(".")[0];

            if (imageName) {
                await cloudinary.uploader.destroy(imageName);
            }
        }

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        for (let i = 0; i < image.length; i++) {
            const result = await cloudinary.uploader.upload(image[i].path, options);
            imagesArr.push(result.secure_url);
            fs.unlinkSync(image[i].path);
        }

        user.avatar = imagesArr[0];
        await user.save();

        return res.status(200).json({
            _id: userId,
            avatar: imagesArr[0]
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// remove image
export async function removeImageFromCloudinary(req, res) {
    const imgUrl = req.query.img;
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];

    const imageName = image.split(".")[0];

    if (imageName) {
        const result = await cloudinary.uploader.destroy(
            imageName,
            (error, result) => {
                // console.log(error,res)
            }
        );

        if (result) {
            res.status(200).send(result);
        }
    }
}

// update user details
export async function updateUserDetails(req, res) {
    try {
        const userId = req.userId //auth middleware 
        const { name, email, mobile, password } = req.body;
        const userExist = await UserModel.findById(userId);
        if (!userExist)
            return res.status(400).send('The user cannot be Updated!');

        let verifyCode = "";
        if (email !== userExist.email) {
            verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        }
        let hashPassword = ""

        if (password) {
            const salt = await bcrypt.genSalt(10)
            hashPassword = await bcrypt.hash(password, salt)
        } else {
            hashPassword = userExist.password;
        }

        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                name: name,
                mobile: mobile,
                email: email.toLowerCase(),
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
                subject: "Verrify email from smalcouture App",
                text: "",
                html: VerificationEmail(name, verifyCode)
            })
        }

        return res.json({
            message: "User Updated successfully",
            error: false,
            success: true,
            user: {
                name:updateUser?.name,
                _id:updateUser?._id,
                email:updateUser?.email,
                mobile:updateUser?.mobile, 
                avatar:updateUser?.avatar,
                
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

//forgot password
export async function forgotPasswordController(req, res) {
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
        else {

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
                message: "Otp sent to  your email",
                error: false,
                success: true
            })

        }



    } catch (error) {

    }
}

//verify forgot password
export async function verifyForgotPasswordOtp(req, res) {
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

// reset password
export async function resetPassword(req, res) {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Provide required fields: email, newPassword, confirmPassword"
      });
    }

    const user = await UserModel.findOne({ email: new RegExp('^' + email.toLowerCase() + '$', 'i') });
    if (!user) {
      return res.status(400).json({
        message: "Email is not available",
        error: true,
        success: false
      });
    }


    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New password and confirm password must be same.",
        error: true,
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(confirmPassword, salt);

    user.password = hashPassword;
    user.signUpWithGoogle = false;
    user.forgotPasswordVerified = false;
    await user.save();

    return res.json({
      message: "Password updated successfully.",
      error: false,
      success: true
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

//refresh Token
export async function refreshToken(req, res) {
    try {
        const headerToken = req.headers['x-refresh-token'] || req.headers?.authorization?.split(' ')[1];
        const bodyToken = req.body?.refreshToken;

        const refreshToken =
            req.cookies.refreshToken ||
            headerToken ||
            bodyToken ||
            req.query?.token;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            });
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
        if (!verifyToken) {
            return res.status(401).json({
                message: "Token is expired",
                error: true,
                success: false
            });
        }

        const userId = verifyToken.id;
        const newAccessToken = await generatedAccessToken(userId);

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        res.cookie('accessToken', newAccessToken, cookiesOption);

        return res.json({
            message: "New Access token generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// get login user details
export async function userDetails(req, res) {
    try {
        const userId = req.userId
        console.log(userId)
        const user = await UserModel.findById(userId).populate('address_details').select('name email mobile avatar role status address_details orderHistory createdAt updatedAt')

        // Prevent caching to avoid 304 responses
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');

        return res.json({
            message: 'user details',
            data: user,
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something is wrong",
            error: true,
            success: false
        })
    }
}


//review controller
export async function addReview(req, res) {
    try {

        const {image, userName, review, userId, productId}= req.body;
        const UserReview = new ReviewModel({
             image: image,
             userName: userName,
             review: review,
             userId : userId,
             productId :productId
        })

        await UserReview.save();

        return res.json({
            message: "Review added successfully",
            error: false,
            success: true,

        })

    } catch (error) {
        return res.status(500).json({
            message: "Something is wrong",
            error: true,
            success: false
        })
    }
}

// get all users
export async function getAllUsers(req, res) {
    try {
        const users = await UserModel.find({}).select('name email mobile avatar role status address_details orderHistory createdAt updatedAt');
        return res.status(200).json({
            error: false,
            success: true,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something is wrong",
            error: true,
            success: false
        });
    }
}

// get reviews
export async function getReviews(req, res) {
    try {
        const productId= req.query.productId;
        const reviews = await ReviewModel.find({productId:productId});
        if(reviews.length === 0){
            return res.status(400).json({
                error: true,
                success: false
            })
        }

            return res.status(200).json({
                error: false,
                success: true,
              reviews: reviews
            })

    } catch (error) {
        return res.status(500).json({
            message: "Something is wrong",
            error: true,
            success: false
        })
    }
}
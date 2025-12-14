import jwt from 'jsonwebtoken';
import generatedAccessToken from '../utils/generatedAcessToken.js';
import generatedRefreshToken from '../utils/generatedRefresToken.js';
import UserModel from '../models/usermodel.js';

const auth = async (req, res, next) => {
    try {
        let token =
            req.cookies.accessToken ||
            req.cookies.adminAccessToken ||
            req?.headers?.authorization?.split(" ")[1] ||
            req.headers['x-access-token'];

        const isAdmin = !!req.cookies.adminAccessToken;

        if (!token && req.query?.token) {
            token = req.query.token;
        }

        if (!token && req.body?.token) {
            token = req.body.token;
        }

        if (!token) {
            return res.status(401).json({
                message: "Provide token"
            });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
        if (!decode) {
            return res.status(401).json({
                message: "Unauthorized access",
                error: true,
                success : false
            });
        }

        req.userId = decode.id;
        req.isAdmin = isAdmin;
        next();


    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // Try to refresh the token
            try {
                const refreshToken = req.cookies.refreshToken || req.cookies.adminRefreshToken;
                if (!refreshToken) {
                    return res.status(401).json({
                        message: "Refresh token not provided",
                        error: true,
                        success: false
                    });
                }

                const refreshDecode = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
                if (!refreshDecode) {
                    return res.status(401).json({
                        message: "Invalid refresh token",
                        error: true,
                        success: false
                    });
                }

                const userId = refreshDecode.id;
                const user = await UserModel.findById(userId);
                if (!user || user.refresh_token !== refreshToken) {
                    return res.status(401).json({
                        message: "Refresh token mismatch",
                        error: true,
                        success: false
                    });
                }

                // Generate new access token
                const newAccessToken = await generatedAccessToken(userId);

                const cookiesOption = {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None"
                };

                if (req.cookies.adminRefreshToken) {
                    res.cookie('adminAccessToken', newAccessToken, cookiesOption);
                } else {
                    res.cookie('accessToken', newAccessToken, cookiesOption);
                }

                req.userId = userId;
                req.isAdmin = !!req.cookies.adminRefreshToken;
                next();
            } catch (refreshError) {
                return res.status(401).json({
                    message: "Token refresh failed",
                    error: true,
                    success: false
                });
            }
        } else {
            return res.status(401).json({
                message: "Invalid token",
                error : true,
                success : false
            })
        }
    }
}

export default auth ;


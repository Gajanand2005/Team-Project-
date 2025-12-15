import OrderModel from "../models/ordermodel.js";
import ProductModel from'../models/productmodel.js';
import UserModel from '../models/usermodel.js';
import mongoose from 'mongoose';

export const createOrderController = async (req, res)=>{
    try {
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        let order = new OrderModel({
            userId: req.body.userId,
            orderId: orderId,
            products: req.body.products,
            paymentId: req.body.paymentId,
            payment_status: req.body.payment_status,
            delivery_address: req.body.delivery_address,
            totalAmt: req.body.totalAmt
        });

        // Update product stock
        for(let i = 0; i < req.body.products.length; i++){
            await ProductModel.findByIdAndUpdate(req.body.products[i].productId,
                {
                    $inc: { countInStock: -req.body.products[i].quantity }
                },
                {new: true}
            );
        }

        order = await order.save();

        return res.status(200).json({
            error: false,
            success: true,
            message: "Order created successfully",
            orderId: orderId
        });

    } catch (error) {
         return res.status(500).json({
            message: error.message || error,
            error : true,
            success: false
        })
    }
}

export const getOrdersDetailsController = async (req, res)=>{
    try {
        const userId = req.userId;

        // Fetch user to check role
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // Validate user role
        if (user.role !== 'ADMIN' && user.role !== 'USER' && user.role !== 'PRODUCT_UPLOADER') {
            return res.status(403).json({
                message: "Access denied. Valid role required.",
                error: true,
                success: false
            });
        }

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10000;

        // Build query filter based on user role or admin access
        // ADMIN sees all orders
        // USER and PRODUCT_UPLOADER see only their own orders unless accessing via admin
        let queryFilter = {};
        if ((user.role === 'USER' || user.role === 'PRODUCT_UPLOADER') && !req.isAdmin) {
            // Convert userId to ObjectId for proper MongoDB query
            queryFilter = { userId: new mongoose.Types.ObjectId(userId) };
        }
        // For ADMIN or admin access, queryFilter remains {} (empty object = all orders)

        // Get total count based on role
        const totalPosts = await OrderModel.countDocuments(queryFilter);
        const totalPages = Math.ceil(totalPosts / perPage);

        if (totalPages > 0 && page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            });
        }

        // Fetch orders based on role-based filter
        const orderlist = await OrderModel.find(queryFilter)
            .sort({createdAt: -1})
            .populate('delivery_address userId products.productId')
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        return res.json({
            message: "Order list fetched successfully",
            data: orderlist,
            totalPages: totalPages,
            page: page,
            error: false,
            success: true,
        })

    } catch (error) {
           return res.status(500).json({
            message: error.message || error,
            error : true,
            success: false
        })
    }
}

export const updateOrderStatusController = async (req, res)=>{
    const { id } = req.params;
    const { order_status } = req.body;

    try {
        const userId = req.userId;

        // Fetch user to check role
        const user = await UserModel.findById(userId);
        if (!user || (user.role !== 'ADMIN' && !req.isAdmin)) {
            return res.status(403).json({
                message: "Access denied. Admin role required.",
                error: true,
                success: false
            });
        }

     const updateOrder = await OrderModel.findByIdAndUpdate(
        id,
        {
            order_status: order_status

        },
        { new: true }
    )
     return res.json({
        message: "Order status updated successfully",
        data: updateOrder,
        error: false,
        success: true,
    })
   } catch (error) {
    return res.status(500).json({
        message: error.message || error,
        error : true,
        success: false
    })
   }

}

export const totalSalesController = async (req,res)=>{
    try {
        const userId = req.userId;

        // Fetch user to check role
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        if (user.role !== 'ADMIN' && user.role !== 'PRODUCT_UPLOADER' && user.role !== 'USER' && !req.isAdmin) {
            return res.status(403).json({
                message: "Access denied. Valid role required.",
                error: true,
                success: false
            });
        }

        const currentYear = req.query.year ? parseInt(req.query.year) : new Date().getFullYear();

        // Build query filter based on user role
        let queryFilter = {};
        if (user.role === 'USER' && !req.isAdmin) {
            queryFilter = { userId: new mongoose.Types.ObjectId(userId) };
        }

        const ordersList = await OrderModel.find(queryFilter);

        let totalSales = 0;
        let monthlySales = [
            {
                name: 'JAN',
                totalSales: 0
            },{
                name: 'FEB',
                totalSales: 0
            },{
                name: 'MAR',
                totalSales: 0
            },{
                name: 'APR',
                totalSales: 0
            },{
                name: 'MAY',
                totalSales: 0
            },{
                name: 'JUN',
                totalSales: 0
            },{
                name: 'JUL',
                totalSales: 0
            },{
                name: 'AUG',
                totalSales: 0
            },{
                name: 'SEP',
                totalSales: 0
            },{
                name: 'OCT',
                totalSales: 0
            },{
                name: 'NOV',
                totalSales: 0
            },{
                name: 'DEC',
                totalSales: 0
            }
        ]

            for(let i=0; i< ordersList.length; i++){
                totalSales = totalSales + parseInt(ordersList[i].totalAmt);
                const date = new Date(ordersList[i]?.createdAt);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;

                if(currentYear == year){
                    monthlySales[month - 1].totalSales += parseInt(ordersList[i].totalAmt);
                }
            }

            return res.status(200).json({
                totalSales: totalSales,
                monthlySales: monthlySales,
                error: false,
                success: true
            })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true,
            success: false
        })
    }
}

export const getMyOrdersController = async (req, res) => {
    try {
        const userId = req.userId;

        const orders = await OrderModel.find({ userId: new mongoose.Types.ObjectId(userId) })
            .sort({ createdAt: -1 })
            .populate('delivery_address userId products.productId')
            .exec();

        return res.json({
            message: "My orders fetched successfully",
            data: orders,
            error: false,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

export const totalUsersController = async(req,res)=>{
    try {
        const userId = req.userId;

        // Fetch user to check role
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        if (user.role !== 'ADMIN' && user.role !== 'PRODUCT_UPLOADER' && user.role !== 'USER' && !req.isAdmin) {
            return res.status(403).json({
                message: "Access denied. Valid role required.",
                error: true,
                success: false
            });
        }

        const currentYear = req.query.year ? parseInt(req.query.year) : new Date().getFullYear();
        const users = await UserModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(currentYear, 0, 1),
                        $lt: new Date(currentYear + 1, 0, 1)
                    }
                }
            },
            {
                $group:{
                    _id: {month: {$month: "$createdAt"}},
                    count: {$sum: 1},
                }
            },
            {
                $sort: {"_id.month" : 1},
            },
        ])

        let monthlyUsers = [
            {
                name: 'JAN',
                TotalUsers: 0
            },{
                name: 'FEB',
                TotalUsers: 0
            },{
                name: 'MAR',
                TotalUsers: 0
            },{
                name: 'APR',
                TotalUsers: 0
            },{
                name: 'MAY',
                TotalUsers: 0
            },{
                name: 'JUN',
                TotalUsers: 0
            },{
                name: 'JUL',
                TotalUsers: 0
            },{
                name: 'AUG',
                TotalUsers: 0
            },{
                name: 'SEP',
                TotalUsers: 0
            },{
                name: 'OCT',
                TotalUsers: 0
            },{
                name: 'NOV',
                TotalUsers: 0
            },{
                name: 'DEC',
                TotalUsers: 0
            }
        ]

        for (let i=0; i< users.length; i++){
            const month = users[i]._id.month;
            monthlyUsers[month - 1].TotalUsers = users[i].count;
        }

        return res.status(200).json({
           TotalUsers: monthlyUsers,
           error: false,
           success: true
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            message: error.message
        })
    }
}


import OrderModel from "../models/ordermodel.js";
import ProductModel from "../models/productmodel.js";



export const createOrderController = async (req,res) => {
    try {

        let order = new OrderModel({
            userId: req.body.userId,
            products: req.body.products,
            paymentId: req.body.paymentId,
            payment_status: req.body.payment_status,
            delivery_address:req.body.delivery_address,
            totalAmt:req.body.totalAmt,
            date:req.body.date
        });

        if(!order) {
            res.status(500).json({
                error:true,
                success:false
            })
        }

        for(let i = 0; i< req.body.products.length; i++) {

            await ProductModel.findByIdAndUpdate(
            req.body.products[i].productId,
            {
                countInStock: parseInt(req.body.products[i].countInStock - req.body.products[i].quantity),
            },
             { new: true }
            );
        }

        order = await order.save();

        return res.status(200).json({
            error: false,
            success: true,
            message: "Order Placed",
            order: order
        });


    } catch(error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


export async function getOrderDetailsController(req,res) {
    try {
        const userId = req.userId  //order id

        const orderlist = await OrderModel.find({ userId: userId }).sort({ createdAt: -1 }).populate('delivery_address, userId');

        return res.json({
            message: "Order list",
            data: orderlist,
            error: false,
            success: true
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


// function getPayPalClient() {

// }
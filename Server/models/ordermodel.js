import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    orderId: {
        type: String,
        required: [true, "Provide orderId"],
        unique: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.ObjectId,
            ref: 'product'
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        name: String,
        image: Array
    }],
    paymentId: {
        type: String,
        default: ""
    },
    payment_status: {
        type: String,
        default: ""
    },
    delivery_address: {
        type: mongoose.Schema.ObjectId,
        ref: 'address'
    },
    subTotalAmt: {
        type: Number,
        default: 0
    },
    totalAmt: {
        type: Number,
        default: 0
    },
    order_status: {
        type: String,
        default: "pending"
    }
},
  
   {
      timestamps: true 
   }
)

const OrderModel = mongoose.model('order' , orderSchema);
export default OrderModel ;


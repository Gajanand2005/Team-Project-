import mongoose from 'mongoose' ;


const cartSchema = new mongoose.Schema({
  
productTitle:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
oldPrice:{
    type:Number,
},
discount:{
    type:Number,
},
size:{
    type:String,
},
quantity:{
    type:Number,
    required:true
},

subTotal:{
    type:Number,
    required:true
},
productId:{
    type:String,
    required:true
},

countInStock:{
    type:Number,
    required:true
},
userId:{
   type:String,
   required:true 
},
brand:{
   type:String,
  
}
},
    {
        timestamps: true
    }
)
const  CartModel = mongoose.model('cart', cartSchema);
export default CartModel ;


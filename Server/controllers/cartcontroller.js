import CartProductModel from '../models/cartProductModel.js';
import ProductModel from '../models/productmodel.js';

export const addToCartItemController = async(req, res)=>{
    try {
        const userId = req.userId;
        const {productTitle,image,price,oldPrice,quantity,subTotal,productId,countInStock,discount, size, brand}= req.body;

        if(!productId){
            return res.status(400).json({
                message :"Provide productId",
                error : true,
                success: false
            })
        }

        // Fetch the product to check current stock
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            });
        }

        if (product.countInStock <= 0) {
            return res.status(400).json({
                message: "Product is out of stock",
                error: true,
                success: false
            });
        }

        const checkItemCart = await CartProductModel.findOne({
            userId : userId,
            productId : productId
        })

        if(checkItemCart){
            return res.status(400).json({
                message: "Item already in cart"
            })
        }

        const cartItems = new CartProductModel({
           productTitle:productTitle,
            image:image,
            price:price,
            oldPrice:oldPrice,
            quantity:quantity,
            subTotal:subTotal,
            productId:productId,
            countInStock:countInStock,
            userId:userId,
            brand:brand,
            discount:discount,
            size:size,

        })

        const save = await cartItems.save();

        

        return res.status(200).json({
            data : save,
            message : 'Item added to cart successfully',
            error : false,
            success: true
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true,
            success: false
        });
    }
}

export const getCartItemsController= async(req,res)=>{
    try {

        const userId = req.userId;
        const cartItems = await CartProductModel.find({userId : userId});

        // Add product sizes to each cart item
        const cartItemsWithSizes = await Promise.all(
            cartItems.map(async (item) => {
                const product = await ProductModel.findById(item.productId);
                return {
                    ...item.toObject(),
                    productSizes: product ? product.size : []
                };
            })
        );

        return res.json({
            data : cartItemsWithSizes,
            error : false,
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

export const updateCartItemQtyController = async(req,res)=>{
    try {
        const userId = req.userId;
        const {_id, qty,subTotal,size}= req.body;

         if(!_id || !qty){
            return res.status(400).json({
                message : "Provide _id, qty"
            })
         }

         const updateCartitem = await CartProductModel.updateOne({
            _id : _id,
            userId : userId
         },{
            quantity : qty,
            subTotal: subTotal,
            size: size
         },{new:true}
         );

         return res.json({
            message : "Cart updated",
            success : true,
            error : false,
            data : updateCartitem

         })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true,
            success: false
        })
    }
}

export const updateCartItemSizeController = async(req,res)=>{
    try {
        const userId = req.userId;
        const {_id, size}= req.body;

         if(!_id || !size){
            return res.status(400).json({
                message : "Provide _id and size"
            })
         }

         const updateCartitem = await CartProductModel.updateOne({
            _id : _id,
            userId : userId
         },{
            size : size
         },{new:true}
         );

         return res.json({
            message : "Cart size updated",
            success : true,
            error : false,
            data : updateCartitem

         })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true,
            success: false
        })
    }
}

export const deleteCartItemQtyController = async (req,res)=>{
    try {
        const userId = req.userId;
        const {id} = req.params;

        if(!id){
            return res.status(400).json({
                message : "Provide id",
                error : true,
                success: false
            })
        }

        const deleteCartItem = await CartProductModel.deleteOne({
            _id : id,
            userId : userId
        })

        if(!deleteCartItem){
          return res.status(404).json({
              message :"The product in the cart was not found",
            error : true,
            success: false
          })
        }

        return res.status(200).json({
            message : "Item removed",
            error : false,
            success: true,
            data : deleteCartItem
        })

    } catch (error) {
       return res.status(500).json({
        message: error.message || error,
        error : true,
        success: false
       }) 
    }
}


export const emptyCartController = async (req,res)=>{
    try {
        const userId = req.userId;
        
        await CartProductModel.deleteMany({userId : userId});

        return res.status(200).json({
            message : "Cart is empty",
            error : false,
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


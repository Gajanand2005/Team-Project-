import {Router} from 'express';
import { addToCartItemController, deleteCartItemQtyController, emptyCartController, getCartItemsController, updateCartItemQtyController, updateCartItemSizeController } from '../controllers/cartcontroller.js';
import auth from '../middleware/auth.js';

const cartRouter = Router();

cartRouter.post('/add',auth,addToCartItemController)
cartRouter.get ('/get',auth,getCartItemsController)
cartRouter.put ('/update-qty',auth,updateCartItemQtyController)
cartRouter.put ('/update-size',auth,updateCartItemSizeController)
cartRouter.delete ('/delete-cart-item/:id',auth,deleteCartItemQtyController)
cartRouter.delete ('/emptyCart/:id',auth,emptyCartController)
export default cartRouter;


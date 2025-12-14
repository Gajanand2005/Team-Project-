import {Router} from 'express';
import { addAddressController, deleteAddressController, editAddress, getAddressController, getSingleAddressController } from '../controllers/addresscontroller.js';
import auth from '../middleware/auth.js';


const addressRouter = Router();

addressRouter.post('/add',auth, addAddressController);
addressRouter.get('/get',auth, getAddressController);
addressRouter.get('/:id',auth, getSingleAddressController);
addressRouter.delete('/:id',auth, deleteAddressController);
addressRouter.put('/:id',auth, editAddress);
// addressRouter.put('/selectAddress/:id',auth, selectAddressController);


export default addressRouter;


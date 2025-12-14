import {Router} from 'express';
import auth from '../middleware/auth.js';
import { addToMyListController, deleteToMyListController, getMyListController } from '../controllers/mylistscontroller.js';

const myListRouter = Router();

myListRouter.post('/add',auth,addToMyListController)
myListRouter.get('/',auth,getMyListController)
myListRouter.delete('/:id',auth,deleteToMyListController)

export default myListRouter;


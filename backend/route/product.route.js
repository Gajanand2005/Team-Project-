import {Router} from 'express'
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import {createProduct, getAllProducts, getAllProductsByCatId, uploadImages,getAllProductsByCatName, getAllProductsBySubCatId,getAllProductsBySubCatName,getAllProductsByThirdLavelCatId, getAllProductsByThirdLavelCatName, getAllProductsByPrice, getAllProductsByRating, getAllProductsCount, getAllFeaturedProducts, deleteProduct, getProducts, removeImageFromCloudinary, updateProduct } from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.post('/uploadImages', auth,upload.array('images'),uploadImages);
productRouter.post('/create', auth, createProduct);
productRouter.get('/getAllProducts',  getAllProducts);
productRouter.get('/getAllProductsByCatId/:id',  getAllProductsByCatId);
productRouter.get('/getAllProductsByCatName',  getAllProductsByCatName);
productRouter.get('/getAllProductsBySubCatId/:id',  getAllProductsBySubCatId);
productRouter.get('/getAllProductsBySubCatName',  getAllProductsBySubCatName);
productRouter.get('/getAllProductsByThirdLavelCatId/:id',  getAllProductsByThirdLavelCatId);
productRouter.get('/getAllProductsByThirdLavelCatName',  getAllProductsByThirdLavelCatName);
productRouter.get('/getAllProductsByPrice',  getAllProductsByPrice);
productRouter.get('/getAllProductsByRating',  getAllProductsByRating);
productRouter.get('/getAllProductsCount',  getAllProductsCount);
productRouter.get('/getAllFeaturedProducts',  getAllFeaturedProducts);
productRouter.delete('/:id',  deleteProduct);
productRouter.get('/:id',  getProducts);
productRouter.delete('/deleteImage',auth, removeImageFromCloudinary);
productRouter.put('/updateProduct/ :id',auth, updateProduct);



export default productRouter; 
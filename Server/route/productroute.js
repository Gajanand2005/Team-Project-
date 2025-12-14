import {Router} from 'express'
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import {createProduct, getAllProducts, getAllProductsByCatId, uploadImages,getAllProductsByCatName, getAllProductsBySubCatId,getAllProductsBySubCatName,getAllProductsByThirdLavelCatId, getAllProductsByThirdLavelCatName, getAllProductsByPrice, getAllProductsByRating, getAllProductsCount, getAllFeaturedProducts, deleteProduct, getProducts, removeImageFromCloudinary, updateProduct, deleteMultipleProduct, createProductSize, deleteProductSize, updateProductSize, deleteMultipleProductSize, getProductSize, getProductSizeById, filters, sortBy, searchProductController } from '../controllers/productcontroller.js';

const productRouter = Router();

productRouter.post('/uploadImages', auth, (req, res, next) => {
    upload.array('images')(req, res, function(err) {
        if (err) {
            return res.status(400).json({
                message: err.message || 'File upload error',
                error: true,
                success: false
            });
        }
        next();
    });
}, uploadImages);
productRouter.post('/create', auth, createProduct);
productRouter.post('/filters',filters);
productRouter.post('/search/get' ,searchProductController)
productRouter.post('/sortBy',sortBy);
productRouter.get('/getAllProducts', getAllProducts);
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
productRouter.delete('/deleteImage',auth, removeImageFromCloudinary);
productRouter.delete('/deleteMultiple',deleteMultipleProduct);
productRouter.delete('/:id',  deleteProduct);
productRouter.get('/:id',  getProducts);
productRouter.post('/:id', auth, updateProduct);
productRouter.put('/updateProduct/:id',auth, updateProduct);

productRouter.post('/productSize/create',createProductSize);
productRouter.delete('/productSize/:id',deleteProductSize);
productRouter.put('/productSize/:id',auth,updateProductSize);
productRouter.delete('/productSize/deleteMultipleSize',deleteMultipleProductSize);
productRouter.get('/productSize/get',getProductSize);
productRouter.get('/productSize/:id',getProductSizeById);



export default productRouter; 


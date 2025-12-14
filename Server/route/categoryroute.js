import {Router} from 'express'
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { createCategory, deleteCategory, getCategories, getCategoriesCount, getCategory, getSubCategoriesCount, removeImageFromCloudinary, updatedCategory, uploadImages } from '../controllers/categorycontroller.js';
const categoryRouter = Router();

categoryRouter.post('/uploadImages', auth, (req, res, next) => {
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
categoryRouter.post('/create', auth,createCategory);
categoryRouter.get('/', getCategories);
categoryRouter.get('/get/count', getCategoriesCount);
categoryRouter.get('/get/count/subCat', getSubCategoriesCount);
categoryRouter.get('/:id', getCategory);
categoryRouter.delete('/deleteImage',auth, removeImageFromCloudinary);
categoryRouter.delete('/:id',auth, deleteCategory);
categoryRouter.put('/:id',auth, updatedCategory);

export default categoryRouter;


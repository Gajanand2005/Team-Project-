import CategoryModel from './../models/categorymodel.js';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true, 
});

export async function uploadImages(request, response) {
    try {
        let files = [];

        if (Array.isArray(request.files)) {
            files = request.files;
        } else if (Array.isArray(request.files?.images)) {
            files = request.files.images;
        } else if (request.files?.images) {
            files = [request.files.images];
        }

        if (!files.length) {
            return response.status(400).json({
                message: "No images provided",
                error: true,
                success: false
            });
        }

        const imagesArr = [];
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        const uploadPromises = files.map(file => {
            return new Promise((resolve) => {
                cloudinary.uploader.upload(
                    file.path,
                    options,
                    (error, result) => {
                        if (error) {
                            console.error("Upload error for file:", file.originalname, error);
                        } else {
                            if (result && result.secure_url) {
                                imagesArr.push(result.secure_url);
                            } else {
                                console.error("Upload failed: no secure_url", result);
                            }
                        }
                        // Delete from local uploads folder
                        try {
                            fs.unlinkSync(file.path);
                        } catch (unlinkError) {
                            console.error("Error deleting file:", unlinkError);
                        }
                        resolve();
                    }
                );
            });
        });

        await Promise.all(uploadPromises);

        if (imagesArr.length === 0) {
            return response.status(500).json({
                message: "Failed to upload any images",
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            images: imagesArr,
            success: true,
            error: false
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// create category
export async function createCategory(request, response) {
    try {
        let category = new CategoryModel ({
            name : request.body.name,
            images : request.body.images,
            parentId : request.body.parentId,
            parentCatName : request.body.parentCatName,
        });

        if (!category) {
            return response.status(500).json({
            message: "category not created",
            error: true,
            success: false
        })
    }

    category =  await category.save();

    return response.status(201).json({
            message: "category created",
            error: false,
            success: true,
            category : category
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// get category 
export async function getCategories(request, response) {
    try {
        const categories = await CategoryModel.find();
        const categoryMap = {};

        categories.forEach(cat => {
            categoryMap[cat._id] = { ...cat._doc, children : [] };
        });

        const rootCategories = [];

        categories.forEach(cat => {
            if (cat.parentId) {
                categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
            } else {
                rootCategories.push(categoryMap[cat._id]);
            }
        });

        response.set('Cache-Control', 'no-store');
        return response.status(200).json({
            error: false,
            success: true,
            data : rootCategories
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//get category count
export async function getCategoriesCount(request, response) {
    try {
        const categoryCount = await CategoryModel.countDocuments({parentId:undefined});
        if (!categoryCount) {
            response.status(500).json({ success : false, error: true });
        }
        else {
            response.send({
                categoryCount : categoryCount,
            });
        }
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
//get subcategory count
export async function getSubCategoriesCount(request, response) {
    try {
        const categories = await CategoryModel.find();
        if (!categories) {
            response.status(500).json({ success : false, error: true });
        }
        else {
            const subCatList = [];
            for (let cat of categories) {
                if (cat.parentId!==undefined){
                    subCatList.push(cat);
            }
        }

        response.send({
            subCategoryCount : subCatList.length,
        });

    }  

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//get single category
export async function getCategory(request, response) {
    try {
        if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
            return response.status(400).json({
                message: "Invalid category ID format",
                error: true,
                success: false
            });
        }

        const category = await CategoryModel.findById(request.params.id);

        if (!category) {
            return response.status(404).json({
                message: "The category with the given ID was not found.",
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            category: category
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


// Delete images
export async function removeImageFromCloudinary(request, response) {
    try {
        const imgUrl = request.query.img;

        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];

        const imageName = image.split(".")[0];

        if (imageName) {
            const result = await cloudinary.uploader.destroy(imageName);

            if (result.result === 'ok') {
                return response.status(200).json({
                    success: true,
                    message: 'Image deleted successfully'
                });
            } else {
                return response.status(400).json({
                    success: false,
                    message: 'Failed to delete image'
                });
            }
        } else {
            return response.status(400).json({
                success: false,
                message: 'Invalid image URL'
            });
        }
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


// Delete category
export async function deleteCategory(request, response) {
    try {
        const category = await CategoryModel.findById(request.params.id);
        if (!category) {
            return response.status(404).json({
                message: "Category not found!",
                success: false,
                error: true
            });
        }

        // Delete images for main category
        const images = category.images;
        for (let img of images) {
            const imgUrl = img;
            const urlArr = imgUrl.split("/");
            const image = urlArr[urlArr.length - 1];
            const imageName = image.split(".")[0];
            if (imageName) {
                cloudinary.uploader.destroy(imageName, (error, result) => {
                    // console.log(error, result);
                });
            }
        }

        const subCategory = await CategoryModel.find({
            parentId: request.params.id
        });

        for (let i = 0; i < subCategory.length; i++) {
            // Delete images for subcategory
            const subImages = subCategory[i].images;
            for (let img of subImages) {
                const urlArr = img.split("/");
                const image = urlArr[urlArr.length - 1];
                const imageName = image.split(".")[0];
                if (imageName) {
                    cloudinary.uploader.destroy(imageName, (error, result) => {
                        // console.log(error, result);
                    });
                }
            }

            const thirdSubCategory = await CategoryModel.find({
                parentId: subCategory[i]._id
            });

            for (let j = 0; j < thirdSubCategory.length; j++) {
                // Delete images for third subcategory
                const thirdImages = thirdSubCategory[j].images;
                for (let img of thirdImages) {
                    const urlArr = img.split("/");
                    const image = urlArr[urlArr.length - 1];
                    const imageName = image.split(".")[0];
                    if (imageName) {
                        cloudinary.uploader.destroy(imageName, (error, result) => {
                            // console.log(error, result);
                        });
                    }
                }
                await CategoryModel.findByIdAndDelete(thirdSubCategory[j]._id);
            }
            await CategoryModel.findByIdAndDelete(subCategory[i]._id);
        }

        await CategoryModel.findByIdAndDelete(request.params.id);

        response.status(200).json({
            success: true,
            error: false,
            message: "Category deleted!",
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


// Update category
export async function updatedCategory(request, response) {
    const body = request.body || {};
    const updateData = {};

    if (body.name !== undefined) {
        updateData.name = body.name;
    }
    if (body.images !== undefined) {
        updateData.images = body.images;
    }
    if (body.parentId !== undefined) {
        updateData.parentId = body.parentId;
    }
    if (body.parentCatName !== undefined) {
        updateData.parentCatName = body.parentCatName;
    }

    if (Object.keys(updateData).length === 0) {
        return response.status(400).json({
            message: "No valid fields provided for update",
            error: true,
            success: false
        });
    }

    const category = await CategoryModel.findByIdAndUpdate(
        request.params.id,
        updateData,
        { new: true }
    );

    if (!category) {
        return response.status(404).json({
            message: "Category not found or cannot be updated!",
            success: false,
            error: true
        });
    }

    response.status(200).json({
        error: false,
        success: true,
        category: category
    });
}


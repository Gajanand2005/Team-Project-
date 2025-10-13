import CategoryModel from "../models/category.model.js";
import { v2 as cloudinary } from 'cloudinary';
import { error } from "console";
import { NONAME } from "dns";
import fs from 'fs';
import { Children } from "react";

cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true, 
});

//image upload
var imagesArr = [];
export async function uploadImages(request, response) {
    try {
        imagesArr = [];

        //const userId = request.userId; // auth middleware
        const image = request.files;

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        for (let i = 0; i < image?.length; i++) {

            const img = await cloudinary.uploader.upload(
                image[i].path,
                options,
                function (error, result) {

                    imagesArr.push(result.secure_url);
                    fs.unlinkSync(`uploads/${request.files[i].filename}`);
                    console.log(request.files[i].filename)
                }
            );
        }

        // user.avatar = imagesArr[0];
        // await user.save();

        return response.status(200).json({
            _id: userId,
            images: imagesArr[0]
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


//create category
export async function createCategory(request, response) {
    try {
        let category = new Category ({
            name : request.body.name,
            images : imagesArr,
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

    imagesArr = [];

    return response.status(500).json({
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

//get category 
export async function getCategories(request, response) {
    try {
        const categories = await CategoryModel.find();
        const CategoryMap = {};

        categories.forEach(cat => {
            CategoryMap[cat._id] = { ...cat._doc, Children : [] };
        });

        const rootCategories = [];

        categories.forEach(cat => {
            if (cat.parentId) {
                CategoryMap[cat.parentId].children.push(CategoryMap[cat._id]);
            } else {
                rootCategories.push(caytegoryMap[cat._id]);
            }
        })

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
        const categoryCount = await Category.countDocuments({parentId:undefined});
        if (!categoryCount) {
            response.status(500).json({ success : false, error: true });
        }
        else {
            response.send({
                categoryCount : categoryCount,
            })
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
export async function geSubCategoriesCount(request, response) {
    try {
        const categories = await CategoryModel.find();
        if (!categories) {
            response.status(500).json({ success : false, error: true });
        }
        else {
            const subCatlist = [];
            for (let cat of categories) {
                if (cat.parentId!==undefined){
                    subCatlist.push(cat);
            }
        }

        response.send({
            subCategoryCount : subCatlist.length,
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
export async function geSubCategoriesCount(request, response) {
    try {
        const category = await Category.findById(request.params.id);

        if (!category) {
            response.status(500)
                .json(
                    { 
                        message : "The category with the given ID was not found.",
                        error : true,
                        success : false
                    }
                );
        }

        return response.status(200).json ({
            error : false,
            success : true,
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


export async function removeImageFromCloudinary(request, response) {
    const imgUrl = request.query.img;

    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];

    const imageName = image.split(".")[0];

    if (imageName) {
        const res = await cloudinary.uploader.destroy(
            imageName,
            (error, result) => {
                // console.log(error,res)
            }
        );

        if (res) {
            response.status(200).send(res);
        }
    }
}

export async function deleteCategory(request, response) {
    const category = await CategoryModel.findById(request.params.id);
    const images = category.images;
    let img = "";
    for (img of images) {
        const imgUrl = img;
        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];

        const imageName = image.split(".")[0];

        if(imageName) {
            cloudinary.uploader.destroy(imageName, (error, result) => {
            //console.log (error, result);
        });
        }
        
    }
    

    const subCategory = await CategoryModel.find({
        parentId : request.params.id
    });

    for (let i = 0; i < subCategory.length; i++) {
        console.log(subCategory[i]._id);

        const thirdSubCategory = await Category.find({
            parentId : subCategory[i]._id
        });

        for (let i = 0; i < thirdSubCategory.length; i++) {
            const deletedThirdSubCat = await category.findByIdAndDelete(thirdSubCategory[i]._id);
        }
        const deletedSubCat = await Category.findByIdAndDelete(subCategory[i]._id);
    }

    const deletedCat = await CategoryModel.findByIdAndDelete(request.params.id);
    if (!deletedCat) {
        response.status(404).json({
            message : "Category not found!",
            success : false,
            error : true
        });
    }

    response.status(200).json({
        success : true,
        error : false,
        message : "Category deleted!",
    })
}

export async function updatedCategory(request, response) {
    console.log(imagesArr);

    const category = await CategoryModel.findByIdAndUpdate(
        request.params.id,
        {
            name: request.body.name,
            images: imagesArr.length > 0 ? imagesArr[0] : request.body.images,
            parentId: request.body.parentId,
            parentCatName: request.body.parentCatName
        },
        { new: true }
    );

    if (!category) {
        return response.status(404).json({
            message: "Category not found or cannot be updated!",
            success: false,
            error: true
        });
    }

    imagesArr = [];

    response.status(200).json({
        error: false,
        success: true,
        category: category
    });
}

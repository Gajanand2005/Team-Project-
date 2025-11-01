import ProductModel from '../models/product.model.js';

import { v2 as cloudinary } from 'cloudinary';
import { error } from 'console';
import e from 'express';
import fs from 'fs';

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

        const image = request.files;
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        for (let i = 0; i < image?.length; i++) {

            const result = await cloudinary.uploader.upload(
                image[i].path, 
                options,
                function (error, result) {
                    // imagesArr.push(result.secure_url);

                     // Push Cloudinary image URL
                    if (result && result.secure_url) {
                       imagesArr.push(result.secure_url);
                    } else {
                      console.error("Upload failed: no secure_url", result);
                    }
                     // Delete from local uploads folder
                    fs.unlinkSync(`uploads/${request.files[i].filename}`);
                }
            );
        }

        return response.status(200).json({
            images: imagesArr
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// create product
export async function createProduct(req, res) {
    try { 
           let product = new ProductModel({
                name: req.body.name,
                description: req.body.description,
                images: imagesArr,
                brand: req.body.brand,
                price: req.body.price,
                oldPrice: req.body.oldPrice,
                catName: req.body.catName,
                catId: req.body.catId,
                subCatId: req.body.subCatId,
                subCat: req.body.subCat,
                thirdsubCat: req.body.thirdsubCat,
                thirdsubCatId: req.body.thirdsubCatId,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                isFeatured: req.body.isFeatured,
                discount: req.body.discount,
                productRam: req.body.productRam,
                size: req.body.size,
                productWeight: req.body.productWeight,
           });

           product = await product.save();

           if (!product) {
               res.status(500).json({
                error: true,
                success: false,
                message: "Product Not Created"
               });
           }

           imagesArr = [];

           res.status(200).json({
            message: "Product Created Successfully",
            error:false,
            succes:true,
            product:product
           })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}    
        

// get all products
export async function getAllProducts(req,res){
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) ;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts/ perPage);

        if(page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success:false,
                error:true
            });
        }
     
        const products = await ProductModel.find().populate("category")
        .skip((page -1) * perPage)
        .limit(perPage)
        .exec();

        if(!products){
             res.status(500).json({
                message:"No Products Found",
                error:true,
                success:false
            });
        }

        return res.status(200).json({
            error:false,
            succes:true,
            products: products,
            totalPages: totalPages,
            page:page
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// get all products by category Id
export async function getAllProductsByCatId(req,res){
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts/ perPage);

        if(page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success:false,
                error:true
            });
        }
     
        const products = await ProductModel.find({
            catId:req.params.id
        })
        .populate("category")
        .skip((page -1) * perPage)
        .limit(perPage)
        .exec();

        if(!products){
             res.status(500).json({
                message:"No Products Found",
                error:true,
                success:false
            });
        }

        return res.status(200).json({
            error:false,
            succes:true,
            products: products,
            totalPages: totalPages,
            page:page
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// get all products by category name 
export async function getAllProductsByCatName(req,res){
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts/ perPage);

        if(page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success:false,
                error:true
            });
        }
        
       
        const products = await ProductModel.find({
            catName:req.query.catName
        })
        .populate("category")
        .skip((page -1) * perPage)
        .limit(perPage)
        .exec();

        if(!products){
             res.status(500).json({
                message:"No Products Found",
                error:true,
                success:false
            });
        }

        return res.status(200).json({
            error:false,
            succes:true,
            products: products,
            totalPages: totalPages,
            page:page
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// get all products by subcategory Id
export async function getAllProductsBySubCatId(req,res){
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts/ perPage);

        if(page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success:false,
                error:true
            });
        }
     
        const products = await ProductModel.find({
            subCatId:req.params.id
        })
        .populate("category")
        .skip((page -1) * perPage)
        .limit(perPage)
        .exec();

        if(!products){
             res.status(500).json({
                message:"No Products Found",
                error:true,
                success:false
            });
        }

        return res.status(200).json({
            error:false,
            succes:true,
            products: products,
            totalPages: totalPages,
            page:page
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// get all products by subcategory name 
export async function getAllProductsBySubCatName(req,res){
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts/ perPage);

        if(page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success:false,
                error:true
            });
        }
        
       
        const products = await ProductModel.find({
        subCat:req.query.subCat
        })
        .populate("category")
        .skip((page -1) * perPage)
        .limit(perPage)
        .exec();

        if(!products){
             res.status(500).json({
                message:"No Products Found",
                error:true,
                success:false
            });
        }

        return res.status(200).json({
            error:false,
            succes:true,
            products: products,
            totalPages: totalPages,
            page:page
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// get all products by thirdsubCatId Id
export async function getAllProductsByThirdLavelCatId(req,res){
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts/ perPage);

        if(page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success:false,
                error:true
            });
        }
     
        const products = await ProductModel.find({
            thirdsubCatId:req.params.id
        })
        .populate("category")
        .skip((page -1) * perPage)
        .limit(perPage)
        .exec();

        if(!products){
             res.status(500).json({
                message:"No Products Found",
                error:true,
                success:false
            });
        }

        return res.status(200).json({
            error:false,
            succes:true,
            products: products,
            totalPages: totalPages,
            page:page
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// get all products by thirdsubCat name 
export async function getAllProductsByThirdLavelCatName(req,res){
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts/ perPage);

        if(page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success:false,
                error:true
            });
        }
        
       
        const products = await ProductModel.find({
            thirdsubCat:req.query.thirdsubCat
        })
        .populate("category")
        .skip((page -1) * perPage)
        .limit(perPage)
        .exec();

        if(!products){
             res.status(500).json({
                message:"No Products Found",
                error:true,
                success:false
            });
        }

        return res.status(200).json({
            error:false,
            succes:true,
            products: products,
            totalPages: totalPages,
            page:page
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// get all products by price
export async function getAllProductsByPrice(req,res){
    let productList = [] ;

    if(req.query.catId != "" && req.query.catId !== undefined){
        const productListArr = await ProductModel.find({
            catId: req.query.catId,
        }).populate("category");
        
        productList = productListArr ;
    }

    if(req.query.subCatId != "" && req.query.subCatId !== undefined){
        const productListArr = await ProductModel.find({
            subCatId: req.query.subCatId,
        }).poplate("category");
        
        productList = productListArr ;
    }

    if(req.query.thirdsubCatId != "" && req.query.thirdsubCatId !== undefined){
        const productListArr = await ProductModel.find({
            thirdsubCatId: req.query.thirdsubCatId,
        }).poplate("category");
        
        productList = productListArr ;
    }

    const filteredProducts = productList.filter((product) => {
        if(req.query.minPrice && product.price < parseInt(+req.query.minPrice)) {
            return false ;
    }
    if(req.query.maxPrice && product.price > parseInt(+req.query.maxPrice)) {
        return false ;
    }
    return true;
    });

    return res.status(200).json({
        error:false,
        success: true,
        products: filteredProducts,
        totalPages: 0,
        page: 0,
    });
}


// get all products by rating
export async function getAllProductsByRating(req,res){
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts/ perPage);

        if(page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success:false,
                error:true
            });
        }
        
       let products = [];
       if(req.query.catId !== undefined) {
          
          products = await ProductModel.find({
              rating:req.query.rating,
              catId:req.query.catId,
           })
          .populate("category")
          .skip((page -1) * perPage)
          .limit(perPage)
          .exec();    
       }


       if(req.query.subCatId !== undefined) {
          
        products = await ProductModel.find({
            rating:req.query.rating,
            subCatId:req.query.subCatId,
         })
        .populate("category")
        .skip((page -1) * perPage)
        .limit(perPage)
        .exec();    
     }

     if(req.query.thirdsubCatId !== undefined) {
          
        products = await ProductModel.find({
            rating:req.query.rating,
            thirdsubCatId:req.query.thirdsubCatId,
         })
        .populate("category")
        .skip((page -1) * perPage)
        .limit(perPage)
        .exec();    
     }
         

        if(!products){
             res.status(500).json({
                message:"No Products Found",
                error:true,
                success:false
            });
        }

        return res.status(200).json({
            error:false,
            succes:true,
            products: products,
            totalPages: totalPages,
            page:page
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// get all products count
export async function getAllProductsCount(req,res) {
    try {
        const productsCount = await ProductModel.countDocuments();

        if(!productsCount) {
            res.status(500).json ({
                error:true,
                success:false
            })
        }

        return  res.status(200).json({
            error:false,
            success:true,
            productCount: productsCount
        })
   
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// get all features products
export async function getAllFeaturedProducts(req,res){
    try {

        const products = await ProductModel.find({
            isFeatured: true
        }).populate("category")

        if(!products){
             res.status(500).json({
                message:"No Products Found",
                error:true,
                success:false
            });
        }

        return res.status(200).json({
            error:false,
            succes:true,
            products: products,
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// delete product
export async function deleteProduct(req,res){
    const product = await ProductModel.findById(req.params.id).populate("category");

    if(!product) {
        return res.status(404).json({
            message: "Product not found",
            error: true,
            success: false
        })
    }

    const images = product.images;


    let img= "" ;
    for(img of images) {
        const imgUrl = img ;
        const urlArr = imgUrl.split('/');
        const image = urlArr[urlArr.length - 1];

        const imageName = image.split('.')[0];

        if(imageName) {
            cloudinary.uploader.destroy(imageName, ( error, result) => {
                // console.log(error,result)
            });
        }

    }  


    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

    if(!deletedProduct) {
        res.status(404).jso({
            message: "Product not deleted!",
            success: false,
            error: true
        });
    }

    return res.status(200).json({
        message: "Product deleted successfully",
        success: true,
        error: false
    });
}


// get single product
export async function getProducts(req,res){
    try {
        const product = await ProductModel.findById(req.params.id).populate("category");

        if(!product) {
            return res.status(404).json({
                message: "The product is not found",
                error: true,
                success: false
            });    
        }

        return res.status(200).json({
            error:false,
            success:true,
            product: product
        });

    }   catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }   
}      


// Delete images
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

// Update cproduct
export async function updateProduct(request, response) {
    // console.log(imagesArr);

    try {
        const product = await ProductModel.findByIdAndUpdate(
            request.params.id,
            {
                name: request.body.name,
                description: request.body.description,
                images: request.body.name,
                brand: request.body.brand,
                price: request.body.price,
                oldPrice: request.body.oldPrice,
                catId: request.body.catId,
                catName: request.body.catName,
                subcat: request.body.subcat,
                subCatId: request.body.subCatId,
                category: request.body.category,
                thirdsubCat: request.body.thirdsubCat,
                thirdsubCatId: request.body.thirdsubCatId,
                countInStock: request.body.countInStock,
                rating: request.body.rating,
                isFeatured: request.body.isFeatured,
                productRam: request.body.productRam,
                size: request.body.size,
                productWeight: request.body.productWeight, 
            },
            { new: true }
        );  
        
        if(!product) {
            response.status(404).json({
                message:"The product can not be updated",
                status: false
            });
        }

        imagesArr = [];

        return response.status(200).json({
            message: "The product is updated",
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}
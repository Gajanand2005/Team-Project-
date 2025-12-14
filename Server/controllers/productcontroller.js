import ProductModel from '../models/productmodel.js';
import ProductSizeModel from '../models/productSize.js';
import UserModel from '../models/usermodel.js';
import { v2 as cloudinary } from 'cloudinary';

import fs, { fdatasync } from 'fs';
import { console } from 'inspector';

cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true, 
});


//image upload
export async function uploadImages(request, response) {
    try {
        const imagesArr = [];

        // Normalize multer payload: multer.array('images') sets req.files to an array
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
                message: "No images uploaded",
                error: true,
                success: false,
            });
        }

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        const uploadPromises = files.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(
                    file.path,
                    options,
                    (error, result) => {
                        if (error) {
                            try {
                                fs.unlinkSync(file.path);
                            } catch {}
                            return reject(error);
                        } else {
                            if (result && result.secure_url) {
                                imagesArr.push(result.secure_url);
                            } else {
                                console.error("Upload failed: no secure_url", result);
                            }
                            // Delete from local uploads folder
                            try {
                                fs.unlinkSync(file.path);
                            } catch (unlinkError) {
                                console.error("Error deleting file:", unlinkError);
                            }
                            resolve();
                        }
                    }
                );
            });
        });

        await Promise.all(uploadPromises);

        if (!imagesArr.length) {
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


// create product
export async function createProduct(req, res) {
    try {
           let product = new ProductModel({
                name: req.body.name,
                description: req.body.description,
                sizeChart: req.body.sizeChart,
                images: req.body.images,
                brand: req.body.brand,
                price: req.body.price,
                oldPrice: req.body.oldPrice,
                catName: req.body.catName,
                catId: req.body.catId,
                category: req.body.category,
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
                successs: false,
                message: "Product Not Created"
               });
           }

           res.status(200).json({
            message: "Product Created Successfully",
            error:false,
            success:true,
            product:product
           })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            successs: false
        })
    }
}
        

// get all products
export async function getAllProducts(req,res){
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts/ perPage);

        if(totalPages > 0 && page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                successs:false,
                error:true
            });
        }

        const products = await ProductModel.find().populate("category")
        .skip((page -1) * perPage)
        .limit(perPage)
        .exec();

        res.set('Cache-Control', 'no-store');
        return res.status(200).json({
            error:false,
            success:true,
            products: products,
            totalPages: totalPages,
            page:page
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            successs: false
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
                successs:false,
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
                successs:false
            });
        }

        return res.status(200).json({
            error:false,
            success:true,
            products: products,
            totalPages: totalPages,
            page:page
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            successs: false
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
                successs:false,
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
                successs:false
            });
        }

        return res.status(200).json({
            error:false,
            success:true,
            products: products,
            totalPages: totalPages,
            page:page
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            successs: false
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
                successs:false,
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
                successs:false
            });
        }

        return res.status(200).json({
            error:false,
            success:true,
            products: products,
            totalPages: totalPages,
            page:page
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            successs: false
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
                successs:false,
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
                successs:false
            });
        }

        return res.status(200).json({
            error:false,
            success:true,
            products: products,
            totalPages: totalPages,
            page:page
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            successs: false
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
                successs:false,
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
                successs:false
            });
        }

        return res.status(200).json({
            error:false,
            success:true,
            products: products,
            totalPages: totalPages,
            page:page
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            successs: false
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
                successs:false,
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
                successs:false
            });
        }

        return res.status(200).json({
            error:false,
            success:true,
            products: products,
            totalPages: totalPages,
            page:page
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            successs: false
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
        }).populate("category");
        
        productList = productListArr ;
    }

    if(req.query.thirdsubCatId != "" && req.query.thirdsubCatId !== undefined){
        const productListArr = await ProductModel.find({
            thirdsubCatId: req.query.thirdsubCatId,
        }).populate("category");
        
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
        successs: true,
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
                successs:false,
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
                successs:false
            });
        }

        return res.status(200).json({
            error:false,
            success:true,
            products: products,
            totalPages: totalPages,
            page:page
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            successs: false
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
                successs:false
            })
        }

        return  res.status(200).json({
            error:false,
            successs:true,
            productCount: productsCount
        })
   
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            successs: false
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
                successs:false
            });
        }

        return res.status(200).json({
            error:false,
            success:true,
            products: products,
           })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            successs: false
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
            successs: false
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
        res.status(404).json({
            message: "Product not deleted!",
            successs: false,
            error: true
        });
    }

    return res.status(200).json({
        message: "Product deleted successsfully",
        successs: true,
        error: false
    });
}

// delete multiple product
export async function deleteMultipleProduct(req,res){
    const {ids} = req.body;
    if(!ids || !Array.isArray(ids)){
        return res.status(400).json({
            error:true,
            success: false,
            message : "invalid input"
        });
    }
    for(let i=0; i<ids?.length; i++){
        const product = await ProductModel.findById(ids[i]);
        const images = product.images;
        let img ="";
        for(img of images){
            const imgUrl = img;
            const urlArr = imgUrl.split("/")           ;
            const image = urlArr[urlArr.length - 1];

            const imageName = image.split(".")[0];

            if(imageName){
                cloudinary.uploader.destroy(imageName,(error,result)=>{

                })
            }

        }
    }

    try {

        await ProductModel.deleteMany({_id:{$in : ids}});
        return res.status(200).json({
            message: "Product delete successfully",
            error: false,
            success: true
        })        

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// get single product
export async function getProducts(req,res){
    try {
        const product = await ProductModel.findById(req.params.id).populate("category");

        if(!product) {
            return res.status(404).json({
                message: "The product is not found",
                error: true,
                successs: false
            });
        }

        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        return res.status(200).json({
            error:false,
            successs:true,
            product: product
        });

    }   catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            successs: false
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
    try {
        const product = await ProductModel.findByIdAndUpdate(
            request.params.id,
            {
                name: request.body.name,
                description: request.body.description,
                sizeChart: request.body.sizeChart,
                images: request.body.images,
                brand: request.body.brand,
                price: request.body.price,
                oldPrice: request.body.oldPrice,
                catId: request.body.catId,
                catName: request.body.catName,
                subCat: request.body.subCat,
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

        return response.status(200).json({
            message: "The product is updated",
            error: false,
            successs: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            successs: false
        })
    }

}


//createProductSize
export async function createProductSize(request, response) {
    try {
        let productSize = new ProductSizeModel({
            name:request.body.name
        })
        productSize = await productSize.save();

        if(!productSize){
            response.status(500).json({
                error: true,
                success: false,
                message: "Product size Not Created"
            })
        }

        return response.status(200).json({
            message: "Product size Created successfully",
            error: false,
            success: true,
            product: productSize
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
             success: false
        })
    }
}

//deleteProductSize
export async function deleteProductSize(request,response) {
    const productSize = await ProductSizeModel.findById(request.params.id);

    if(!productSize){
        return response.status(404).json({
            message: "Item not found",
            error: true,
            success: false
        })
    }

    const deleteProductSize = await ProductSizeModel.findByIdAndDelete(request.params.id);
    if(!deleteProductSize){
        response.status(404).json({
            message: "item not deleted!",
            success: false,
            error: true
        })
    }
    return response.status(200).json({
        success: true,
        error: false,
         message : "Product size Deleted !"
    })

}

//deleteMultipleProductSize
export async function deleteMultipleProductSize(request,response) {
    const {ids} = request.body;
    if(!ids || !Array.isArray(ids)){
        return res.status(400).json({
            error: true,
            success: false,
             message: "Invalid input"
        })
    }
    try {
        await ProductSizeModel.deleteMany({_id: {$in: ids}});
        return response.status(200).json({
            message: "Product size delete successfully",
            error: false,
             success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
//updateProductSize
export async function updateProductSize(request,response) {
try {
    const productSize = await ProductSizeModel.findByIdAndUpdate(
        request.params.id,
        {
            name: request.body.name,
        },{
            new: true
        }
    );
     if(!productSize){
        return response.status(404).json({
            message:"the product size can not be updated!",
            error: true,
            success: false,
        });
     }
       return response.status(200).json({
        message: "The product size is updated",
        error: false,
         success: true
       })
} catch (error) {
    return response.status(500).json({
        message: error.message || error,
        error: true,
        success: false
    })
}
}
//getProductSize
export async function getProductSize(request,response) {
    try {
        const productSize = await ProductSizeModel.find();

        if(!productSize){
            return response.status(500).json({
                error: true,
                 success: false
            })
        }
        response.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        response.set('Pragma', 'no-cache');
        response.set('Expires', '0');
        response.set('Last-Modified', new Date().toUTCString());
        return response.status(200).json({
            error: false,
             success: true,
             data: productSize
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//getProductSizeById
export async function getProductSizeById(request,response) {
    try {
        const productSize = await ProductSizeModel.findById(request.params.id);
        if(!productSize){
            return response.status(500).json({
                error: true,
                success: false
            })
        }

        return response.status(200).json({
            error: false,
            success: true,
            data: productSize
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
//filters 
export async function filters(request, response) {
  const { catId, subCatId, thirdsubCatId, minPrice, maxPrice, page = 1, limit = 10 } = request.body;

  const filters = {};

  if (catId?.length) filters.catId = { $in: catId };
  if (subCatId?.length) filters.subCatId = { $in: subCatId };
  if (thirdsubCatId?.length) filters.thirdsubCatId = { $in: thirdsubCatId };

  if (minPrice !== undefined || maxPrice !== undefined) {
    filters.price = {};
    if (minPrice !== undefined) filters.price.$gte = Number(minPrice);
    if (maxPrice !== undefined) filters.price.$lte = Number(maxPrice);
  }

  try {
    const products = await ProductModel.find(filters)
      .populate("category")
      .skip((page - 1) * limit).limit(parseInt(limit));

    const total = await ProductModel.countDocuments(filters);

    return response.status(200).json({
      error: false,
      success: true,
      products,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}



//sorted by Ai 
const sortProducts = (products, sortBy, order) => {
  return products.sort((a, b) => {
    if (sortBy === 'name') {
      return order === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

   if (sortBy === 'price') {
  const priceA = Number(a.price);
  const priceB = Number(b.price);

  return order === 'asc'
    ? priceA - priceB
    : priceB - priceA;
}


    return 0; // default
  });
};

export async function sortBy(request, response) {
  const { products, sortBy, order } = request.body;
  
  const sortedItems = sortProducts([...products?.products], sortBy, order);

  return response.status(200).json({
    error: false,
    success: true,
    products: sortedItems,
    page: 0,
    totalPages: 0
  });
}



// export async function searchProductController(request,response) { 
//     try{
         
//             const {query,page , limit }=request.body;

//         if(!query){
//             return response.status(400).json({
//                 error:true,
//                 success:false,
//                 message:"Query is required"
//             })
//         }

//                 const products = await ProductModel.find({
//                   $or :[
//                     {name:{$regex : query,$options: "i"}},
//                     {brand:{$regex : query,$options: "i"}},
//                     {catName:{$regex : query,$options: "i"}},
//                     {subCat:{$regex : query,$options: "i"}},
//                     {thirdsubCat:{$regex : query,$options: "i"}},
//                   ]  
//                 }).populate("category").skip((page - 1) * limit).limit(parseInt(limit));
                    
//                 const total = await products?.length


//                 return response.status(200).json({
//                     error:false,
//                     success:true,
//                     product:products,
//                     total,
//                     page: parseInt(page),
//                    totalPages: Math.ceil(total / limit),
//                 })


//     }catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// }


export async function searchProductController(request, response) {
  try {
    const { query, page = 1, limit = 10 } = request.body;

    if (!query) {
      return response.status(400).json({
        error: true,
        success: false,
        message: "Query is required",
      });
    }

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Total Count (IMPORTANT)
    const total = await ProductModel.countDocuments({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { catName: { $regex: query, $options: "i" } },
        { subCat: { $regex: query, $options: "i" } },
        { thirdsubCat: { $regex: query, $options: "i" } },
      ],
    });

    // Products for Current Page
    const products = await ProductModel.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { catName: { $regex: query, $options: "i" } },
        { subCat: { $regex: query, $options: "i" } },
        { thirdsubCat: { $regex: query, $options: "i" } },
      ],
    })
      .populate("category")
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}













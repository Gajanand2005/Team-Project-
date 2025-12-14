import HomeSliderModel from "../models/homeSlidermodel.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

//image upload
// export async function uploadImages(request, response) {
//   try {
//     const imagesArr = [];

//     if (!request.files || !request.files.images || !Array.isArray(request.files.images) || request.files.images.length === 0) {
//       return response.status(400).json({
//         message: "No images uploaded",
//         error: true,
//         success: false,
//       });
//     }

//     const images = request.files.images;
//     const options = {
//       use_filename: true,
//       unique_filename: false,
//       overwrite: false,
//     };

//     const uploadPromises = images.map((file) => {
//       return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(file.path, options, (error, result) => {
//           if (error) {
//             reject(error);
//           } else {
//             if (result && result.secure_url) {
//               imagesArr.push(result.secure_url);
//             } else {
//               console.error("Upload failed: no secure_url", result);
//             }
//             // Delete from local uploads folder
//             try {
//               fs.unlinkSync(file.path);
//             } catch (unlinkError) {
//               console.error("Error deleting file:", unlinkError);
//             }
//             resolve();
//           }
//         });
//       });
//     });

//     await Promise.all(uploadPromises);

//     return response.status(200).json({
//       images: imagesArr,
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// }
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


export async function addHomeSlide(request, response) {
  try {
    if (!request.body.images || !Array.isArray(request.body.images) || request.body.images.length === 0) {
      return response.status(400).json({ message: "No images provided" });
    }

    let slide = new HomeSliderModel({
      images: request.body.images,
    });

    if (!slide) {
      return response.status(500).json({
        message: "slide not created",
        error: true,
        success: false,
      });
    }

    slide = await slide.save();

    return response.status(200).json({
      message: "Slide created",
      error: false,
      success: true,
      slide: slide,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getHomeSlides(request, response) {
  try {
    // Remove conditional request headers to force fresh response
    delete request.headers['if-none-match'];
    delete request.headers['if-modified-since'];
    
    const slides = await HomeSliderModel.find();
    
    // Ensure no caching and prevent 304 responses
    response.set('Cache-Control', 'no-cache, no-store, must-revalidate, private');
    response.set('Pragma', 'no-cache');
    response.set('Expires', '0');
    response.removeHeader('ETag');
    response.removeHeader('Last-Modified');
    
    // Force 200 status
    return response.status(200).json({
      error: false,
      success: true,
      data: slides || [],
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getSlide(request, response) {
  try {
    const slide = await HomeSliderModel.findById(request.params.id);

    if (!slide) {
      return response.status(404).json({
        message: "The Slide with the given ID was not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      slide: slide,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteSlide(request, response) {
  const slide = await HomeSliderModel.findById(request.params.id);
  const images = slide.images;
  let img = "";
  for (img of images) {
    const imgUrl = img;
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];

    const imageName = image.split(".")[0];

    if (imageName) {
      cloudinary.uploader.destroy(imageName, (error, result) => {});
    }
  }

  const deleteSlide = await HomeSliderModel.findByIdAndDelete(
    request.params.id
  );
  if (!deleteSlide) {
    return response.status(404).json({
      message: "Slide not found!",
      success: false,
      error: true,
    });
  }

  return response.status(200).json({
    success: true,
    error: false,
    message: "Slide Deleted!",
  });
}

export async function updateSlide(request, response) {
  try {
    if (!request.body.images || !Array.isArray(request.body.images) || request.body.images.length === 0) {
      return response.status(400).json({ message: "No images provided" });
    }

    const slide = await HomeSliderModel.findByIdAndUpdate(
      request.params.id,
      {
        images: request.body.images,
      },
      { new: true }
    );
    if (!slide) {
      return response.status(404).json({
        message: "slide cannot be updated!",
        success: false,
        error: true,
      });
    }

    response.status(200).json({
      error: false,
      success: true,
      slide: slide,
      message: "slide update successfully",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteMultipleSlides(request, response) {
  const { ids } = request.body;

  if (!ids || !Array.isArray(ids)) {
    return response.status(400).json({
      error: true,
      success: false,
      message: "Invalid input",
    });
  }
  for (let i = 0; i < ids?.length; i++) {
    const product = await HomeSliderModel.findById(ids[i]);
    const images = product.images;

    let img = "";
    for (img of images) {
      const imgUrl = img;
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];

      const imageName = image.split(".")[0];
      if (imageName) {
        cloudinary.uploader.destroy(imageName, (error, result) => {});
      }
    }
  }
  try {
    await HomeSliderModel.deleteMany({_id: {$in: ids}});
    return response.status(200).json({
        message: "Slides delete successfully",
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


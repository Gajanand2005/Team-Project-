import React, { useEffect } from 'react'
import UploadBox from '../../Components/UploadBox/Index'
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Button, CircularProgress } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { deleteImages, postData } from '../../../Utils/Api';
import { useNavigate } from "react-router-dom";

const AddHomeSlide = () => {

  const [formFields, setFormFields]= useState({


    images : [],
  })
 

  const [previews, setPreviews]= useState([]);
    const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);

  const history = useNavigate();



   const setPreviewsFun = (previewsArr) => {
      setPreviews(previewsArr);
      setFormFields(prev => ({ ...prev, images: previewsArr }));
    };

    const removeImg = async (images, index) => {
      try {
        await deleteImages(`/api/homeSlides/deleteImage?img=${images}`);
        const updatedPreviews = previews.filter((_, i) => i !== index);
        setPreviews(updatedPreviews);
        setFormFields(prev => ({ ...prev, images: updatedPreviews }));
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    };

    const handleSubmit = (e) => {
       e.preventDefault();
       setIsLoading(true);

       if (previews?.length === 0) {
         context.alertBox("error", "please enter Banner  image ");
         setIsLoading(false);
         return false;
       }
       postData("/api/homeSlides/add", formFields).then((res) => {
         setIsLoading(false);
         context.setIsOpenFullScreenPanel({
           open: false,
         });
         history("/homeSlider/list")
       });
     };
  

  return (
    <>
     <section className="p-5 bg-gray-50 mt-3 ">
        <form className="form py-1  p-1 md:p-8 md:py-1 "  onSubmit={handleSubmit}>
          <div className="scroll max-h-[72vh]">
              <div className="grid grid-cols-2 md:grid-cols-7 gap-2 ">
              {previews?.length !== 0 &&
                previews?.map((images, index) => {
                  return (
                    <div className="uploadBoxWrapper w-[100px] mr-3   relative" key={index}>
                      <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[50px] flex items-center justify-center z-50 cursor-pointer">
                        <IoClose
                          className="text-white text-[17px]"
                          onClick={() => removeImg(images, index)}
                        />
                      </span>

                      <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.4)] h-[150px] w-[180px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                        <LazyLoadImage
                          alt={"image"}
                          effect="blur"
                          wrapperProps={{
                            // If you need to, you can tweak the effect transition using the wrapper style.
                            style: { transitionDelay: "1s" },
                          }}
                          className="w-full h-full object-cover"
                          src={images}
                        />
                      </div>
                    </div>
                  );
                })}

              <UploadBox
                multiple={true}
                name="images"
                url="/api/homeSlides/uploadImages"
                setPreviews={setPreviewsFun}
              />
            </div>
          </div>

           <hr />
         <br />
      <Button
                  type="submit"
                  className="!bg-blue-600 !text-black btn-lg w-[250px] flex gap-4"
                >
                  {isLoading === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    <>
                      <FaCloudUploadAlt className="text-[25px]" />
                      Publish and View
                    </>
                  )}
                </Button>

          </form>
          </section>
    </>
  )
}

export default AddHomeSlide



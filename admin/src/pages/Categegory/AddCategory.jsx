import React from 'react'
import UploadBox from '../../Components/UploadBox/Index'
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";

const AddCategory = () => {
  return (
    <>
     <section className="p-5 bg-gray-50 mt-3 ">
        <form className="form py-3 p-8 ">
          <div className="scroll max-h-72vh] ">
            <div className="grid grid-cols-1 mb-3 ">
            <div className="col w-[25%]">
              <h3 className="text-[14px] font-[500] !mb-2">
            Categegory Name
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
              />
            </div>
          </div>
          <br />
           <h3 className="text-[18px] font-[500] !mb-2">
            Categegory Image
              </h3>
              <br />
              <div className="grid grid-cols-7 gap-20 ">
              <div className="uploadBoxWrapper relative">  
                <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[75px] flex items-center justify-center z-50 cursor-pointer"><IoClose className="text-white text-[17px]" /></span>   
              <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.4)] h-[150px] w-[180px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                <LazyLoadImage
                  alt={"image"}
                  effect="blur"
                  wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                    style: { transitionDelay: "1s" },
                  }}
                  className="w-full h-full object-cover"
                  src="https://ecme-react.themenate.net/img/products/product-6.jpg"
                />
              </div>
              </div>

              

              <UploadBox multiple={true} />
            </div>
          </div>

           <hr />
         <br />
        <Button type="button"  className="btn-blue btn-lg w-[250px] flex gap-4"><FaCloudUploadAlt className="text-[25px]" />Publish and View</Button>

          </form>
          </section>
    </>
  )
}

export default AddCategory

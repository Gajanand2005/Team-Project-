import React, { useRef, useState } from 'react'
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchDataFromApi } from '../../../Utils/Api';
import { MdBrandingWatermark, MdFilterVintage, MdOutlineFilterVintage } from 'react-icons/md';
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsPatchCheckFill } from 'react-icons/bs';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';

const ProductDetails = () => {
      const [slideIndex, setSlideIndex] = useState(0);
      const [product, setProduct] = useState(0);



      const zoomSliderBig = useRef();
      const zoomSliderSml = useRef();


      const {id} =useParams();
       const goto = (index) =>{
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  }


useEffect(() => {
  
  fetchDataFromApi(`/api/product/${id}`).then((res)=>{
    if(res?.error === false){
          console.log("Product Data:", res?.product);
      console.log("Product Sizes:", res?.product?.size);
      setProduct(res?.product)
    }
    


  })

}, [])


const sizeMap = {
  "10": "XS",
  "20": "S",
  "30": "M",
  "40": "L",
  "50": "XL",
  "60": "2XL",
  "70": "3XL",
  "80": "4XL",
  "90": "5XL",
};


  return (
<>
  <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Products Detals </h2>
        
        </div>

{
  product._id!== "" && product?._id !== undefined && product?._id !== null ? 
  <>
  <div className="productDetails flex gap-8 ">
  <div className="w-[40%]">
{
  product?.images?.length !== 0 && <div className="flex gap-3">
        <div className="slider w-[15%] ">
          <Swiper
          ref={zoomSliderSml}
            direction={"vertical"}
            slidesPerView={4}
            spaceBetween={10}
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="zoomProductSliderThumbs h-[500px] overflow-hidden"
          >

              {
                 product?.images?.map((item,index)=>{
                  return(
               <SwiperSlide key={index}>
              <div className={`item !mb-2 rounded-md overflow-hidden cursor-pointer group  ${slideIndex===index ? 'opacity-30' : 'opacity-50'}`} onClick={()=> goto(index)}>
                <img
                  src={item}
                  className="w-full transition-all group-hover:scale-105"
                  alt=""
                />
              </div>
            </SwiperSlide>
                  )
                 })
              }
          
          </Swiper>
        </div>

        <div className="zoomContainer w-[85%] h-[400px] overflow-hidden rounded-md">
          <Swiper
          ref={zoomSliderBig}
            slidesPerView={1}
            spaceBetween={0}

            className=""
          >
            
  {
                 product?.images?.map((item,index)=>{
                  return(
                         <SwiperSlide key={index}>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src={item}
              />
            </SwiperSlide>
                  )
                 })
              }
           
         
          </Swiper>
        </div>
      </div>
}
    
  </div>

  <div className="w-[60%]">
<h1 className='text-[25px] font-[500] mb-4 '>{product?.name}</h1>

<div className="flex items-center py-2 " >
  <span  className='w-[20%] font-[500] flex items-center gap-1 text-[14px]  '> <MdBrandingWatermark className='opacity-65'/>    Brand  : </span>
  <span> {product?.brand} </span>
</div>
<div className="flex items-center py-2 " >
  <span  className='w-[20%] font-[500] flex items-center gap-1  text-[14px]'> <BiSolidCategoryAlt className='opacity-65'/>    Category  : </span>
  <span> {product?.catName} </span>
</div>
{product?.size?.length > 0 && (
  <div className="flex items-center py-1">
    <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
      <MdOutlineFilterVintage className="opacity-65" /> Size :
    </span>

    <div className="flex items-center gap-2">
      {product?.size?.map((size, index) => (
        <span
          key={index}
          className="inline-block p-1 shadow-sm bg-[#fff] text-[12px] font-[500]"
        >
          {sizeMap[size] || size}
        </span>
      ))}
    </div>
  </div>
)}


<div className="flex items-center py-2">
  <span className="w-[20%] font-[500] flex items-center gap-2">
    <BsPatchCheckFill className="opacity-65" /> Published :
  </span>
  <span>
    {product?.dateCreated
      ? new Date(product.dateCreated).toLocaleDateString("en-GB")
      : "N/A"}
  </span>
</div>
<br />
<br />
<h2 className='text-[20px] font-[500] mb-3 '>Product Description</h2>
{
  product?.description  && <p className='font-size-[14px]'>{product?.description}</p>
}
 </div>
</div>
<h2 className='text-[18px] font-500'> Customer Reviews </h2>

<div className="reviewwrap mt-3 ">
  <div className="review w-full h-auto p-4 mb-2 bg-white shadow-md  flex itemns-center justify-between rounded-sm ">
<div className="flex items-center gap-8 ">
  <div className="img w-[85px] rounded-full overflow-hidden  ">
    <img src="https://res.cloudinary.com/dot11b5tl/image/upload/v1762413310/1762413308172-pic.jpg" alt="" className='w-full h-full object-cover px-2 ' />
     </div>

<div className="info px-2  w-[80%]">
<div className="flex items-center justify-between">
    <h4 className='text-[16px] font-[500]'>Gagan Rajput </h4>
   <Rating name="read-only" value={5} readOnly  size='small'/>
</div>
<span className='text-[14px] '>   07/11/2025</span>
<p className='13px mt-2 '> Lorem ipsum dolor sit amet consectetur adipisicing elit. In assumenda totam ex autem repudiandae nobis doloribus minus. Temporibus veritatis iure nihil, iusto rerum quia sapiente esse, laudantium p</p>
</div>
</div>
  </div>
</div>


<div className="reviewwrap mt-3 ">
  <div className="review w-full h-auto p-4 mb-2 bg-white shadow-md  flex itemns-center justify-between rounded-sm ">
<div className="flex items-center gap-8 ">
  <div className="img w-[85px] rounded-full overflow-hidden  ">
    <img src="https://res.cloudinary.com/dot11b5tl/image/upload/v1762413310/1762413308172-pic.jpg" alt="" className='w-full h-full object-cover px-2 ' />
     </div>

<div className="info px-2  w-[80%]">
<div className="flex items-center justify-between">
    <h4 className='text-[16px] font-[500]'>Gagan Rajput </h4>
   <Rating name="read-only" value={5} readOnly  size='small'/>
</div>
<span className='text-[14px] '>   07/11/2025</span>
<p className='13px mt-2 '> Lorem ipsum dolor sit amet consectetur adipisicing elit. In assumenda totam ex autem repudiandae nobis doloribus minus. Temporibus veritatis iure nihil, iusto rerum quia sapiente esse, laudantium p</p>
</div>
</div>
  </div>
</div>
</>
: 
 <div className="flex items-center justify-center h-96 ">
              <CircularProgress color="inherit" />
        </div>
        

}

       
  













</>
  )
}

export default ProductDetails


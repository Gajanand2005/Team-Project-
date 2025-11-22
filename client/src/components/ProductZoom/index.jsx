import React, { useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";


const ProductZoom = (props) => {

  const [slideIndex, setSlideIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!props?.images || props.images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex gap-3 h-full">
        <div className="slider w-[15%] ">
          <Swiper
            onSwiper={setThumbsSwiper}
            direction={"vertical"}
            slidesPerView={4}
            spaceBetween={10}
            modules={[Thumbs]}
            className="zoomProductSliderThumbs h-[70vh] overflow-hidden"
          >
            {
              props?.images?.map((item,index)=>{
                  return(
                    <SwiperSlide key={index}>
              <div className={`item !mb-2 rounded-md overflow-hidden cursor-pointer group  ${slideIndex===index ? 'opacity-100' : 'opacity-50'}`}>
                <img
                      src={item}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                />
              </div>

            </SwiperSlide>
                  )
              })
            }

          </Swiper>
        </div>

        <div className="zoomContainer w-[85%] h-full overflow-hidden rounded-md">
          <Swiper
            thumbs={{ swiper: thumbsSwiper }}
            slidesPerView={1}
            spaceBetween={0}
            modules={[Thumbs]}
            className="h-full"
            onSlideChange={(swiper) => setSlideIndex(swiper.activeIndex)}
          >
            {
              props?.images?.map((item,index)=>{
                  return(
                    <SwiperSlide key={index} >
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1.5}
                src={item}
                alt={`Product image ${index + 1}`}
                className="w-full h-full"
              />
            </SwiperSlide>
                  )
              })
            }



          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductZoom;

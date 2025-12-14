import React, { useContext, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { MyContext } from "../../App";


const ProductZoom = (props) => {

  const [slideIndex, setSlideIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const context = useContext(MyContext)

  if (!props?.images || props.images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-3 h-full">
        <div className="slider w-full lg:w-[15%] order-2 lg:order-1 ">
          <Swiper
            onSwiper={setThumbsSwiper}
            direction={context?.windowWidth < 992 ? "horizontal":"vertical" }
            slidesPerView={4}
            spaceBetween={10}
            modules={[Thumbs]}
            className="zoomProductSliderThumbs h-[120px] md:h-[200px] lg:h-[70vh]"

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
              })}

          </Swiper>
        </div>

        <div className="zoomContainer w-full lg:w-[85%] min-h-[250px] lg:h-auto overflow-hidden rounded-md order-1 lg:order-2 ">
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



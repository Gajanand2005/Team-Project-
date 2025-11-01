import React, { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Autoplay } from "swiper/modules";
const ProductZoom = () => {

  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const goto = (index) =>{
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  }

  return (
    <>
      <div className="flex gap-3">
        <div className="slider w-[15%] ">
          <Swiper
          ref={zoomSliderSml}
            direction={"vertical"}
            slidesPerView={4}
            spaceBetween={10}
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="zoomProductSliderThumbs h-[70vh] overflow-hidden"
          >
            <SwiperSlide>
              <div className={`item !mb-2 rounded-md overflow-hidden cursor-pointer group  ${slideIndex===0 ? 'opacity-30' : 'opacity-50'}`} onClick={()=> goto(0)}>
                <img
                  src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg"
                  className="w-full transition-all group-hover:scale-105"
                  alt=""
                />
              </div>
              <div className={`item !mb-2 rounded-md overflow-hidden cursor-pointer group  ${slideIndex===1 ? 'opacity-30' : 'opacity-50'}`}onClick={()=> goto(1)}>
                <img
                  src="https://api.spicezgold.com/download/file_1734529297929_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-0-202307260626.jpg"
                  className="w-full transition-all group-hover:scale-105"
                  alt=""
                />
              </div>
              <div className={`item !mb-2 rounded-md overflow-hidden cursor-pointer group  ${slideIndex===2 ? 'opacity-30' : 'opacity-50'}`}onClick={()=> goto(2)}>
                <img
                  src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-2-202307260626.jpg"
                  className="w-full transition-all group-hover:scale-105"
                  alt=""
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="zoomContainer w-[85%] overflow-hidden rounded-md">
          <Swiper
          ref={zoomSliderBig}
            slidesPerView={1}
            spaceBetween={0}

            className=""
          >
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src={
                  "https://api.spicezgold.com/download/file_1734529297929_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-0-202307260626.jpg"
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src={
                  "https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-2-202307260626.jpg"
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src={
                  "https://api.spicezgold.com/download/file_1734529297929_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-0-202307260626.jpg"
                }
              />
            </SwiperSlide>
            
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductZoom;

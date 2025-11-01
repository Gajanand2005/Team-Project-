import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const HomeSlider = () => {
  return (
    <div className="homeSlider">
      <div className="container">
        <Swiper
          spaceBetween={10}
          breakpoints={{
            320: {
              spaceBetween: 10,
            },
            640: {
              spaceBetween: 10,
            },
            1024: {
              spaceBetween: 10,
            },
          }}
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="sliderHome"
        >
          <SwiperSlide key="slide-1">
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src='https://serviceapi.spicezgold.com/download/1759938778050_30745.jpg'
                alt="Banner Slide"
                className="w-[100%] "
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key="slide-2">
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src='https://serviceapi.spicezgold.com/download/1759938751802_30744.jpg'
                alt="Banner Slide"
                className="w-[100%] "
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key="slide-3">
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src='https://serviceapi.spicezgold.com/download/1751685130717_NewProject(8).jpg'
                alt="Banner Slide"
                className="w-[100%]"
              />
            </div>
          </SwiperSlide>
           <SwiperSlide key="slide-4">
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src='https://serviceapi.spicezgold.com/download/1748955932914_NewProject(1).jpg'
                alt="Banner Slide"
                className="w-[100%]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key="slide-5">
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src='https://serviceapi.spicezgold.com/download/1751685130717_NewProject(8).jpg'
                alt="Banner Slide"
                className="w-[100%]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key="slide-6">
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src='https://serviceapi.spicezgold.com/download/1748955932914_NewProject(1).jpg'
                alt="Banner Slide"
                className="w-[100%]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key="slide-7">
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src='https://serviceapi.spicezgold.com/download/1751685130717_NewProject(8).jpg'
                alt="Banner Slide"
                className="w-[100%]"
              />
            </div>
          </SwiperSlide>
           <SwiperSlide key="slide-8">
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src='https://serviceapi.spicezgold.com/download/1751685130717_NewProject(8).jpg'
                alt="Banner Slide"
                className="w-[100%]"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;

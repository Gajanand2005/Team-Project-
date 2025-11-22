import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const HomeSlider = (props) => {
  return (
    <div className="homeSlider w-full bg-gray-50 py-6">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6">
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          grabCursor={true}
          centeredSlides={false}
          slidesPerView={1}
          spaceBetween={20}

          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
          }}
          className="sliderHome"
        >
          {
            props?.data?.data?.length !== 0 && props?.data?.map((item, index) => {
              return item.images.map((image, imgIndex) => (
                <SwiperSlide key={`${index}-${imgIndex}`}>
                  <div className="item rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 ease-in-out">
                    <img
                      src={image}
                      alt={`Banner ${index + 1}`}
                      className="w-full h-[300px] xs:h-[300px] sm:h-[350px] md:h-[300px] lg:h-[350px] xl:h-[400px] object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))
            })
          }

        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;

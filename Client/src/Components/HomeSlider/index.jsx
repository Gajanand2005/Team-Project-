import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { MyContext } from "../../App";
const HomeSlider = (props) => {

  const context = useContext(MyContext)

  return (
    <div className="homeSlider w-full bg-gray-50 py-4 md:py-6 relative z-[99]">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6">
        <Swiper
          modules={[Navigation, Autoplay]}
          // navigation={context?.windowWidth < 992 ? false : true}
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
            768: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
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
                      className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] object-cover"
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



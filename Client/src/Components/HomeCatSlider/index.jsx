import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const HomeCatSlider = (props) => {
  return (
    <div className="HomeCatSlider py-10 bg-[#faf7f7]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          grabCursor={true}
          slidesPerView={2}
          spaceBetween={50}
          breakpoints={{
            360: { slidesPerView: 3, spaceBetween: 10 },
            480: { slidesPerView: 4, spaceBetween: 14 },
            640: { slidesPerView: 5, spaceBetween: 16 },
            768: { slidesPerView: 6, spaceBetween: 18 },
            1024: { slidesPerView: 7, spaceBetween: 20 },
            1280: { slidesPerView: 8, spaceBetween: 22 },
            1536: { slidesPerView: 9, spaceBetween: 24 },
          }}
          className="mySwiper"
        >
          {props?.data?.map((cat, index) => (
            <SwiperSlide key={index}>
              {/* 🔥 IMPORTANT: Category link fixed */}
                <Link
                to={`/productListing?catId=${cat?._id}`}
                className="block"
              >
                <div className="item text-center flex flex-col items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <img
                      src={cat?.images?.[0]}
                      alt={cat?.name}
                      className="w-[80px] h-[80px] xs:w-[90px] xs:h-[90px] sm:w-[100px] sm:h-[100px] md:w-[110px] md:h-[110px] lg:w-[115px] lg:h-[115px] 
                      rounded-full object-cover border-[3px] border-gray-200 shadow-sm hover:scale-105 hover:shadow-md transition-all duration-300"
                    />
                  </div>
                  <h3 className="text-[13px] sm:text-[14px] md:text-[15px] font-medium mt-3 text-gray-700 whitespace-nowrap">
                    {cat?.name}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;



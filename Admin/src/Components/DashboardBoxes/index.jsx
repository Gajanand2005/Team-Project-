import React, { useContext } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode'
import { Navigation,FreeMode } from 'swiper/modules';
import { MyContext } from "../../App";


const DashboardBoxes = ({ data }) => {

const context = useContext(MyContext);

  const boxesData = data || defaultData;

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={context?.windowWidth < 992 ? false :true }
        modules={[Navigation ,FreeMode]}
        freeMode={true}
        breakpoints={{
  250: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  650: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  992: {
    slidesPerView: 4,
    spaceBetween: 10,
  },
}}
        className="dashboardboxslider"
      >
        {boxesData.map((item, index) => {
          const Icon1 = item.icon1;
          const Icon2 = item.icon2;
          return (
            <SwiperSlide key={index}>
              <div className="box p-5 cursor-pointer hover:bg-[#f1f1f2] shadow-inner rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 bg-white">
                <Icon1 style={{ fontSize: item.size1, color: item.color }} />
                <div className="info w-[70%]">
                  <h3>{item.title}</h3>
                  <span className="text-[23px]"><b>{item.value}</b></span>
                </div>
                <Icon2 style={{ fontSize: item.size2, color: item.color }} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default DashboardBoxes;


import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { AiTwotoneGift } from "react-icons/ai";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaChartPie, FaBoxOpen } from "react-icons/fa6";
import { BsBarChartFill } from "react-icons/bs";
import { RiBarChartFill } from "react-icons/ri";
import { HiChartBar } from "react-icons/hi2";
import { PiPiggyBankDuotone } from "react-icons/pi";

const DashboardBoxes = ({ data }) => {
  const defaultData = [
    {
      title: "New Orders",
      value: "1,398",
      icon1: AiTwotoneGift,
      icon2: IoStatsChartSharp,
      color: "#ff0000",
      size1: "40px",
      size2: "40px"
    },
    {
      title: "Sales",
      value: "₹58,384",
      icon1: FaChartPie,
      icon2: BsBarChartFill,
      color: "#0000ff",
      size1: "40px",
      size2: "40px"
    },
    {
      title: "Revenue",
      value: "₹12,209",
      icon1: PiPiggyBankDuotone,
      icon2: RiBarChartFill,
      color: "#00ff00",
      size1: "55px",
      size2: "40px"
    },
    {
      title: "Products",
      value: "540",
      icon1: FaBoxOpen,
      icon2: HiChartBar,
      color: "#bf00ff",
      size1: "40px",
      size2: "40px"
    }
  ];

  const boxesData = data || defaultData;

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
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
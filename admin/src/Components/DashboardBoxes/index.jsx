import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { AiTwotoneGift } from "react-icons/ai";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa6";
import { BsBarChartFill } from "react-icons/bs";
import { RiBarChartFill } from "react-icons/ri";
import { HiChartBar } from "react-icons/hi2";
import { PiPiggyBankDuotone } from "react-icons/pi";
import { SiPiapro } from "react-icons/si";

const DashboardBoxes = () => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="dashboardboxslider"
      >
        <SwiperSlide>
          <div className="box p-5 cursor-pointer hover:bg-[#f1f1f2] shadow-inner rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 bg-white">
            <AiTwotoneGift className="text-[40px] text-[#ff0000]" />
            <div className="info w-[70%]">
              <h3>New Orders</h3>
              <span className="text-[23px]"><b>1,398</b></span>
            </div>
            <IoStatsChartSharp className="text-[40px] text-[#ff0000]" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box p-5 cursor-pointer hover:bg-[#f1f1f2] shadow-inner rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 bg-white">
            <FaChartPie className="text-[40px] text-[#0000ff]" />
            <div className="info w-[70%]">
              <h3>Sales</h3>
              <span className="text-[23px]"><b>₹58,384</b></span>
            </div>
            <BsBarChartFill className="text-[40px] text-[#0000ff]" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box p-5 cursor-pointer hover:bg-[#f1f1f2] shadow-inner rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 bg-white">
            <PiPiggyBankDuotone className="text-[55px] text-[#00ff00]" />
            <div className="info w-[70%]">
              <h3>Revenue</h3>
              <span className="text-[23px]"><b>₹12,209</b></span>
            </div>
            <RiBarChartFill className="text-[40px] text-[#00ff00]" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box p-5 cursor-pointer hover:bg-[#f1f1f2] shadow-inner rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 bg-white">
            <SiPiapro className="text-[40px] text-[#bf00ff]" />
            <div className="info w-[70%]">
              <h3>Products</h3>
              <span className="text-[23px]"><b>540</b></span>
            </div>
            <HiChartBar className="text-[40px] text-[#bf00ff]" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default DashboardBoxes;
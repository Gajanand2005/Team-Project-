import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import banner1 from '../../assets/ban1.jpg'
import banner2 from '../../assets/ban2.jpg'
import banner3 from '../../assets/ban3.jpg'
import banner4 from '../../assets/ban4.jpg'
import './style.css'

import { Navigation } from 'swiper/modules';
import BannerBox from '../BannerBox/index.jsx';
const AdsBannerSlider = (props) => {
  const maxItems = props.items || 4;
  return (
    <div className='py-5 w-full'>
       <Swiper
                slidesPerView={1}
                spaceBetween={10}
                // navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 10 },
                  640: { slidesPerView: Math.min(2, maxItems), spaceBetween: 15 },
                  768: { slidesPerView: Math.min(3, maxItems), spaceBetween: 18 },
                  1024: { slidesPerView: Math.min(4, maxItems), spaceBetween: 20 },
                }}
              >
            <SwiperSlide>
           <BannerBox img={banner1} link={'/'} />
            </SwiperSlide>

             <SwiperSlide>
           <BannerBox img={banner2} link={'/'} />
            </SwiperSlide>

             <SwiperSlide>
           <BannerBox img={banner3} link={'/'} />
            </SwiperSlide>

               <SwiperSlide>
           <BannerBox img={banner4} link={'/'} />
            </SwiperSlide>
              </Swiper>
    </div>
  )
}

export default AdsBannerSlider



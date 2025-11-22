import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import banner1 from '../../assets/ban1.jpg'
import banner2 from '../../assets/ban2.jpg'
import banner3 from '../../assets/ban3.jpg'
import banner4 from '../../assets/ban4.jpg'

import { Navigation } from 'swiper/modules';
import BannerBox from '../BannerBox/Index';
const AdsBannerSlider = (props) => {
  return (
    <div className='py-5 w-full'>
       <Swiper
                slidesPerView={props.items}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
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

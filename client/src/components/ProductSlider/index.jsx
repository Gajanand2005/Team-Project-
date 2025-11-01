import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import ProductItem from '../ProductItem';
const ProductSlider  = (props) => {
  return (
    <section className='productsSlider py-5'>
        <div className='container'>
              <Swiper
                slidesPerView={props.items}
                spaceBetween={10}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  1280: {
                    slidesPerView: props.items,
                    spaceBetween: 10,
                  },
                }}
                modules={[Navigation]}
                className="mySwiper"
              >
            <SwiperSlide>
            <ProductItem/>
            </SwiperSlide>

            <SwiperSlide>
            <ProductItem/>
            </SwiperSlide>

            <SwiperSlide>
            <ProductItem/>
            </SwiperSlide>

            <SwiperSlide>
            <ProductItem/>
            </SwiperSlide>

            <SwiperSlide>
            <ProductItem/>
            </SwiperSlide>

            <SwiperSlide>
            <ProductItem/>
            </SwiperSlide>

            <SwiperSlide>
            <ProductItem/>
            </SwiperSlide>

            <SwiperSlide>
            <ProductItem/>
            </SwiperSlide>

            <SwiperSlide>
            <ProductItem/>
            </SwiperSlide>

            <SwiperSlide>
            <ProductItem/>
            </SwiperSlide>

            <SwiperSlide>
            <ProductItem/>
            </SwiperSlide>

            <SwiperSlide>
            <ProductItem/>
            </SwiperSlide>
              </Swiper>
              
        </div>
    </section>
  )
}

export default ProductSlider 

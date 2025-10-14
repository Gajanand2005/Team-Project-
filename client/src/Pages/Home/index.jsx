
import React from 'react'
import HomeSlider from '../../components/HomeSlider'

import HomeCatSlider from '../../components/HomeCatSlider'
import { FaShippingFast } from "react-icons/fa";
import AdsBannerSlider from '../../components/AdsBannerSlider';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductSlider from '../../components/ProductSlider';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import BlogItem from '../../components/Blogitem';  // Added missing import
import BlogList from '../../components/BlogList';

import BannerBox from '../../components/BannerBox';
 // Fixed import path for FooterSection
 

const Home = () => {
 const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; 
  return (
    
    <div>
      <HomeSlider />
      <section className='py-6'>
        <div className='container flex gap-5'>
          <div className=' part1 w-[70%]'>
            
            </div>
            <div className='part2 w-[70%] flex items-center gap-5 justify-between flex-col'>
              <BannerBox info="left" img={'https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg'} link={"/"} />
              <BannerBox info="left" img={'https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-2.jpg'} link={"/"} />
            </div>
        </div>
        </section>

      <HomeCatSlider />

      <section className='bg-white py-8'>
        <div className='container-fluid'>
        <div className='flex items-center justify-between'>
          <div className='leftSec p-10'>
          <h2 className='text-[22px] font-[600]  '>Popular Products</h2>
          <p className='text-[14px] font-[500]' >Do not miss the current offers until the end of March</p>
          </div>

          <div className='rightSec w-[57%]'>
            <Box sx={{ maxWidth: { xs: 320, sm: 780 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Fashion" />
        <Tab label="Electronics" />
        <Tab label="Bags" />
        <Tab label="Footwear" />
        <Tab label="Groceries" />
        <Tab label="Beauty" />
        <Tab label="Wellness" />
         <Tab label="Jewellery" />
       
      </Tabs>
    </Box>
          </div>
        </div>

       <ProductSlider items={6} />


        </div>
      </section>

       <section className='py-4 pt-2 bg-white  '>
        <div className='container'> 
        <div className='freeShipping  py-4 p-4 border-2 border-[#ff5252] flex items-center justify-between rounded-md mb-7'> 
      <div className='col1 flex items-center gap-4'>
          <FaShippingFast className='text-[50px]' />
          <span className='text-[20px] font-[600] uppercase'  >Free Shipping</span>
      </div>

      <div className='col2'>
        <p className='mb-0 font-[500]'>Free Delivery Now On Your First Order and over $200</p>
      </div>

        <p className='font-bold text-[25px]'>Only $200*</p><br />

        </div>
       

        

        </div>
       </section>
<section className='py-5 pt-0 bg-white '>
  <div className='container'>
    <h2 className='text-[22px] font-[600]  '>Latest Products</h2>
    <ProductSlider items={6} />
  </div>
</section>

<section className='py-5 pt-0 bg-white '>
  <div className='container'>
    <h2 className='text-[22px] font-[600]  '>Latest Products</h2>
    <AdsBannerSlider items={3}/>
  </div>
</section>
<section className='py-5 pt-0 bg-white blogSection '>
  <div className='container'>
    <h2 className='text-[22px] font-[600] mb-4'>From The Blog</h2>
    <BlogList />
   
    </div>
    
</section>

      

    </div>
  )
}

export default Home

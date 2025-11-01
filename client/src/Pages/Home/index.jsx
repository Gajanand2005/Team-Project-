import React from 'react'
import HomeSlider from '../../components/HomeSlider'
import HomeCatSlider from '../../components/HomeCatSlider'

import AdsBannerSlider from '../../components/AdsBannerSlider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductSlider from '../../components/ProductSlider';
const Home = () => {
 const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; 
  return (
    <div>
      <HomeSlider />
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
        <Tab label="Fashine" />
        <Tab label="Bag" />
        <Tab label="FootWear" />
        
      </Tabs>
    </Box>
          </div>
        </div>

       <ProductSlider items={5} />


        </div>
      </section>

       <section className='py-16 bg-white  '>
        <div className='container'> 
       

        <AdsBannerSlider items={4}/>

        </div>
       </section>

       <br /><br /><br /><br /><br /><br />
    </div>
  )
}

export default Home

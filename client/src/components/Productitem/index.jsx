import React, { useContext } from 'react'
import "../Productitem/style.css"
import {Link} from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { FaHeart } from "react-icons/fa6";
import { IoGitCompare } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { MyContext } from '../../App';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};


function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function ProductItem() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const context= useContext(MyContext);

  return (
    <div className='productItem shadow-lg rounded-md overflow-hidden border-2  border-[rgba(0,0,0,0.1)] '>
      <div className='group imgWrapper w-[100%] overflow-hidden rounded-md relative'>
        <Link to="/product/:id">
        <div className='img  h-[200px] md:h-[250px] overflow-hidden'>
        <img src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg" alt=""  className='w-full'/>
        <img src="https://serviceapi.spicezgold.com/download/1753722939207_5107b7b1-ba6d-473c-9195-8576a6a0a9611749366193848-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-3.jpg" alt=""  className='w-full transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105'/>
        </div>
      </Link>
      <span className='discount flex items-center absolute top-[10px] left-[10px] z-50 bg-orange-500 text-white rounded-full p-1 text-[10px] md:text-[12px] font-[500]  '> 10%</span>


      <div className='actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[40px] md:w-[50px] transition-all duration-300 group-hover:top-[10px] opacity-0 group-hover:opacity-100'>
        <Tooltip title="Heart" placement="left-start">
      <Button className='!w-[30px] !h-[30px] md:!w-[35px] md:!h-[35px] !min-w-[30px] md:!min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-orange-500 hover:!text-white group'><FaHeart  className='text-[16px] md:text-[18px] !text-black group-!hover:text-white hover:!text-white'/> </Button></Tooltip>
        <Tooltip title="Compare" placement="left-start">
      <Button className='!w-[30px] !h-[30px] md:!w-[35px] md:!h-[35px] !min-w-[30px] md:!min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-orange-500 hover:!text-white'><IoGitCompare className='text-[16px] md:text-[18px] !text-black group-!hover:text-white hover:!text-white' /> </Button></Tooltip>
      <Tooltip title="View Product Details" placement="left-start">
      <Button className='!w-[30px] !h-[30px] md:!w-[35px] md:!h-[35px] !min-w-[30px] md:!min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-orange-500 hover:!text-white'onClick={()=>context.setOpenProductDetailsModel(true)}>< MdZoomOutMap className='text-[16px] md:text-[18px] !text-black group-!hover:text-white hover:!text-white' /> </Button></Tooltip>

      </div>
      </div>

      <div className='info p-2 md:p-3 py-3 '>
        <h6 className='text-[12px] md:text-[14px]'><Link to={'/product/:id'} className='link transition-all'>Flying Machine</Link></h6>
        <h3 className='text-[14px] md:text-[16px] title mt-1 font-[500] text-[#000]' ><Link to={'/product/:id'} className='link transition-all'>Women Wide Leg High-Rise ...</Link></h3>
        <div className='py-1'>
         <Box sx={{ width: { xs: 150, md: 200 }, display: 'flex', alignItems: 'center' }}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
        </div>

    <div className='flex items-center gap-4 py-1'>
      <span className='oldPrice line-through text-gray-500 text-[14px] md:text-[16px] font-[500]'>$58.00</span>
      <span className='oldPrice text-orange-600 font-bold text-[14px] md:text-[16px]'>$12.00</span>
    </div>
      </div>

    </div>
  );
}

export default ProductItem

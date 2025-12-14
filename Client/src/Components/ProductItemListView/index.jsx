
import React, { useContext } from 'react';
import "../ProductItem/style.css";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FaHeart } from "react-icons/fa6";
import { MdZoomOutMap } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { LuCarTaxiFront } from "react-icons/lu";
import { MyContext } from '../../App';

function ProductItem({ item }) {

  const context = useContext(MyContext);

  // Safety check
  if (!item) return null;

  return (
    <div className='productItem shadow-lg rounded-md overflow-hidden border-2 border-[rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center'>
      
      {/* IMAGE WRAPPER */}
      <div className='group imgWrapper w-full md:w-[25%] overflow-hidden rounded-md relative'>
        <Link to={`/product/${item?._id}`}>
          <div className='img h-[200px] md:h-[250px] overflow-hidden relative'>
            <img
              src={item?.images?.[0]}
              alt=""
              className='w-full'
            />

            {/* Hover Image */}
            <img
              src={item?.images?.[1]}
              alt=""
              className='w-full transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105'
            />
          </div>
        </Link>

        {/* DISCOUNT */}
        {item?.discount && (
          <span className='discount flex items-center absolute top-[10px] left-[10px] z-50 bg-orange-500 text-white rounded-full p-1 text-[10px] md:text-[12px] font-[500]'>
            {item?.discount}%
          </span>
        )}

        {/* ACTION BUTTONS */}
        <div className='actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[40px] md:w-[50px] transition-all duration-300 group-hover:top-[10px] opacity-0 group-hover:opacity-100'>
          
          {/* Heart */}
          <Tooltip title="Wishlist">
            <Button className='!w-[30px] !h-[30px] md:!w-[35px] md:!h-[35px] !min-w-[30px] md:!min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-orange-500 hover:!text-white'>
              <FaHeart className='text-[16px] md:text-[18px]' />
            </Button>
          </Tooltip>

          {/* View Details */}
          <Tooltip title="View Product Details">
            <Button
              className='!w-[30px] !h-[30px] md:!w-[35px] md:!h-[35px] !min-w-[30px] md:!min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-orange-500 hover:!text-white'
              onClick={() => context.handleOpenProductDetailsModal(true, item)}
            >
              <MdZoomOutMap className='text-[16px] md:text-[18px]' />
            </Button>
          </Tooltip>

        </div>
      </div>

      {/* INFO SECTION */}
      <div className='info p-2 md:p-3 !px-4 md:!px-9 w-full md:w-[75%]'>
        
        {/* Brand */}
        <h6 className='text-[12px] md:text-[15px] !mb-3'>
          <Link to={`/product/${item?._id}`} className='link transition-all'>
            {item?.brand}
          </Link>
        </h6>

        {/* Name */}
        <h3 className='text-[14px] md:text-[18px] title mt-2 !mb-2 font-[500] text-[#000]'>
          <Link to={`/product/${item?._id}`} className='link transition-all'>
            {item?.name?.substr(0, 35)}...
          </Link>
        </h3>

        {/* Description */}
        <p className='text-[12px] md:text-[14px] mt-3 mb-3'>
          {item?.description?.substr(0, 140)}...
        </p>

        {/* PRICE */}
        <div className='flex items-center gap-4 py-1'>
          <span className='oldPrice line-through text-gray-500 text-[14px] md:text-[16px] font-[500]'>
            {context?.formatPrice(item?.oldPrice)}
          </span>
          <span className='oldPrice text-orange-600 font-bold text-[14px] md:text-[16px]'>
            {context?.formatPrice(item?.price)}
          </span>
        </div>

        {/* ADD TO CART */}
        <div className='!mt-3'>
          <Button
            className='!bg-orange-600 !text-white hover:!bg-[#484747] flex gap-2'
            onClick={() => context.addToCart(item, context?.userData?._id, 1)}
          >
            Add to Cart <LuCarTaxiFront className='text-[20px]' />
          </Button>
        </div>

      </div>
    </div>
  );
}

export default ProductItem;




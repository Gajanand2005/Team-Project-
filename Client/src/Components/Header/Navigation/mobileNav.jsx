import Button from '@mui/material/Button'
import React from 'react'
import { FcHome } from "react-icons/fc";
import { FcSearch } from "react-icons/fc";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const MobileNav = () => {
  return (
    <>
   <div className='mobileNav bg-white p-1 px-3 w-full grid gap-3 grid-cols-5 items-center text-center fixed bottom-0 left-0 right-0 z-[51]'>
    <NavLink to="/" end className={({ isActive }) => isActive ? "isActive" : undefined}>
    <Button className='flex flex-col items-center justify-center w-[40px] min-w-[40px] capitalize'>
      <FcHome size={18} />
      <span className='text-[12px] text-gray-600'>Home</span>
    </Button>
    </NavLink>
     <NavLink to="/search" className={({ isActive }) => isActive ? "isActive" : undefined}>
    <Button className='flex flex-col items-center justify-center w-[40px] min-w-[40px] capitalize'>
      <FcSearch size={18} />
      <span className='text-[12px] text-gray-600'>Search</span>
    </Button>
    </NavLink>
    <NavLink to="/my-list" end className={({ isActive }) => isActive ? "isActive" : undefined}>
    <Button className='flex flex-col items-center justify-center w-[40px] min-w-[40px] capitalize'>
      <BsFillSuitHeartFill size={18} />
      <span className='text-[12px] text-gray-600'>Wishlist</span>
    </Button>
    </NavLink>
      <NavLink to="/my-order" end className={({ isActive }) => isActive ? "isActive" : undefined}>
    <Button className='flex flex-col items-center justify-center w-[40px] min-w-[40px] capitalize'>
      <PiShoppingCartDuotone size={18} />
      <span className='text-[12px] text-gray-600'>Order</span>
    </Button>
    </NavLink>
      <NavLink to="/my-account" end className={({ isActive }) => isActive ? "isActive" : undefined}>
    <Button className='flex flex-col items-center justify-center w-[40px] min-w-[40px] capitalize'>
      <RiAccountPinCircleFill size={18} />
      <span className='text-[12px] text-gray-600'>Account</span>
    </Button>
    </NavLink>
   </div>
    </>
  )
}

export default MobileNav



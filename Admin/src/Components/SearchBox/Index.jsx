import React from 'react'
import { FaSearch } from "react-icons/fa";
const SearchBox = () => {
  return (
    <>
     <div className='w-full h-auto border  bg-[#f1f1f1] relative overflow-hidden '>
        <FaSearch className=' absolute top-[13px] left-[10px] z-50 pointer-events-none opacity-80' />
    <input type="text" className='w-full h-[40px] border-[(0,0,0,0.1)] bg-[#f1f1f1] p-2 pl-8 focus:outline-none focus:border-[(0,0,0,0.5)] rounded-md text-[13px]' placeholder='Search here ...' />
        </div> 
    </>
  )
}

export default SearchBox



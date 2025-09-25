import React from 'react'
import '../Search/style.css'
import Button from '@mui/material/Button';
import { BsSearchHeart } from "react-icons/bs";

const Search = () => {
  return (
    <div>
      <div className='searchbox w-full h-10 sm:h-12 bg-[#e5e5e5] rounded-md sm:rounded-lg relative p-1 sm:p-2'>
        <input type="text" placeholder='Search for products.....' className='w-full h-full focus:outline-none bg-inherit p-2 text-sm sm:text-base' />
          <Button className='!absolute top-1 sm:top-2 right-1 sm:right-2 z-50 !w-8 sm:!w-9 !min-w-[32px] sm:!min-w-[36px] h-8 sm:h-9 !rounded-full !text-black'><BsSearchHeart className='text-[#545050] text-lg sm:text-xl' /></Button>
      </div>
    </div>
  )
}

export default Search

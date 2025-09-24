import React from 'react'
import '../Search/style.css'
import Button from '@mui/material/Button';
import { BsSearchHeart } from "react-icons/bs";

const Search = () => {
  return (
    <div>
      <div className='searchbox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2'>
        <input type="text" placeholder='Search for products.....' className='w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]' />
          <Button className='!absolute top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[35px] !rounded-full !text-black'><BsSearchHeart className='text-[#545050] text-[22px]' /></Button>
      </div>
    </div>
  )
}

export default Search

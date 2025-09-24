import React from 'react'

const Search = () => {
  return (
    <div>
      <div className='searchbox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2'>
        <input type="text" placeholder='Search for products.....' className='w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]' />
      </div>
    </div>
  )
}

export default Search

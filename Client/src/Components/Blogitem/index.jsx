import React from 'react'

const BlogItem = ({ image, date, title, excerpt, link }) => {
  return (
    <a href={link} className='blogItem bg-white p-4 m-2 rounded-sm block hover:shadow-lg transition-all'>
      <div className='img'>
        <img src={image} alt={title} />
      </div>
      <div className='content mt-4'>
        <p className='text-[12px] text-[#ff5252] font-[500] mb-1'>{date}</p>
        <h3 className='text-[18px] font-[600] mb-2'>{title}</h3>
        <p className='text-[14px] font-[400] mb-2'>{excerpt}</p>
        <span className='text-[14px] font-[500] text-[#ff5252] cursor-pointer'>Read More</span>
      </div>
    </a>
  )
}

export default BlogItem



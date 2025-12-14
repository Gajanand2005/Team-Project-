import React from 'react'

const Badge = (props) => {
  return (
    <>
     <span className={`inline-block py-1 px-2 rounded-full text-[13px] capitalize ${props.status === 'pending' && 'bg-orange-600 text-white'} ${props.status === 'confirmed' && 'bg-green-600 text-white'} ${props.status === 'delivered' && 'bg-yellow-600 text-white'}`}>{props.status}</span> 
    </>
  )
}

export default Badge;


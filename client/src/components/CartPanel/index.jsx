import Button from '@mui/material/Button';
import React from 'react'
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
const CartPanel = () => {
  return (
    <>
       <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden py-3 px-4" >
        <div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.2)] pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
            <Link to='/product/45875' className='block group'>
            <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/70-home_default/mug-today-is-a-good-day.jpg" alt="" className="w-full group-hover:scale-105"/>
            </Link>
          </div>
          <div className="info w-[75%] py-5 relative">
           <Link to='/product/5485' className='link transition-all'><h4>A-line Kurti </h4></Link>
            <p className='flex items-center gap-5 !mt-2 !mb-2'> Qty: <span>2</span>
            <span className='text-orange-600 font-bold'>Price : $25</span></p>
            <MdOutlineDeleteForever className='absolute top-[10px] right-[10px] cursor-pointer text-[21px] link transition-all' />
          </div>
        </div>
        <div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.2)] pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
            <Link to='/product/45875' className='block group'>
            <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/70-home_default/mug-today-is-a-good-day.jpg" alt="" className="w-full group-hover:scale-105"/>
            </Link>
          </div>
          <div className="info w-[75%] py-5 relative">
           <Link to='/product/5485' className='link transition-all'><h4>A-line Kurti </h4></Link>
            <p className='flex items-center gap-5 !mt-2 !mb-2'> Qty: <span>2</span>
            <span className='text-orange-600 font-bold'>Price : $25</span></p>
            <MdOutlineDeleteForever className='absolute top-[10px] right-[10px] cursor-pointer text-[21px] link transition-all' />
          </div>
        </div>
        <div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.2)] pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
            <Link to='/product/45875' className='block group'>
            <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/70-home_default/mug-today-is-a-good-day.jpg" alt="" className="w-full group-hover:scale-105"/>
            </Link>
          </div>
          <div className="info w-[75%] py-5 relative">
           <Link to='/product/5485' className='link transition-all'><h4>A-line Kurti </h4></Link>
            <p className='flex items-center gap-5 !mt-2 !mb-2'> Qty: <span>2</span>
            <span className='text-orange-600 font-bold'>Price : $25</span></p>
            <MdOutlineDeleteForever className='absolute top-[10px] right-[10px] cursor-pointer text-[21px] link transition-all' />
          </div>
        </div>        
        
      </div> 
      <br />
      <div className='bottomSec absolute bottom-[10px] left-[10px] w-full overflow-hidden pr-5'>
      <div className='bottomInfo w-full border-t px-4 border-[rgba(0,0,0,0.2)] py-3 flex items-center justify-between flex-col'>
       <div className='flex items-center justify-between w-full'>
         <span className='text-[14px] font-[600]'>3 items</span>
        <span className='text-orange-600 font-bold'>$86.00</span>
       </div>
        <div className='flex items-center justify-between w-full'>
         <span className='text-[14px] font-[600]'>Shipping</span>
        <span className='text-orange-600 font-bold'>$8.00</span>
       </div>
      </div>
       <div className='bottomInfo w-full border-t px-4 border-[rgba(0,0,0,0.2)] py-3 flex items-center justify-between flex-col'>
       <div className='flex items-center justify-between w-full'>
         <span className='text-[14px] font-[600]'>Total (tax excl.)</span>
        <span className='text-orange-600 font-bold'>$93.00</span>
       </div>
        
        <br />

        <div className='flex items-center justify-between w-full gap-2'>
          <Link to='/Cart' className='w-[50%] d-block'><Button className='!bg-orange-600 !text-white hover:!bg-black w-full'>View Cart</Button></Link>
            <Link to='/CheckOut' className='w-[50%] d-block'><Button className='!bg-orange-600 !text-white hover:!bg-black w-full'>CheckOut </Button></Link>
        </div>
      </div>
      </div>
    </>
  )
}

export default CartPanel

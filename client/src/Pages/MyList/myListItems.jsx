import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Button from '@mui/material/Button';


const myListItems = (props) => {
    

  return (
    <>
      <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
                <div className="img w-[15%] rounded-md overflow-hidden">
                  <Link to="/product/7845" className="group">
                    <img
                      src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/71-home_default/mug-today-is-a-good-day.jpg"
                      alt=""
                      className="w-full group-hover:scale-105 transition-all"
                    />
                  </Link>
                </div>

                <div className="info w-[85%] relative">
                  <IoMdClose className="cursor-pointer absolute top-[0px] right-[1px] text-[18px] link transition-all" />
                  <span className="text-[13px] font-[600] ">Levis</span>
                  <h3 className="text-[15px] font-[600] text-black">
                    <Link className="link">A-Line Kurti with Sharara</Link>
                  </h3>
               

                  <div className="flex items-center gap-4 !mt-2 !mb-2">
                    <span className="price text-black text-[15px] font-[600]">
                      $58.00
                    </span>
                    <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
                      $58.00
                    </span>
                    <span className="price text-orange-600 text-[15px] font-[600]">
                      55% OFF
                    </span>
                  </div>

            
                <Button className='!bg-orange-600 !text-white hover:!bg-black !text-[12px]'> Add to Cart</Button>

                </div>
              </div>
    </>
  )
}

export default myListItems

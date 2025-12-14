import React,{useContext, useState} from 'react'
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { MyContext } from '../../App';
import { deleteData } from '../../Utils/Api';


const myListItems = (props) => {
    
const context = useContext(MyContext);
const removeItem = (id)=>{
  deleteData(`api/myList/${id}`).then((res)=>{
    
      context?.alertBox("success",res?.message)
      context?.getMyListData();
    
  })
}



  return (
    <>
      <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
                <div className="img w-[30%] sm:w-[15%] h-[150px] rounded-md overflow-hidden">
                  <Link to={`/product/${props?.item?.productId}`} className="group">
                    <img
                      src={props?.item?.image}
                      alt=""
                      className="w-full group-hover:scale-105 transition-all"
                    />
                  </Link>
                </div>

                <div className="info w-full sm:w-[85%] relative">
                  <IoMdClose className="cursor-pointer absolute top-[0px] right-[1px] text-[18px] link transition-all" 
                  onClick={()=>removeItem(props?.item?._id)}
                  />
                  <span className="text-[13px] font-[600] ">{props?.item?.brand}</span>
                  <h3 className=" text-[13px] sm:text-[15px] font-[600] text-black">
                    <Link to={`/product/${props?.item?.productId}`} className="link">{props?.item?.productTitle.substr(0,70)+'....'}</Link>
                  </h3>
                  <div className="flex items-center gap-4 !mt-2 !mb-2">
                    <span className="price text-black text-[15px] font-[600]">
                    {context?.formatPrice(props?.item?.price)}
                    </span>
                    <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
                     ₹{context?.formatPrice(props?.item?.oldPrice)}
                    </span>
                    <span className="price text-orange-600 text-[15px] font-[600]">
                      {props?.item?.discount}% OFF
                    </span>
                  </div>

            
                {/* <Button className='!bg-orange-600 !text-white hover:!bg-black !text-[12px]'
                onClick={()=>addToCart(props?.item?.productId)}
                > Add to Cart</Button> */}

                </div>
              </div>
    </>
  )
}

export default myListItems



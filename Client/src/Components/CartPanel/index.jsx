import Button from '@mui/material/Button';
import React, { useContext } from 'react'
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';
import { deleteData } from '../../Utils/Api';

const CartPanel = (props) => {
  const context = useContext(MyContext);
  const removeItem = (id) => {
    deleteData(`/api/cart/delete-cart-item/${id}`).then((res) => {
      context.alertBox("success", "Item removed");
      context?.getCartItems();
    })
  }

  return (
    <div className="w-full h-full flex flex-col">
       <div className="flex-1 w-full overflow-y-auto overflow-x-hidden py-3 px-4" >
      {
        props?.data?.map((item, index)=>{
          return(
                 <div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.2)] pb-4">
           <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
             <Link to={`/product/${item?.productId}`} className='block group'>
             <img src={item?.image} alt="" className="w-full group-hover:scale-105"/>
             </Link>
           </div>
           <div className="info w-[75%] py-5 relative">
            <Link to={`/product/${item?.productId}`} className='link transition-all'><h4>{item?.productTitle?.substring(0,40)+'...'} </h4></Link>
             <p className='flex items-center gap-5 !mt-2 !mb-2'> Qty: <span>{item?.quantity}</span>
             <span className='text-orange-600 font-bold'>Price : {context.formatPrice(item?.price)}
</span></p>
             <MdOutlineDeleteForever className='absolute top-[10px] right-[10px] cursor-pointer text-[21px] link transition-all' onClick={()=>removeItem(item?._id)} />
           </div>
         </div>

          )
        })
      }
      </div>
      <div className='bottomSec w-full bg-white'>
      <div className='bottomInfo w-full border-t px-4 border-[rgba(0,0,0,0.2)] py-3 flex items-center justify-between flex-col'>
       <div className='flex items-center justify-between w-full'>
         <span className='text-[14px] font-[600]'>{context?.cartData?.length} items</span>
        <span className='text-orange-600 font-bold'>
  {context.formatPrice(
    context.cartData?.length !== 0
      ? context.cartData
          ?.map(item => Number(String(item.price).replace(/[^0-9.]/g, "")) * item.quantity)
          .reduce((total, value) => total + value, 0)
      : 0
  )}
</span>

       </div>
        {/* <div className='flex items-center justify-between w-full'>
         <span className='text-[14px] font-[600]'>Shipping</span>
        <span className='text-orange-600 font-bold'>$8.00</span>
       </div> */}
      </div>
       <div className='bottomInfo w-full border-t px-4 border-[rgba(0,0,0,0.2)] py-3 flex items-center justify-between flex-col'>
       <div className='flex items-center justify-between w-full'>
         <span className='text-[14px] font-[600]'>Total (tax excl.)</span>
        <span className='text-orange-600 font-bold'>
  {context.formatPrice(
    context.cartData?.length !== 0
      ? context.cartData
          ?.map(item => Number(String(item.price).replace(/[^0-9.]/g, "")) * item.quantity)
          .reduce((total, value) => total + value, 0)
      : 0
  )}
</span>

       </div>

        <br />

        <div className='flex items-center justify-between w-full gap-2'>
          <Link to='/Cart' className='w-[50%] d-block'><Button className='!bg-orange-600 !text-white hover:!bg-black w-full'onClick={()=>context?.toggleCartPanel(false)}>View Cart</Button></Link>
            <Link to='/CheckOut' className='w-[50%] d-block'><Button className='!bg-orange-600 !text-white hover:!bg-black w-full'onClick={()=>context?.toggleCartPanel(false)}>CheckOut </Button></Link>
        </div>
      </div>
      </div>
    </div>
  )
}

export default CartPanel



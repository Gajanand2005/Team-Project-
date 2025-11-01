import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { RiShoppingBag3Line } from "react-icons/ri";

const CheckOut = () => {
  return (
    <>
    <section className='py-10'>
    <div className='container flex items-center gap-5'>
        <div className='leftCol w-[70%] ' >
            <div className='card bg-white shadow-md p-5 rounded-md w-full'>
                <h1 className='text-[20px] font-[600]'>Billing Details </h1>

                <form action="" className='w-full !mt-5'>
                <div className='flex items-center gap-5 pt-2 pb-5'>
                    <div className='col w-[50%]'>
                        <TextField className='w-full' label="Full Name" variant="outlined" size='small' />
                    </div>
                     <div className='col w-[50%]'>
                        <TextField className='w-full' type='email' label="Email" variant="outlined" size='small' />
                    </div>
                </div>

                <h4 className='text-[14px] font-[600] !mb-3'>Street Address *</h4>
                <div className='col w-[100%]'>
                        <TextField className='w-full' label="House number and street name" variant="outlined" size='small' />
                    </div>
                    <div className='col w-[100%] !mt-3'>
                        <TextField className='w-full' label="Apartment, Suite, unit, etc. (optional)" variant="outlined" size='small' />
                    </div>
                    <h4 className='text-[14px] font-[600] !mb-2 !mt-2'>Town / City *</h4>
                    <div className='col w-[100%]'>
                        <TextField className='w-full' label="Town / City" variant="outlined" size='small' />
                    </div>
                    <h4 className='text-[14px] font-[600] !mb-2 !mt-2'>State / County</h4>
                    <div className='col w-[100%]'>
                        <TextField className='w-full' label="State" variant="outlined" size='small' />
                    </div>
                    <h4 className='text-[14px] font-[600] !mb-2 !mt-2'>PostCode/ Zip</h4>
                     <div className='col w-[100%]'>
                        <TextField className='w-full' label="ZIP Code" variant="outlined" size='small' />
                    </div>
                     <div className='flex items-center gap-5 pt-2 pb-5'>
                    <div className='col w-[50%]'>
                        <TextField className='w-full' label="Phone Number" variant="outlined" size='small' />
                    </div>
                     <div className='col w-[50%]'>
                        <TextField className='w-full' type='email' label="Email" variant="outlined" size='small' />
                    </div>
                </div>
                </form>
            </div>
        </div>

        <div className='rightCol w-[30%]'>
            <div className='card shadow-md bg-white p-5 rounded-md'>
                <h2 className='!mb-3 font-[600]'>Your Order</h2>

                <div className='flex justify-between items-center py-3 border-t border-b border-[rgba(0,0,0,0.2)] '>
                    <span className='text-[15px] font-[600]'>Product</span>
                    <span  className='text-[15px] font-[600]'>subtotal</span>
                </div>
            <div className='scroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2 !mb-5'>
            <div className='flex items-center justify-between py-2 '>
                <div className='part1 flex items-center gap-3'>
                    <div className='img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                        <img  src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/90-home_default/hummingbird-cushion.jpg" alt=""  className='w-full transition-all group-hover:scale-105'/>
                    </div>

                    <div className='info'>
                        <h4 className='font-[600] text-[14px]'>A-Line Kurti with sh..... </h4>
                        <span className='text-[13px]'>Oty : 1 </span>
                    </div>

                </div>

                <span className='text-[14px] font-[600]'>$1,300.00</span>

            </div>
            <div className='flex items-center justify-between py-2 '>
                <div className='part1 flex items-center gap-3'>
                    <div className='img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                        <img  src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/90-home_default/hummingbird-cushion.jpg" alt=""  className='w-full transition-all group-hover:scale-105'/>
                    </div>

                    <div className='info'>
                        <h4 className='font-[600] text-[14px]'>A-Line Kurti with sh..... </h4>
                        <span className='text-[13px]'>Oty : 1 </span>
                    </div>

                </div>

                <span className='text-[14px] font-[600]'>$1,300.00</span>

            </div>
            <div className='flex items-center justify-between py-2 '>
                <div className='part1 flex items-center gap-3'>
                    <div className='img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                        <img  src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/90-home_default/hummingbird-cushion.jpg" alt=""  className='w-full transition-all group-hover:scale-105'/>
                    </div>

                    <div className='info'>
                        <h4 className='font-[600] text-[14px]'>A-Line Kurti with sh..... </h4>
                        <span className='text-[13px]'>Oty : 1 </span>
                    </div>

                </div>

                <span className='text-[14px] font-[600]'>$1,300.00</span>

            </div>
            <div className='flex items-center justify-between py-2 '>
                <div className='part1 flex items-center gap-3'>
                    <div className='img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                        <img  src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/90-home_default/hummingbird-cushion.jpg" alt=""  className='w-full transition-all group-hover:scale-105'/>
                    </div>

                    <div className='info'>
                        <h4 className='font-[600] text-[14px]'>A-Line Kurti with sh..... </h4>
                        <span className='text-[13px]'>Oty : 1 </span>
                    </div>

                </div>

                <span className='text-[14px] font-[600]'>$1,300.00</span>

            </div>
            <div className='flex items-center justify-between py-2 '>
                <div className='part1 flex items-center gap-3'>
                    <div className='img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                        <img  src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/90-home_default/hummingbird-cushion.jpg" alt=""  className='w-full transition-all group-hover:scale-105'/>
                    </div>

                    <div className='info'>
                        <h4 className='font-[600] text-[14px]'>A-Line Kurti with sh..... </h4>
                        <span className='text-[13px]'>Oty : 1 </span>
                    </div>

                </div>

                <span className='text-[14px] font-[600]'>$1,300.00</span>

            </div>
            </div>

        <Button className='!bg-orange-600 flex !text-white w-full items-center text-[19px] hover:!bg-black gap-2'>CheckOut<RiShoppingBag3Line className='text-[19px]'  /></Button>

            </div>
        </div>

    </div>
    </section>
    </>
  )
}

export default CheckOut

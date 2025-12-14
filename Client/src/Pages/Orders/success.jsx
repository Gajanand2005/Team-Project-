import React from 'react'
import Button from '@mui/material/Button';
const Success = () => {
  return (
    <>
      <section className='w-full p-10 flex items-center justify-center flex-col gap-5'>
        <img src="/order.gif" alt="" width="180" className='rounded-md' />
        <h1 className='!mb-0 !text-[25px] !font-[600]'>Your Order is Placed</h1>
        <p className='!mt-0 !text-[25px]'>Thank You for your payment🪙</p>
        <Button className='!bg-orange-600 !text-white !rounded-md !py-2 !px-5 !mt-0 hover:!bg-black' href='/'>Back to Home</Button>
      </section>
    </>
  )
}

export default Success



import React from 'react';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";


export const OrderSuccess = () => {
    return (
        <section className='w-full p-10 py-20 flex items-center justify-center flex-col gap-2'>
            <img src="/check.png" width="120"  />
            <h3 className='text-2xl mb-0 '>Your order is placed</h3>
            <p className='mt-0'>Thank you for your payment.</p>

            <Link to="/">
                <Button className="btn-org btn-border">Back to home</Button>
            </Link>    

        </section>
    )
}
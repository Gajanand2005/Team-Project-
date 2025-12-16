import React, { useContext, useEffect, useState } from 'react'
import thief from '../../assets/thief.png'
import OtpBox from '../../Components/OtpBox/index.jsx';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../../Utils/Api';

import { MyContext } from '../../App';


const Verify = () => {
    const [otp, setOtp]= useState('');
    const handleOtpChange = (value) =>{
        setOtp(value);
    };

    const history = useNavigate();
   const context = useContext(MyContext);
    const actionType = localStorage.getItem("actionType")

    const verifyOTP = (e)=>{
        e.preventDefault();

        const actionType = localStorage.getItem("actionType");

        if(actionType!=="forgot-password"){
             postData("/api/user/verifyEmail",{
        email: localStorage.getItem("userEmail"),
        otp:otp
      }).then((res)=>{
        if(res?.error === false){
          context.alertBox("success", res?.message);
          localStorage.removeItem("userEmail")
          history("/login")
        }else{
          context.alertBox("error", res?.message);
        }
      })
        }else{
             postData("/api/user/verify-forgot-password-otp",{
        email: localStorage.getItem("userEmail"),
        otp:otp
      }).then((res)=>{
        if(res?.error === false){
          context.alertBox("success", res?.message);

          history("/forgot-password")
        }else{
          context.alertBox("error", res?.message);
        }
      })
        }




    }

  return (
    <>
         <section className="section py-10 px-4 sm:px-6 lg:px-20">
        <div className="container mx-auto">
          <div className="card shadow-md w-full max-w-md sm:max-w-md md:max-w-lg m-auto rounded-md bg-white p-6 sm:px-10">
            <div className='text-center flex items-center justify-center '>
                <img src={thief} alt="" className='w-16 sm:w-20 md:w-24' />
            </div>
            <h3 className="text-center text-lg sm:text-xl md:text-2xl text-black font-[500] !mt-4">
          Verify OTP
            </h3>
            <p className='text-center !mt-0 !mb-4 text-sm sm:text-base'>OTP sent to <span className='text-orange-600 font-bold'>{localStorage.getItem("userEmail")}</span></p>
            <OtpBox length={6} onChange={handleOtpChange}/>

            <form action="" onSubmit={verifyOTP}>
                <div className='flex items-center justify-center !mt-3 px-3 w-full'>
                <Button type="submit" fullWidth variant="contained" sx={{backgroundColor:'#ff7a00', color:'#fff', '&:hover':{backgroundColor:'#000'}}}>Verify OTP</Button>

            </div>

            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Verify

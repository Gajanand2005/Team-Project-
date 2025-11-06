import React, { useState } from 'react'
import thief from '../../assets/thief.png'
import OtpBox from '../../components/OtpBox';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { postData } from '../../utils/api';
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { useContext } from "react";


const Verify = () => {
    const [otp, setOtp]= useState('');
    const handleOtpChange = (value) =>{
        setOtp(value);
    };
}

const history = useNavigate();
const context = useContext(MyContext);



  const verifyOTP = async (e)=>{
        e.preventDefault();
        const actionType=localStorage.getItem("actionType");

        if (actionType!=="forgot-password"){
          postData("api/user/verifyEmail",{
            email:localStorage.getItem("userEmail"),
            opt:opt
          }).then((res)=>{
            if(res?.error===false){
              context.alertBox("success",res?.message);
              localStorage.removeItem("userEmail")
              history("/login")
            }else{
              context.alertBox("error",res?.message);
            }
          })
        }else{
          postData("api/user/verify-forgot-password-otp",{
            email:localStorage.getItem("userEmail"),
            opt:opt
          }).then((res)=>{
            if(res?.error===false){
              context.alertBox("success",res?.message);
              localStorage.removeItem("userEmail")
              history("/forgot-password")
            }else{
              context.alertBox("error",res?.message);
            }
          })

        }
  const onChangeInput=(e)=>{
    const{name,value}=e.target;
    setFormFileds(()=>{
      return{
        ...formFileds,
        [name]:value
      }
    })
  }

   return (
    <>
         <section className="section py-10 pl-90">
        <div className="container ">
          <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10 ">
            <div className='text-center flex items-center justify-center '>
                <img src={thief} alt="" className='w-[80px]' />
            </div>
            <h3 className="text-center text-[20px] text-black font-[500] !mt-4">
          Verify OTP
            </h3>

            <p className='text-center !mt-0 !mb-4'>OTP send to <span className='text-orange-600 font-bold'>{localStorage.getItem("userEmail")}</span></p>
            <OtpBox length={6} onChange={handleOtpChange}/>

          <form onSubmit={verifyOTP}>
            <div className='flex items-center justify-center !mt-3 px-3'>
              <Button  type="submit"  className='w-full !bg-orange-600 !text-white hover:!bg-black' >
                Verify OTP
              </Button>
            </div>
          </form>


          </div>
        </div>
      </section>
    </>
  );
};

export default Verify;

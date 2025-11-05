import { Link, NavLink } from "react-router-dom";
import udrcrafts_logo from "../../assets/udrcrafts_logo.jpg"
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import loginbg from "../../assets/Login.jpg"
import logo from '../../assets/logo.png'
import { useState } from "react";
import Button from "@mui/material/Button";
import OtpBox from "../../Components/OtpBox";

const VerifyAccount = () => {

  const [otp, setOtp]= useState('');
      const handleOtpChange = (value) =>{
          setOtp(value);
      };


  return (
    <section className="w-full h-[auto] ">
      <img src={loginbg} className="w-full fixed top-0 left-0 opacity-25"/>
      <header className="  w-full top-0 left-0 fixed px-4 py-3 flex items-center justify-between z-50 ">
        <Link to="/">
          <img
            src={logo}
            alt="logo-image"
            className="w-[95px] h-[75px] object-cover rounded-full "
          />
        </Link>
        <div className="flex items-center gap-4">
          <NavLink to="/login" exact={true} activeClassName="active bg-[#f1f1f1]">
            <button className="!rounded-full !text-[rgba(0,0,0,0.0.8)] bg-gray-200 !px-5 flex gap-3 items-center hover:bg-[#f1f1f2] h-[20px]">
              <CgLogIn className="text-[18px]" />
              Login
            </button>
          </NavLink>
          <NavLink to="/signup" exact={true} activeClassName="active">
            <button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-3 items-center hover:bg-[#f1f1f2]">
              <FaRegUser className="text-[15px] " />
              Sign Up
            </button>
          </NavLink>
        </div>
      </header>

      <div className="  loginBox card w-[600px] pb-80 h-[auto] mx-auto pt-20 z-50 relative">
        <div className="text-center">
          <img src="/verify.png" className="w-[100px] m-auto"/>
        </div>

        <div>
          <h1 className="text-center text-[35px] font-[800] text-black mt-4">
            Welcome Back! <br /> Please Verify your Email
          </h1>

          <br />
          <p className="text-center text-[15px]">OTP send to <span className="text-primary font-bold">rinkuv37@gmail.com</span></p>
          <br />

          <div className="text-center flex items-center justify-center flex-col">
            <OtpBox length={6} onChange={handleOtpChange}/>
          </div>

          <br/>

          <div className="w-[300px] m-auto">
            <Button className="btn-blue w-full">Verify OTP</Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VerifyAccount;
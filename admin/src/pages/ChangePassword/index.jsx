import { Link, NavLink } from "react-router-dom";
import udrcrafts_logo from "../../assets/udrcrafts_logo.jpg"
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import loginbg from "../../assets/Login.jpg"
import logo from '../../assets/logo.png'
import Button from "@mui/material/Button";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "@mui/material/Checkbox";
import { FaRegEye } from "react-icons/fa";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {

  const [isPasswordShow, setisPasswordShow] = useState(false);
  const [isPasswordShow2, setisPasswordShow2] = useState(false);
  
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
          <img src={logo} className="m-auto h-[120px] w-[180px] object-cover rounded-full " />
        </div>

        <div>
          <h1 className="text-center text-[35px] font-[800] text-black mt-4">
            Welcome Back! <br /> You can Change your password from here
          </h1>
        
          <br />
          
          <form className="w-full px-mt-3 ">
            
            <div className="form-group flex flex-col mb-4 w-full">
              <h4 className="text-[14px] font-[600] mb-1">New Password</h4>
              <div className="w-full relative">
                <input
                  type={isPasswordShow === false ? 'password' : 'text'}
                  className="w-full h-[45px] border-2  border-[rgba(0,0,0,0.1)] rounded-md  focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3 mt-2"
                />
                <Button
                  className="!absolute top-[12px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] cusor-pointer !text-gray-600"
                  onClick={() => setisPasswordShow(!isPasswordShow)}
                >
                  {isPasswordShow === false ? (
                    <FaRegEye className="text-[18px]" />
                  ) : (
                    <FaEyeSlash className="text-[18px]" />
                  )}
                </Button>
              </div>
            </div>

            <div className="form-group flex flex-col mb-4 w-full">
              <h4 className="text-[14px] font-[600] mb-1">Confirm Password</h4>
              <div className="w-full relative">
                <input
                  type={isPasswordShow2 === false ? 'password' : 'text'}
                  className="w-full h-[45px] border-2  border-[rgba(0,0,0,0.1)] rounded-md  focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3 mt-2"
                />
                <Button
                  className="!absolute top-[12px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] cusor-pointer !text-gray-600"
                  onClick={() => setisPasswordShow2(!isPasswordShow2)}
                >
                  {isPasswordShow2 === false ? (
                    <FaRegEye className="text-[18px]" />
                  ) : (
                    <FaEyeSlash className="text-[18px]" />
                  )}
                </Button>
              </div>
            </div>

            
            <Button variant="contained" className="w-full ">
              Change Password
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
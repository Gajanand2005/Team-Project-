import { Link, NavLink } from "react-router-dom";
import udrcrafts_logo from "../../assets/udrcrafts_logo.jpg"
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import loginbg from "../../assets/Login.jpg"
import logo from '../../assets/logo.png'
import Button from "@mui/material/Button";

const ForgotPassword = () => {


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
          Having trouble to sign in?<br/>
          Reset your password.
          </h1>


          <br />
          <form className="w-full px-mt-3 ">
            <div className="flex flex-col mb-4">
              <h4 className="text-[14px] font-[600] mb-1">Email</h4>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full h-[45px] border-2 border-[rgba(0,0,0,0.1)] rounded-md  focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3 mt-2"
              />
            </div>


            <Button variant="contained" className="w-full ">
              Reset Password
            </Button>
            
            <br/><br/>
            <div className="text-center flex items-center justify-center gap-5">
              <span>Don't want to reset?</span>         
              <Link to="/forgot-password" className="text-primary font[700] txt-[15px] hover:underline text-blue-700 hover:text-gray-700 ">
                Sign In 
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;


import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TbEyeglass2 } from "react-icons/tb";
import { TbEyeglassOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from "../../Utils/api.js";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formFields, setFormFields]= useState({
    email : '',
    password: '',
  });

  const context = useContext(MyContext);
  const history = useNavigate();

  const forgotPassword = ()=>{
   
      context.openAlertBox('Success',"OTP Send",{autoClose: 6000, duration: 5000});
      history("/verify");
  }

  const onChangeInput = (e) => {
    const {name, value} = e.target;
    setFormFields(() => {
      return {
        ...formFields,
      [name]:value
      }
    })  
  }


  const valideValue = Object.values(formFields).every(el => el);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      setIsLoading(true);
  
      if(formFields.email===""){
        context.alertBox("error", "Please enter email id")
        return false
      }
  
      if(formFields.password===""){
        context.alertBox("error", "Please enter password")
        return false
      }
  
  
      postData("/api/user/login",formFields, {withCredentials: true } ).then((res)=>{
        console.log(res)
  
        if(res?.error !== true) {
          setIsLoading(false);
          context.alertBox("success", res?.message)
          // localStorage.setItem("userEmail", formFields.email)
          setFormFields({
            email:"",
            password:""
          })


          localStorage.setItem("accessToken",res?.data?.accessToken);
          localStorage.setItem("refreshToken",res?.data?.refreshToken);

          context.setIsLogin(true);


          history("/")
        } else {
          context.alertBox("error", res?.message)
          setIsLoading(false);
        }
        
      })
    }

  return (
    <>
      <section className="section py-10">
        <div className="container ">
          <div className="card shadow-md w-full max-w-[500px] m-auto rounded-md bg-white p-5 px-4 md:px-10 ">
            <h3 className="text-center text-[20px] text-black font-[500]">
              Login to your account
            </h3>
            <form action="" className="w-full !mt-5" onSubmit={handleSubmit}>
              <div className="form-group w-full !mb-5">
                <TextField
                  type="email"
                  id="email"
                  name="email"
                  value={formFields.email}
                  disabled={isLoading===true ? true : false}
                  label="Email id"
                  variant="outlined"
                  className="w-full"
                  onChange={onChangeInput}
            
                />
              </div>
              <div className="form-group w-full !mb-5 relative">
                <TextField
                  id="password"
                  type={isShowPassword=== false ? 'password' : 'text'}
                  label="Password "
                  variant="outlined"
                  className="w-full"
                  name="password"
                  value={formFields.password}
                  disabled={isLoading===true ? true : false}
                  onChange={onChangeInput}
                />
                <Button 
                  className="!absolute !top-[5px] !right-[5px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword === false ? (
                    <TbEyeglass2 className="text-[40px] opacity-75" />
                  ) : (
                    <TbEyeglassOff className="text-[40px] opacity-75" />
                  )}
                </Button>
              </div>

            <a href="" className="link cursor-pointer text-[14px] font-[600]" onClick={forgotPassword}>Forgot Password</a>
                
                 
            <div className="flex items-center w-full !mt-3">
                <Button type="submit" disabled={!valideValue} className="!text-white !bg-orange-600 hover:!bg-black w-full !text-[18px] !p-3 flex gap-3">
                  {
                    isLoading === true ?   <CircularProgress color="inherit" />
                    :
                    'Login'
                  }

               </Button>
            </div>

            <p className="text-center">Not Registered? <Link className="link text-[14px] font-[600] text-orange-600" to='/register'>Sign Up</Link></p>

            <p className="text-center font-[500]">Or continue with social account</p>
            <Button className="flex gap-3 w-full !bg-[#f1f1f1] !text-[18px] !p-3  "><FcGoogle className="text-[20px]" />Login with Google</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

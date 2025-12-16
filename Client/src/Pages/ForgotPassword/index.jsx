import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TbEyeglass2 } from "react-icons/tb";
import { TbEyeglassOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../Utils/Api";

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
   const [isShowPassword2, setIsShowPassword2] = useState(false);
const [formFields, setFormFields] = useState({
   email: localStorage.getItem("userEmail"),
    newPassword: "",
    confirmPassword: "",
  });
   

  const context = useContext(MyContext);
  const history = useNavigate();

  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

   const valideValue = Object.values(formFields).every((el) => el);

    const handleSubmit = (e) => {
       e.preventDefault();
       setIsLoading(true);
   
       if (formFields.newPassword === "") {
         context.alertBox("error", "Please enter new password ");
         setIsLoading(false);
         return false;
       }
   
       if (formFields.confirmPassword === "") {
         context.alertBox("error", "Please enter confirm password ");
         setIsLoading(false);
         return false;
       }

       if (formFields.confirmPassword !== formFields.newPassword) {
         context.alertBox("error", "Password and confirm password not match ");
         setIsLoading(false);
         return false;
       }
   
        postData(`/api/user/reset-password`,formFields).then((res)=>{
          if(res?.error===false){
          localStorage.removeItem("userEmail")
          localStorage.removeItem("actionType")
             context.alertBox("success", res?.message);

          setIsLoading(false);
          history("/login")
          }
          else{
             context.alertBox("error", res?.message);
          }
          
        })
   
     };
   
 
  return (
    <>
      <section className="section py-10 px-4 sm:px-6 lg:px-20">
        <div className="container mx-auto">
          <div className="card shadow-md w-full max-w-md sm:max-w-md md:max-w-lg m-auto rounded-md bg-white p-6 sm:px-10">
            <h3 className="text-center text-lg sm:text-xl md:text-2xl text-black font-[500]">
              Forgot Password
            </h3>
            <form action="" className="w-full !mt-5" onSubmit={handleSubmit}>
              <div className="form-group w-full mb-5 relative">
                <TextField
                  type={isShowPassword === false ? 'password' : 'text'}
                  id="newPassword"
                  label="New Password"
                  variant="outlined"
                  className="w-full"
                  name="newPassword"
                  onChange={onchangeInput}
                  value={formFields.newPassword}
                  disabled={isLoading}
                />
                <Button
                  className="absolute top-1 right-1 sm:top-[5px] sm:right-[5px] z-50 w-9 h-9 min-w-[36px] rounded-full text-black"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  type="button"
                >
                  {isShowPassword === false ? (
                    <TbEyeglass2 className="text-xl sm:text-2xl opacity-75" />
                  ) : (
                    <TbEyeglassOff className="text-xl sm:text-2xl opacity-75" />
                  )}
                </Button>
              </div>
              <div className="form-group w-full mb-5 relative">
                <TextField
                  id="confirmPassword"
                  type={isShowPassword2 === false ? 'password' : 'text'}
                  label="Confirm Password"
                  variant="outlined"
                  className="w-full"
                  name="confirmPassword"
                  onChange={onchangeInput}
                  value={formFields.confirmPassword}
                  disabled={isLoading}
                />
                <Button
                  className="absolute top-1 right-1 sm:top-[5px] sm:right-[5px] z-50 w-9 h-9 min-w-[36px] rounded-full text-black"
                  onClick={() => setIsShowPassword2(!isShowPassword2)}
                  type="button"
                >
                  {isShowPassword2 === false ? (
                    <TbEyeglass2 className="text-xl sm:text-2xl opacity-75" />
                  ) : (
                    <TbEyeglassOff className="text-xl sm:text-2xl opacity-75" />
                  )}
                </Button>
              </div>
                     <div className="flex items-center w-full mt-3">
                <Button type="submit" disabled={!valideValue || isLoading} fullWidth variant="contained" sx={{backgroundColor:'#ff7a00', color:'#fff', '&:hover':{backgroundColor:'#000'}, paddingY:1.5, fontSize:{xs:'16px', sm:'18px'}}}>
                  {isLoading ? <CircularProgress color="inherit" size={24} /> : 'Change Password'}
                </Button>
            </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;

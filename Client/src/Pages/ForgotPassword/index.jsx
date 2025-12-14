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
      <section className="section py-10 pl-90">
        <div className="container ">
          <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10 ">
            <h3 className="text-center text-[20px] text-black font-[500]">
              Forgot Password
            </h3>
            <form action="" className="w-full !mt-5" onSubmit={handleSubmit}>
              <div className="form-group w-full !mb-5 relative">
                <TextField
                  type={isShowPassword=== false ? 'password' : 'text'}
                  id="Password"
                  label="New Password"
                  variant="outlined"
                  className="w-full"
                  name="newPassword"
                  onChange={onchangeInput}
                   value={formFields.newPassword}
                  disabled={isLoading === true ? true : false}
                />
                   <Button 
                  className="!absolute !top-[5px] !right-[5px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                  onClick={() => setIsShowPassword2(!isShowPassword2)}
                >
                  {isShowPassword2 === false ? (
                    <TbEyeglass2 className="text-[40px] opacity-75" />
                  ) : (
                    <TbEyeglassOff className="text-[40px] opacity-75" />
                  )}
                </Button>
              </div>
              <div className="form-group w-full !mb-5 relative">
                <TextField
                  id="Confirm_Password"
                  type={isShowPassword2=== false ? 'password' : 'text'}
                  label="Confirm_Password "
                  variant="outlined"
                  className="w-full"
                     name="confirmPassword"
                  onChange={onchangeInput}
                   value={formFields.confirmPassword}
                  disabled={isLoading === true ? true : false}
                />
                <Button 
                  className="!absolute !top-[5px] !right-[5px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                  onClick={() => setIsShowPassword2(!isShowPassword2)}
                >
                  {isShowPassword2 === false ? (
                    <TbEyeglass2 className="text-[40px] opacity-75" />
                  ) : (
                    <TbEyeglassOff className="text-[40px] opacity-75" />
                  )}
                </Button>
              </div>
                     <div className="flex items-center w-full !mt-3">
                <Button type="submit" disabled={!valideValue} className=" !text-white !bg-orange-600 hover:!bg-black w-full !text-[18px] !p-3">
                  {
                    isLoading === true ? <CircularProgress color="inherit" />
                    :
                      'Change Password'
                  }</Button>
            </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;

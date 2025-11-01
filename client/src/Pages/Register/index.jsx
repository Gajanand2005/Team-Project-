import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TbEyeglass2 } from "react-icons/tb";
import { TbEyeglassOff } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../../utils/api";
import { MyContext} from  "../../App";
import { useContext } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formFields, setFormFields] = useState({
    name:"",
    email:"",
    password:""
  })

  const context = useContext(MyContext);
  const history = useNavigate();

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

    if(formFields.name===""){
      context.alertBox("error", "Please enter full name")
      return false
    }

    if(formFields.email===""){
      context.alertBox("error", "Please enter email id")
      return false
    }

    if(formFields.password===""){
      context.alertBox("error", "Please enter password")
      return false
    }


    postData("/api/user/register",formFields).then((res)=>{
      console.log(res)

      if(res?.error !== true) {
        setIsLoading(false);
        context.alertBox("success", res?.message || "Registered successfully")
        localStorage.setItem("userEmail", formFields.email)
        setFormFields({
          name:"",
          email:"",
          password:""
        })
        history("/verify")
      } else {
        context.alertBox("error", res?.message || "Something went wrong")
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
              Register with a new account
            </h3>

            <form action="" className="w-full mt-5" onSubmit={handleSubmit}>
               <div className="form-group w-full mb-5">
                <TextField
                  type="text"
                  id="name"
                  name="name"
                  value={formFields.name}
                  disabled={isLoading===true ? true : false}
                  label="Full Name "
                  variant="outlined"
                  className="w-full"
                  onChange={onChangeInput}
                />
              </div>
              <div className="form-group w-full mb-5">
                <TextField
                  type="email"
                  id="email"
                  name="email"
                  label="Email id"
                  value={formFields.email}
                  disabled={isLoading===true ? true : false}
                  variant="outlined"
                  className="w-full"
                  onChange={onChangeInput}
                />
              </div>
              <div className="form-group w-full !mb-5 relative">
                <TextField
                 type={isShowPassword=== false ? 'password' : 'text'}
                  id="password"
                  name="password"
                  label="Password "
                  variant="outlined"
                  className="w-full"
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

            
                
            <div className="flex items-center w-full !mt-3">
                <Button type="submit" disabled={!valideValue} className="!text-white !bg-orange-600 hover:!bg-black w-full !text-[18px] !p-3 flex gap-3">
                  {
                    isLoading === true ?   <CircularProgress color="inherit" />
                    :
                    'Register'
                  }

               </Button>
            </div>

            <p className="text-center">Already have an account? <Link className="link text-[14px] font-[600] text-orange-600" to='/login'>Sign in</Link></p>

            <p className="text-center font-[500]">Or continue with social account</p>
            <Button className="flex gap-3 w-full !bg-[#f1f1f1] !text-[18px] !p-3  "><FcGoogle className="text-[20px]" />Login with Google</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;

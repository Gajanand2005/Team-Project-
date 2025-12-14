import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TbEyeglass2 } from "react-icons/tb";
import { TbEyeglassOff } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { postData, fetchDataFromApi } from "../../Utils/Api";
import { MyContext } from "../../App";
import CircularProgress from '@mui/material/CircularProgress';
import { FaS } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../../firebase";
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();




const Register = () => {
  const [isLoading, setIsLoading]= useState(false)
  const [isShowPassword, setIsShowPassword] = useState(false);
 const [formFields, setFormFields]= useState({
   name:"",
   email : "",
   password : ""
 })

  const context = useContext(MyContext)
  const history = useNavigate();


  useEffect(() => {
    
  window.scrollTo(0,0)
  
  }, [])

 const onchangeInput=(e)=>{
  const {name, value}= e.target;
  setFormFields(()=>{
    return{
      ...formFields,
      [name]: value
    }
  })
 }

 const valideValue = Object.values(formFields).every(el => el)

 const handleSubmit= (e)=>{
  e.preventDefault();


  if(formFields.name===""){
    context.alertBox("error","Please enter full name ")
    return false
  }

  if(formFields.email===""){
    context.alertBox("error","Please enter email id ")
    return false
  }

    if(formFields.password===""){
    context.alertBox("error","Please enter password ")
    return false
  }

  setIsLoading(true);

  postData("/api/user/register",formFields).then((res)=>{

    if(res?.error !== true){
       setIsLoading(false)
       context.alertBox("success",res?.message)
       localStorage.setItem("userEmail",formFields.email)
   setFormFields({
    name: "",
    email: "",
    password:  "",
   })

     history('/verify')

    }else{
       context.alertBox("error",res?.message);

       setIsLoading(false)
    }
  }).catch((error)=>{
    setIsLoading(true);
    context.alertBox("error","Registration failed. Please try again.");
  })
 }

 const authWithGoogle=()=>{

  signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    const fields = {
      name: user.providerData[0].displayName,
      email: user.providerData[0].email,
      password: null,
      avatar: user.providerData[0].photoURL,
      mobile:user.providerData[0].phoneNumber,
      role: "USER"
    };

    postData("/api/user/authWithGoogle",fields).then((res)=>{

    if(res?.error !== true){
       setIsLoading(false)
       context.alertBox("success",res?.message)
       localStorage.setItem("userEmail",fields.email)
       localStorage.setItem("accessToken", res?.data?.accessToken);
       localStorage.setItem("refreshToken", res?.data?.refreshToken);

       context.setIsLogin(true);

       // Fetch user details after login
       fetchDataFromApi("/api/user/user-details").then((userRes) => {
         if (userRes?.success) {
           context.setUserData(userRes?.data);
         } else {
           // If fetching user details fails, alert but keep login state
           context.alertBox("error", "Failed to fetch user details.");
         }
       }).catch((error) => {
         // If fetching user details fails, alert but keep login state
         context.alertBox("error", "Failed to fetch user details.");
       });

     history('/')

    }else{
       context.alertBox("error",res?.message);

       setIsLoading(false)
    }
  })

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });


 }

  return (
    <>
      <section className="section py-10 ">
        <div className="container items-center justify-center flex ">
          <div className="card shadow-md w-full max-w-[500px] m-auto rounded-md bg-white p-5 px-4 md:px-10 ">
            <h3 className="text-center text-[20px] text-black font-[500]">
              Register with a new account
            </h3>
            <form action="" className="w-full !mt-5" onSubmit={handleSubmit}>
               <div className="form-group w-full !mb-5">
                <TextField
                  type="text"
                  id="name"
                  value={formFields.name}
                  disabled={isLoading=== true ? true : false}
                  name ="name"
                  label="Full Name "
                  variant="outlined"
                  className="w-full"
                  onChange={onchangeInput}
                />
              </div>
              <div className="form-group w-full !mb-5">
                <TextField
                  type="email"
                  id="email"
                  name="email"
                  label="Email id"
                  value={formFields.email}
                    disabled={isLoading=== true ? true : false}
                  variant="outlined"
                  className="w-full"
                  onChange={onchangeInput}
                />
              </div>
              <div className="form-group w-full !mb-5 relative">
                <TextField
                  id="password"
                  type={isShowPassword=== false ? 'password' : 'text'}
                  label="Password "
                  name="password"
                  value={formFields.password}
                    disabled={isLoading=== true ? true : false}
                  variant="outlined"
                  className="w-full"
                  onChange={onchangeInput}
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
                <Button className=" !text-white !bg-orange-600 hover:!bg-black w-full !text-[18px] !p-3 flex gap-3" type="submit" disabled={!valideValue} >
                  {
                    isLoading === true ? <CircularProgress color="inherit"/>
                    :
                    'Register'
                  }
                  </Button>
            </div>

            <p className="text-center">Already have an account? <Link className="link text-[14px] font-[600] text-orange-600" to='/login'>Sign in</Link></p>

            <p className="text-center font-[500]">Or continue with social account</p>
            <Button className="flex gap-3 w-full !bg-[#f1f1f1] !text-[18px] !p-3  " onClick={authWithGoogle}><FcGoogle className="text-[20px]"  />Register with Google</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;

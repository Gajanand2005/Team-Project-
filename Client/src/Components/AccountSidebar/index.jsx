import React, { useContext, useEffect, useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { PiBagFill } from "react-icons/pi";
import { TbHeartHandshake } from "react-icons/tb";
import { SlLogout } from "react-icons/sl";
import { NavLink } from "react-router";
import Button from "@mui/material/Button";
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import {  fetchDataFromApi, uploadImage } from '../../Utils/Api.js';
import { LuMapPinHouse } from "react-icons/lu";
import "./style.css"

const AccountSidebar = () => {

const [previews, setPreviews] = useState([]);
const [uploading, setUploading] = useState(false);

  const context = useContext(MyContext);

  useEffect(()=>{
    const userAvtar = [];
    if(context?.userData?.avatar!=="" && context?.userData?.avatar!==undefined){
        userAvtar.push(context?.userData?.avatar);
    setPreviews(userAvtar)
    }
   
  })


let img_arr = [];
let uniqueArray= [];
let selectedImages = [];

const formdata = new FormData();
const onChangeFile = async (e, apiEndPoint) => {
  try {
    setPreviews([]);
    const files = e.target.files;
    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      if (files[i] && (files[i].type === "image/jpeg" || files[i].type === "image/jpg" ||
          files[i].type === "image/webp" ||
          files[i].type === "image/gif" ||
          files[i].type === "image/png"
        )
      ) {
       const file = files[i];
       selectedImages.push(file);
       formdata.append(`avatar`,file);
       uploadImage("/api/user/user-avatar",formdata).then((res)=>{
     setUploading(false);
     let avatar =[];
     avatar.push(res?.data?.avatar);
     setPreviews(avatar);
      })}else{
        setUploading(false);
        return false;
      }
    }

  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  // Always remove tokens from localStorage to ensure logout on client side
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  context.setIsLogin(false);
  context.setUserData(null);
  context.setUserData(null);

  fetchDataFromApi(
    `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
    { withCredentials: true }
  ).then((res) => {
  }).catch(() => {
    
  });
  context?.setCartData([]);
  context?.setMyListData([]);
  history("/");
};


  return (
    <>
      <div className="card bg-white shadow-md rounded-md sticky top-[160px] ">
              <div className="w-full p-4 md:p-5 flex items-center justify-center flex-col ">
                <div className="w-[90px] md:w-[110px] h-[90px] md:h-[110px] rounded-full overflow-hidden !mb-3 relative group flex items-center justify-center bg-gray-200">
                   {
                   uploading === true ? <CircularProgress color='inherit' /> :
                   <>
                   {
                    previews?.length!==0 ? previews?.map((img,index)=>{
                     return (
                         <img
                    src={img}
                    key={index}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                     )
                    }) :
                       <img
                    src={'/user.png'}
                
                    alt=""
                    className="w-full h-full object-cover"
                  />
                   }
                     
                   </>
                 
                   }
                 
                  
                 

                  <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100 ">
                    <FaCloudUploadAlt className="text-[#fff] text-[20px] md:text-[25px]" />
                    <input
                      type="file"
                      className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
                      accept='image/*'
                      onChange={(e)=>
                        onChangeFile(e,"/api/user/user-avatar")
                      }
                      name="avatar"
                    />
                  </div>
                </div>

                <h3 className="text-[18px] md:text-[20px] font-[600]">{context?.userData?.name}</h3>
                <p className="text-[12px] md:text-[14px] font-[600]">{context?.userData?.email}</p>
              </div>

              <ul className="list-none pb-5 bg-[#f1f1f1] myAccountTabs">
                <li className="w-full">
                  <NavLink
                    to="/my-account" exact={true} activeClassName="isActive">
                    <Button className="flex w-full !px-4 md:!px-5 !justify-start !text-left !text-[rgba(0,0,0,0.7)] !rounded-none items-center gap-2 ">
                      <FaHouseUser className="text-[18px] md:text-[20px]" />
                      <span className="text-[14px] md:text-[16px]">User Profile</span>{" "}
                    </Button>
                  </NavLink>
                </li>

                     <li className="w-full">
                  <NavLink
                    to="/address" exact={true} activeClassName="isActive">
                    <Button className="flex w-full !px-4 md:!px-5 !justify-start !text-left !text-[rgba(0,0,0,0.7)] !rounded-none items-center gap-2 ">
                      <LuMapPinHouse className="text-[18px] md:text-[20px]" />
                      <span className="text-[14px] md:text-[16px]"> Address</span>{" "}
                    </Button>
                  </NavLink>
                </li>
                     

                <li className="w-full">
                    <NavLink
                    to="/my-list" exact={true} activeClassName="isActive">
                  <Button className="flex w-full !px-4 md:!px-5 !justify-start !text-left !text-[rgba(0,0,0,0.7)] !rounded-none items-center gap-2 ">
                    <TbHeartHandshake className="text-[18px] md:text-[20px]" />
                    <span className="text-[14px] md:text-[16px]">My List</span>{" "}
                  </Button>
                  </NavLink>
                </li>
                <li className="w-full">
                     <NavLink
                    to="/my-order" exact={true} activeClassName="isActive">
                  <Button className="flex w-full !px-4 md:!px-5 !justify-start !text-left !text-[rgba(0,0,0,0.7)] !rounded-none items-center gap-2 ">
                    <PiBagFill className="text-[18px] md:text-[20px]" />
                    <span className="text-[14px] md:text-[16px]">My Order</span>{" "}
                  </Button>
                  </NavLink>
                </li>
                <li className="w-full">

                  <Button className="flex w-full !px-4 md:!px-5 !justify-start !text-left !text-[rgba(0,0,0,0.7)] !rounded-none items-center gap-2 "  onClick={logout}>
                    <SlLogout className="text-[18px] md:text-[20px]" />
                    <span className="text-[14px] md:text-[16px]">Logout</span>{" "}
                  </Button>

                </li>
              </ul>
            </div> 
    </>
  )
}

export default AccountSidebar



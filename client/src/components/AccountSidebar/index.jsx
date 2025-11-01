import React from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { PiBagFill } from "react-icons/pi";
import { TbHeartHandshake } from "react-icons/tb";
import { SlLogout } from "react-icons/sl";
import { NavLink } from "react-router";
import Button from "@mui/material/Button";

const AccountSidebar = () => {
  return (
    <>
      <div className="card bg-white shadow-md rounded-md sticky top-[10px] ">
              <div className="w-full p-4 md:p-5 flex items-center justify-center flex-col ">
                <div className="w-[90px] md:w-[110px] h-[90px] md:h-[110px] rounded-full overflow-hidden !mb-3 relative group">
                  <img
                    src="https://imgs.search.brave.com/s0yRgvnWX8rHZngQu2PRnV_KIXWykff9K69XuYcGFSg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNS9Qcm9m/aWxlLU1hbGUtUE5H/LnBuZw"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100 ">
                    <FaCloudUploadAlt className="text-[#fff] text-[20px] md:text-[25px]" />
                    <input
                      type="file"
                      className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <h3 className="text-[18px] md:text-[20px] font-[600]">Gagan</h3>
                <p className="text-[12px] md:text-[14px] font-[600]">Gagan2005@gmail.com</p>
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

                  <Button className="flex w-full !px-4 md:!px-5 !justify-start !text-left !text-[rgba(0,0,0,0.7)] !rounded-none items-center gap-2 ">
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

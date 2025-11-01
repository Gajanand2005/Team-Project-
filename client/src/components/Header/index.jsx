import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdGitCompare } from "react-icons/io";
import { GiTechnoHeart } from "react-icons/gi";
import Tooltip from '@mui/material/Tooltip';
import Navigation from "./Navigation";
import { MyContext } from "../../App";
import Button from "@mui/material/Button";
import { FaUserAstronaut } from "react-icons/fa";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { PiBagFill } from "react-icons/pi";
import { TbHeartHandshake } from "react-icons/tb";
import { SlLogout } from "react-icons/sl";


const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
   const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const context = useContext(MyContext)

  return (
    <>
      <header className="bg-white">
        <div className="top-strip py-1 sm:py-2 border-t-[1px] border-gray-300 border-b-[1px] ">
          <div className="container">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="col1 w-full sm:w-[50%] lg:w-[60%]">
                <p className="text-[9px] sm:text-[11px] lg:text-[13px] font-[500]">
                  Get up to 50% off new season styles, limited time{" "}
                </p>
              </div>
              <div className="flex items-center justify-center sm:justify-end col2 w-full sm:w-[50%] lg:w-[40%]">
                <ul className="flex items-center gap-1 sm:gap-3 lg:gap-4">
                  <li className="list-none">
                    <Link
                      to="/help-center"
                      className="text-[9px] sm:text-[11px] lg:text-[13px] link font-[500] transition"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li className="list-none">
                    <Link
                      to="/order-tracking"
                      className="text-[9px] sm:text-[11px] lg:text-[13px] link font-[500] transition"
                    >
                      Order Tracking
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="header py-4 md:py-6 border-b-[1px] border-gray-300 ">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-3 ">
            <div className="col1 w-full md:w-[25%] flex justify-center md:justify-start">
              <Link to={"/"}>
                <img src={logo} alt="Logo" className="  object-cover bg-transparent "/>
              </Link>
            </div>
            <div className="col2 w-full md:w-[40%] ">
              <Search />
            </div>
            <div className="col3 w-full md:w-[35%] flex items-center justify-center md:justify-end pl-0 md:pl-7">
              <ul className="flex items-center justify-center md:justify-end gap-2 md:gap-3 w-full flex-wrap">
                {
                  context.isLogin === false ? 
                  <li className="list-none">
                  <Link
                    to="/login"
                    className="link transition text-[13px] sm:text-[15px] font-[500]"
                  >
                    Login
                  </Link>{" "}
                  | &nbsp;
                  <Link
                    to="/register"
                    className="link transition text-[13px] sm:text-[15px] font-[500]"
                  >
                    Register
                  </Link>
                </li>
                :
                <>
                 <div className=" !text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer" onClick={handleClick}>
                    <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1]"><FaUserAstronaut className="text-[20px] text-[rgba(0,0,0,0.7)]" /></Button>

                  <div className="info flex flex-col ">
                    <h4 className="text-[14px] leading-5 font-[600] !mb-0 capitalize text-left justify-start text-black">Gagan</h4>
                    <span className="text-[13px] text-left justify-start text-black">Gagan@gmail.com</span>
                  </div>

                 </div>
                  <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to='/my-account' className="w-full block">
        <MenuItem onClick={handleClose} className="flex gap-2 !py-2">
          <FaUserAstronaut />  <span className="text-[14px]">My account </span>
        </MenuItem>
        </Link>
         <Link to='/my-order' className="w-full block">
        <MenuItem onClick={handleClose}  className="flex gap-2 !py-2">
          <PiBagFill /> <span className="text-[14px]">Orders</span>
        </MenuItem>
        </Link>
         <Link to='/my-list' className="w-full block">
         <MenuItem onClick={handleClose}  className="flex gap-2 !py-2">
          <TbHeartHandshake /> <span className="text-[14px]">My List</span>
        </MenuItem>
        </Link>
        
         <MenuItem onClick={handleClose}  className="flex gap-2 !py-2">
          <SlLogout /> <span className="text-[14px]">Logout</span>
        </MenuItem>
        <Divider />
        
       
      </Menu>
                </>
                }
                
                <li>
                   <Tooltip title="Compare" placement="top">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary">
                     <IoMdGitCompare />
                    </StyledBadge>
                  </IconButton>
                  </Tooltip>
                </li>
                 <li>
                  <Tooltip title="Wishlist" placement="top">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary">
                   <GiTechnoHeart />
                    </StyledBadge>
                  </IconButton>
                  </Tooltip>
                </li>
                 <li>
                   <Tooltip title="Cart" placement="top">
                  <IconButton aria-label="cart"  onClick={()=>context.setOpenCartPanel(true)}>
                    <StyledBadge badgeContent={4} color="secondary">
                      <FaCartShopping />
                    </StyledBadge>
                  </IconButton>
                  </Tooltip>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Navigation/>

      </header>
    </>
  );
};

export default Header;

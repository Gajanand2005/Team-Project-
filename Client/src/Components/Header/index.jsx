import React, { use, useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../../assets/ba-removebg-preview.png";
import Search from "../Search/index.jsx";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdGitCompare } from "react-icons/io";
import { GiTechnoHeart } from "react-icons/gi";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation/index.jsx";
import { MyContext } from "../../App";
import Button from "@mui/material/Button";
import { FaUserAstronaut } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { PiBagFill } from "react-icons/pi"; 
import { TbHeartHandshake } from "react-icons/tb";
import { SlLogout } from "react-icons/sl";
import { fetchDataFromApi, postData } from "../../Utils/Api.js";
import './stle.css'
import { MdOutlineMenuOpen } from "react-icons/md";


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
const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  const context = useContext(MyContext);
  const history = useNavigate();


  const logout = () => {
    setAnchorEl(null);

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
      <header className="bg-white sticky top-0 z-[100] ">
        <div className="top-strip py-1 sm:py-2 border-t-[1px] border-gray-300 border-b-[1px] ">
          <div className="container">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="col1 w-full sm:w-[50%] lg:w-[60%] block">
                <p className="text-[9px] sm:text-[11px] lg:text-[13px] font-[500]">
                  S-Mal Couture
                </p>
              </div>
              <div className="flex items-center justify-center sm:justify-end col2 w-full sm:w-[50%] lg:w-[40%]">
                <ul className="flex items-center gap-1 sm:gap-3 lg:gap-4 w-full lg:w-[200px] justify-between ">
                  <li className="list-none">
                    <Link
                      to="/help-center"
                      className="text-[11px]  sm:text-[11px] lg:text-[13px] link !font-[500] transition"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li className="list-none">
                    <Link
                      to="/my-order"
                      className="text-[11px] sm:text-[11px] lg:text-[13px] link !font-[500] transition"
                    >
                      Order Tracking
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="header !py-1 !mt-2 lg:!mt-3  lg:py-4 border-b-[1px] border-gray-300">
          <div className="container flex flex-row items-center justify-between gap-0 lg:gap-3 ">
            <div className="col1 w-[40%] lg:w-[25%] flex items-center">
               {
                context?.windowWidth < 992 &&
                <Button className="text-[25px] !w-[30px]  !h-[30px] !rounded-full !text-gray-700 !min-w-[35px] lg:hidden mr-2 cursor-pointer"  onClick={()=>setIsOpenCatPanel(true)}><MdOutlineMenuOpen size={20}/ ></Button>
               }
              <Link to={"/"}>
                <img
                  src={logo}
                  alt="Logo"
                  className="h-[50px] md:h-[90px] w-[130px] md:w-[190px] object-cover bg-transparent"
                />
              </Link>
            </div>
            <div className="col2 w-full lg:w-[45%] fixed top-0 left-0 h-full lg:static p-2 lg:p-0 bg-white z-50 hidden lg:block ">
              <Search />
            </div>
           <div className="col3 w-[60%] md:w-[39%] flex items-center justify-end pl-0 md:pl-7 relative">
              <ul className="flex items-center justify-center md:justify-end gap-2 md:gap-3 w-full flex-wrap">
  <select 
  value={context?.currency}
  onChange={(e) => context?.setCurrency(e.target.value)}
  className="border px-1 lg:px-2 py-1 rounded cursor-pointer"
>
  <option value="INR">₹ INR</option>
  <option value="USD">$ USD</option>
  <option value="EUR">€ EUR</option>

  {/* NEW ONES */}
  <option value="GBP">£ GBP</option>
  <option value="AUD">A$ AUD</option>
  <option value="CAD">C$ CAD</option>
  <option value="AED">د.إ AED</option>
</select>

      
                {context?.isLogin === false ? (
                  <li className="list-none">
                    <Link
                      to="/login"
                      className="link transition text-[13px] sm:text-[15px] font-[500]"
                    >
                      Login
                    </Link>
                    | &nbsp;
                    <Link
                      to="/register"
                      className="link transition text-[13px] sm:text-[15px] font-[500]"
                    >
                      Register
                    </Link>
                  </li>
                ) : (
                  <>
                  <div
                    className=" !text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer"
                    onClick={handleClick}
                  >
                    <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1]">
                      <FaUserAstronaut className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>
                    {
                      context?.windowWidth > 992 &&
                      <div className="info flex flex-col ">
                        <h4 className="text-[14px] leading-5 font-[600] !mb-0 capitalize text-left text-black">
                          {context?.userData?.name}
                        </h4>
                        <span className="text-[13px] text-left text-black">
                          {context?.userData?.email}
                        </span>
                      </div>
                    }

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
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Link to="/my-account" className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 !py-2"
                      >
                        <FaUserAstronaut />{" "}
                        <span className="text-[14px]">My account </span>
                      </MenuItem>
                    </Link>
                    <Link to="/my-order" className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 !py-2"
                      >
                        <PiBagFill />{" "}
                        <span className="text-[14px]">Orders</span>
                      </MenuItem>
                    </Link>
                    <Link to="/my-list" className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 !py-2"
                      >
                        <TbHeartHandshake />{" "}
                        <span className="text-[14px]">My List</span>
                      </MenuItem>
                    </Link>

                    <MenuItem onClick={logout} className="flex gap-2 !py-2">
                      <SlLogout /> <span className="text-[14px]">Logout</span>
                    </MenuItem>
                    <Divider />
                  </Menu>
                   
                  </>
                )}

{context?.windowWidth > 768 && (
  <li>
    <Tooltip title="Wishlist" placement="top">
      <Link to="/my-list">
        <IconButton aria-label="wishlist">
          <StyledBadge badgeContent={context?.myListData?.length || 0}>
            <GiTechnoHeart />
          </StyledBadge>
        </IconButton>
      </Link>
    </Tooltip>
  </li>
)}        
                <li>
                  <Tooltip title="Cart" placement="top">
                    <IconButton
                      aria-label="cart"
                      onClick={() => context?.toggleCartPanel(true)}
                    >
                      <StyledBadge badgeContent={context?.cartData?.length !==0 ?context?.cartData?.length : 0} color="secondary">
                        <FaCartShopping  />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Navigation isOpenCatPanel={isOpenCatPanel} setIsOpenCatPanel={setIsOpenCatPanel} />
      </header>
    </>
  );
};

export default Header;



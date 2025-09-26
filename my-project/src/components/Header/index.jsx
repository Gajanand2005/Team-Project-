import React from "react";
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

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
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
        <div className="header py-6 border-b-[1px] border-gray-300 ">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-3 ">
            <div className="col1 w-full md:w-[25%]">
              <Link to={"/"}>
                <img src={logo} alt="Logo" />
              </Link>
            </div>
            <div className="col2 w-full md:w-[45%] ">
              <Search />
            </div>
            <div className="col3 w-full md:w-[30%] flex items-center justify-center md:justify-end pl-0 md:pl-7">
              <ul className="flex items-center justify-center md:justify-end gap-2 md:gap-3 w-full">
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
                  <IconButton aria-label="cart">
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

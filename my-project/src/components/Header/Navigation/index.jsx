import Button from "@mui/material/Button";
import React from "react";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineRocketLaunch } from "react-icons/md";

const Navigation = () => {
  return (
    <nav className="py-2">
      <div className="container flex items-center justify-end gap-9">
        <div className="col_1 w-[20%]">
          <Button className="!text-black gap-2 w-full ">
            <BsMenuButtonWideFill className="text-[15px]" /> Shop By Categories
            <FaAngleDown className="text-[18px] font-bold " />
          </Button>
        </div>
        <div className="col_2 w-[60%] ">
          <ul className="flex items-center gap-3 ">
            <li className="list-none">
              <Link to="/" className="link transition text-[16px] font-[500]">
              <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.7)] hover:!text-[#ff5252] ">
                Home
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition text-[16px] font-[500]">
               <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.7)] hover:!text-[#ff5252] ">
                Fashion
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition text-[16px] font-[500]">
               <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.7)] hover:!text-[#ff5252] ">
                Electronics
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition text-[16px] font-[500]">
               <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.7)] hover:!text-[#ff5252] ">
                Bags
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition text-[16px] font-[500]">
               <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.7)] hover:!text-[#ff5252] ">
                Footwear
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition text-[16px] font-[500]">
               <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.7)] hover:!text-[#ff5252] ">
                Groceries
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition text-[16px] font-[500]">
               <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.7)] hover:!text-[#ff5252] ">
                Beauty
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition text-[16px] font-[500]">
               <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.7)] hover:!text-[#ff5252] ">
                Wellness
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition text-[16px] font-[500]">
               <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.7)] hover:!text-[#ff5252] ">
                Jewelry
                </Button>
              </Link>
            </li>
          </ul>
        </div>

        <div className="col_3 w-[20%]">
            <p className="text-[14px] font-[500] flex items-center gap-3 md-0 mt-0"><MdOutlineRocketLaunch  className="text-[18px]"/>Free International Delivery</p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

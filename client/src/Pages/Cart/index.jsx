import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { GoTriangleDown } from "react-icons/go";
import { LuBaggageClaim } from "react-icons/lu";
import CartItems from "./CartItems";

const CartPage = () => {
 
  return (
    <>
      <section className="section py-10 pb-10">
        <div className="container flex flex-col lg:flex-row w-full lg:w-[80%] max-w-full lg:max-w-[80%] gap-5">
          <div className="leftPart w-full lg:w-[70%]">
            <div className="shadow-md rounded-md  bg-white">
              <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                <h2 className="text-[18px] font-[600]">Your Cart</h2>
                <p className="!mt-0">
                  There are{" "}
                  <span className="font-bold text-orange-600 ">2</span> product
                  is your cart{" "}
                </p>
              </div>
                <CartItems Size='S' Qty={1}/>
                <CartItems Size='S' Qty={1}/>
                <CartItems Size='S' Qty={1}/>
                <CartItems Size='S' Qty={1}/>

                
            </div>
          </div>

          <div className="rightPart w-full lg:w-[30%]">
            <div className="shadow-md rounded-md bg-white p-5">
              <h3 className="pb-3 text-[15px] font-[600] text-black">
                Cart Totals
              </h3>
              <hr />
              <p className="flex items-center justify-between">
                <span className="text-[14px] font-[600]">Subtotal </span>
                <span className="text-orange-600 font-[600]">$1,300.00</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[14px] font-[600]">Shipping </span>
                <span className="font-[600]">Free</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[14px] font-[600]">Estimate for </span>
                <span className="font-[600]">India</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[14px] font-[600]">total </span>
                <span className="text-orange-600 font-[600]">$1,300.00</span>
              </p>
              <br />
              <Button className="!bg-orange-600 !rounded-md !text-white hover:!bg-black w-full flex gap-3">
                CheckOut <LuBaggageClaim className="text-[20px] " />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;

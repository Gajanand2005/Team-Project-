import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { LuBaggageClaim } from "react-icons/lu";
import CartItems from "./CartItems.jsx";
import { MyContext } from "../../App";

const cleanPrice = (price) => {
  return Number(String(price).replace(/[^0-9.]/g, ""));
};

const CartPage = () => {
  const context = useContext(MyContext);

  const handleSizeChange = (itemId, newSize) => {
    context.updateCartSize(itemId, newSize);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subTotal = context.cartData?.length
    ? context.cartData
        .map((item) => cleanPrice(item.price) * item.quantity)
        .reduce((total, v) => total + v, 0)
    : 0;

  return (
    <>
      <section className="section py-10 pb-10">
        <div className="container flex flex-col lg:flex-row w-full lg:w-[80%] max-w-full lg:max-w-[80%] gap-5">

          <div className="leftPart w-full lg:w-[70%]">
            <div className="shadow-md rounded-md bg-white">
              <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                <h2 className="text-[18px] font-[600]">Your Cart</h2>
                <p className="!mt-0">
                  There are{" "}
                  <span className="font-bold text-orange-600 ">
                    {context?.cartData?.length}
                  </span>{" "}
                  products in your cart{" "}
                </p>
              </div>

              {context?.cartData?.length !== 0 ? (
                context?.cartData?.map((item, index) => (
                  <CartItems
                    size={item?.size}
                    qty={item?.quantity}
                    item={item}
                    key={index}
                    onSizeChange={(newSize) =>
                      handleSizeChange(item._id, newSize)
                    }
                  />
                ))
              ) : (
                <div className="flex items-center justify-center flex-col py-10 gap-5 ">
                  <img src="/bag.png" alt="" className="!w-[150px]" />
                  <h4 className="!mt-2 text-[20px] font-[600] text-blue-300">
                    Your Cart is Currently empty
                  </h4>
                  <Link to="/productListing">
                    <Button
                      className="!bg-orange-600 !text-white hover:!bg-black !mt-3"
                      onClick={() => context?.toggleCartPanel(false)}
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              )}
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
                <span className="text-orange-600 font-[600]">
                  {subTotal.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </span>
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
                <span className="text-[14px] font-[600]">Total </span>
                <span className="text-orange-600 font-[600]">
                  {subTotal.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </span>
              </p>

              <br />
              <Link to='/checkout'>
              <Button className="!bg-orange-600 !rounded-md !text-white hover:!bg-black w-full flex gap-3">
                CheckOut <LuBaggageClaim className="text-[20px]" />
              </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default CartPage;



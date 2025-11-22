import React, { useContext, useState } from "react";

import MyListItems from "./MyListItems";
import AccountSidebar from "../../Components/AccountSidebar";
import { MyContext } from "../../App";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const MyList = () => {
  const context = useContext(MyContext);

  return (
    <>
      <section className="py-10 w-full">
        <div className="container flex gap-5">
          <div className="col1 w-[20%]">
            <AccountSidebar />
          </div>

          <div className="col2 w-[70%]">
            <div className="shadow-md rounded-md  bg-white">
              <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                <h2 className="text-[18px] font-[600]">My List</h2>
                <p className="!mt-0">
                  There are
                  <span className="font-bold text-orange-600 ">
                    {" "}
                    {context?.myListData?.length}
                  </span>{" "}
                  product is My List
                </p>
              </div>

              {context?.myListData?.length !== 0 ? (
                context?.myListData?.map((item, index) => {
                  return <MyListItems item={item} />;
                })
              ) : (
                <div className="flex items-center justify-center flex-col py-10 px-3 ">
                  <img src="/list.png" className="w-[100px]" />
                  <h3 className="">WhisList is currently empty</h3>
                  <Link to="/">
                    <Button
                      className="!bg-orange-600 !text-white hover:!bg-black !mt-3"
                      onClick={() => {
                        context?.toggleCartPanel(false);
                      }}
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyList;

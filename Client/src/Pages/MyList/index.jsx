import React, { useContext, useEffect, useState } from "react";

import MyListItems from "./myListItems.jsx";
import AccountSidebar from "../../Components/AccountSidebar/index.jsx";
import { MyContext } from "../../App";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

const MyList = () => {
  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      history("/login");
    }
  }, [context?.isLogin]);

  return (
    <>
      <section className=" py-4 lg:py-10 w-full">
        <div className="container flex flex-col md:flex-row gap-5">
          <div className="col1 w-full md:w-[20%] hidden lg:block ">
            <AccountSidebar />
          </div>

          <div className="col2 w-full lg:w-[70%]">
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



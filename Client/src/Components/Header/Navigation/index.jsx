import Button from "@mui/material/Button";
import React, { useContext, useEffect, useState } from "react";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineRocketLaunch } from "react-icons/md";
import CategoryPanel from "./CategoryPanel";
import "./style.css";
import { fetchDataFromApi } from "../../../Utils/Api.js";
import { MyContext } from "../../../App.jsx";
import MobileNav from "./mobileNav.jsx";

const Navigation = (props) => {
  const [catData, setCatData] = useState([]);

const context = useContext(MyContext)

  useEffect(() => {
 setCatData(context?.catData);
  },[context?.catData]);
  return (
    <>
      <nav className="navigation">
        <div className="container flex items-center justify-start lg:justify-end gap-2 !md:gap-9">
          <div className="col_1 w-full md:w-[20%]">
            {
              context?.windowWidth > 992  &&
              <Button
              className="!text-black !font-bold gap-2 w-full !text-sm md:!text-base"
              onClick={() => props.setIsOpenCatPanel(!props.isOpenCatPanel)}
            >
              <BsMenuButtonWideFill className="text-[12px] md:text-[15px]" />{" "}
              Shop By Categories
              <FaAngleDown className="text-[14px] md:text-[18px] font-bold" />
            </Button>
            }
            
          </div>
          <div className="col_2 w-full md:w-[60%]">
            <ul className="flex items-center justify-center gap-2 md:gap-3 nav">
              <li className="list-none">
                <Link
                  to="/"
                  className="link transition text-[16px] font-[500] !font-bold !text-[rgba(0,0,0,0.7)] hover:!text-[#ff5252] cursor-pointer"
                >
                  <Button className="link transition !font-[500] !font-bold !text-[rgba(0,0,0,0.7)] hover:!text-[#ff5252]">
                    Home
                  </Button>
                </Link>
              </li>
              {catData?.length !== 0 &&
                catData?.map((cat, index) => {
                  return (
                    <li className="list-none relative" key={cat._id}>
                      <Link
                        to={`/productListing?catId=${cat?._id}`}
                        className="link transition text-[16px] !font-[500]"
                      >
                        <Button className="link transition !font-[500] !font-bold !text-[rgba(0,0,0,0.7)] hover:!text-[#ff5252]">
                          {cat?.name}
                        </Button>
                      </Link>
                      {cat?.children?.length !== 0 && (
                        <div className="submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                          <ul>
                            {cat?.children?.map((subCat, index_) => {
                              return (
                                <li
                                  className="list-none w-full relative"
                                  key={subCat._id}
                                >
                                  <Link to={`/productListing?subCatId=${subCat?._id}`} className="w-full">
                                    <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                      {subCat?.name}
                                    </Button>
                                  </Link>
                                  {subCat?.children?.length !== 0 && (
                                    <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                                      <ul>
                                        {subCat?.children?.map(
                                          (thirdLevelCat, index__) => {
                                            return (
                                              <li
                                                className="list-none w-full"
                                                key={thirdLevelCat._id}
                                              >
                                                <Link
                                                  to={`/productListing?thirdSubCatId=${thirdLevelCat?._id}`}
                                                  className="w-full"
                                                >
                                                  <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                    {thirdLevelCat?.name}
                                                  </Button>
                                                </Link>
                                              </li>
                                            );
                                          }
                                        )}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="col_3 w-full md:w-[20%] hidden md:flex justify-end hidden lg:block">
            <p className="text-[12px] md:text-[14px] font-bold flex items-center gap-2 md:gap-3 mb-0 mt-0">
              <MdOutlineRocketLaunch className="text-[14px] md:text-[18px]" />{" "}
              Worldwide Shipping
            </p>
          </div>
        </div>
      </nav>
      <CategoryPanel
        setIsOpenCatPanel={props.setIsOpenCatPanel}
        isOpenCatPanel={props.isOpenCatPanel}
       propsSetIsOpenCatPanel={props.setIsOpenCatPanel}
        data={catData}
      />

      

    </>
  );
};

export default Navigation;



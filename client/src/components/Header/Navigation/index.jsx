import Button from "@mui/material/Button";
import React, { useContext, useEffect, useState } from "react";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineRocketLaunch } from "react-icons/md";
import CategoryPanel from "./CategoryPanel";
import "./style.css";
import { fetchDataFromApi } from "../../../Utlis/Api.js";
import { MyContext } from "../../../App.jsx";

const Navigation = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  const [catData, setCatData] = useState([]);

const context = useContext(MyContext)

  useEffect(() => {
 setCatData(context?.catData);
  },[context?.catData]);

  const openCategoryPanel = (value) => {
    setIsOpenCatPanel(value !== undefined ? value : !isOpenCatPanel);
  };
  return (
    <>
      <nav className="py-2">
        <div className="container flex items-center justify-between gap-2 md:gap-9">
          <div className="col_1 w-full md:w-[20%]">
            <Button
              className="!text-black !font-bold gap-2 w-full !text-sm md:!text-base"
              onClick={openCategoryPanel}
            >
              <BsMenuButtonWideFill className="text-[12px] md:text-[15px]" />{" "}
              Shop By Categories
              <FaAngleDown className="text-[14px] md:text-[18px] font-bold" />
            </Button>
          </div>
          <div className="col_2 w-full md:w-[60%] hidden md:block">
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
                    <li className="list-none relative" key={index}>
                      <Link
                        to="/ProductListing"
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
                                  key={index_}
                                >
                                  <Link to="/ProductListing" className="w-full">
                                    <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                      {subCat?.name}
                                    </Button>
                                  </Link>
                                  {subCat?.children?.length !== 0 && (
                                    <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                                      <ul>
                                        {subCat?.children?.map(
                                          (thirdLavelCat, index__) => {
                                            return (
                                              <li
                                                className="list-none w-full"
                                                key={index__}
                                              >
                                                <Link
                                                  to="/ProductListing"
                                                  className="w-full"
                                                >
                                                  <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                    {thirdLavelCat?.name}
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
          <div className="col_3 w-full md:w-[20%] hidden md:flex justify-end">
            <p className="text-[12px] md:text-[14px] font-bold flex items-center gap-2 md:gap-3 mb-0 mt-0">
              <MdOutlineRocketLaunch className="text-[14px] md:text-[18px]" />{" "}
              Worldwide Shipping
            </p>
          </div>
        </div>
      </nav>
      {
        catData?.length!==0 &&
        <CategoryPanel
        openCategoryPanel={openCategoryPanel}
        isOpenCatPanel={isOpenCatPanel}
        data={catData}
      />
      }
      
    </>
  );
};

export default Navigation;

import Button from "@mui/material/Button";
import React from "react";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineRocketLaunch } from "react-icons/md";
import CategoryPanel from "./CategoryPanel";
import "./style.css";

const Navigation = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = React.useState(false);
  const openCategoryPanel = (value) => {
    setIsOpenCatPanel(value !== undefined ? value : !isOpenCatPanel);
  };
  return (
    <>
      <nav className="py-2">
        <div className="container flex items-center justify-end gap-9">
          <div className="col_1 w-[20%]">
            <Button
              className="!text-black !font-bold gap-2 w-full"
              onClick={openCategoryPanel}
            >
              <BsMenuButtonWideFill className="text-[15px]" /> Shop By
              Categories
              <FaAngleDown className="text-[18px] font-bold  " />
            </Button>
          </div>
          <div className="col_2 w-[60%] ">
            <ul className="flex items-center gap-3 nav ">
              <li className="list-none">
                <Link
                  to="/"
                  className="link transition text-[16px] font-[500] !font-bold !text-[rgba(0,0,0,0.7)] hover:!text-[#ff5252] cursor-pointer">
                  <Button className="link transition !font-[500] !font-bold !text-[rgba(0,0,0,0.7)] hover:!text-[#ff5252]">
                    Home
                  </Button>
                </Link>
              </li>
              <li className="list-none relative">
                <Link
                  to="/ProductListing"
                  className="link transition text-[16px] !font-[500]"
                >
                  
                  <Button className="link transition !font-[500] !font-bold !text-[rgba(0,0,0,0.7)] hover:!text-[#ff5252]">
                    Fashine
                  </Button>
                </Link>

                <div className="submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                  <ul>
                    <li className="list-none w-full relative">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                          Suits
                        </Button>
                      </Link>
                      <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                        <ul>
                          <li className="list-none w-full">
                            <Link to="/" className="w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                Organza
                              </Button>
                            </Link>
                          </li>

                          <li className="list-none w-full">
                            <Link to="/" className="w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                Georzette
                              </Button>
                            </Link>
                          </li>
                          <li className="list-none w-full">
                            <Link to="/" className="w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                Silk
                              </Button>
                            </Link>
                          </li>
                          <li className="list-none w-full">
                            <Link to="/" className="w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                Banarsi
                              </Button>
                            </Link>
                          </li>
                          <li className="list-none w-full">
                            <Link to="/" className="w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                Cotton
                              </Button>
                            </Link>
                          </li>
                          <li className="list-none w-full">
                            <Link to="/" className="w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                Chinnon
                              </Button>
                            </Link>
                          </li>
                          <li className="list-none w-full">
                            <Link to="/" className="w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                Woolen
                              </Button>
                            </Link>
                          </li>
                          <li className="list-none w-full">
                            <Link to="/" className="w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                Lucknowi
                              </Button>
                            </Link>
                          </li>
                          <li className="list-none w-full">
                            <Link to="/" className="w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                Crepe
                              </Button>
                            </Link>
                          </li>
                          <li className="list-none w-full">
                            <Link to="/" className="w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                Net
                              </Button>
                            </Link>
                          </li>
                          <li className="list-none w-full">
                            <Link to="/" className="w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                Chiffon
                              </Button>
                            </Link>
                          </li>
                        </ul>
                      </div>


                    </li>
                  </ul>
                </div>
              </li>
              <li className="list-none relative">
                <Link
                  to="/"
                  className="link transition text-[16px] !font-[500]"
                >
                  <Button className="link transition !font-[500] !font-bold !text-[rgba(0,0,0,0.7)] hover:!text-[#ff5252]">
                    Bags
                  </Button>
                </Link>

                <div className="submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                  <ul>
                    <li className="list-none w-full relative">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                          Man 
                        </Button>
                      </Link>
                      <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                        <ul>
                          
                         
                        </ul>
                      </div>
                    </li>
                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                          Woman
                        </Button>
                      </Link>
                      <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                        
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
               <li className="list-none relative">
                <Link
                  to="/"
                  className="link transition text-[16px] !font-[500]"
                >
                  <Button className="link transition !font-[500] !font-bold !text-[rgba(0,0,0,0.7)] hover:!text-[#ff5252]">
                   Footwear
                  </Button>
                </Link>
            
                
              </li>
            </ul>
          </div>
          <div className="col_3 w-[20%]">
            <p className="text-[14px] font-bold flex items-center gap-3 mb-0 mt-0">
              <MdOutlineRocketLaunch className="text-[18px]" /> WorldWide Shipping
            </p>
          </div>
        </div>
      </nav>
      <CategoryPanel
        openCategoryPanel={openCategoryPanel}
        isOpenCatPanel={isOpenCatPanel}
      />
    </>
  );
};

export default Navigation;

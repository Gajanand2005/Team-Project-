import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png'
import Button from "@mui/material/Button";
import { MdSpaceDashboard } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { PiSlideshowBold } from "react-icons/pi";
import { MdCategory } from "react-icons/md";
import { SiPiapro } from "react-icons/si";
import { SiTicktick } from "react-icons/si";
import { HiOutlineLogout } from "react-icons/hi";
import { FaAngleDown } from "react-icons/fa6";
import { Collapse } from 'react-collapse';
import { PiDiamondLight } from "react-icons/pi";
import { MyContext } from "../../App";

const Sidebar = () => {

  const context = useContext(MyContext); 
  const { isSidebarOpen, sidebarWidth } = context;     

  const [submenuIndex, setSubmenuIndex] = useState(null);

  const isOpenSubMenu = (index) => {
    setSubmenuIndex(submenuIndex === index ? null : index);
  };

  return (
   <div 
  className={`sidebar bg-white border-r border-gray-200 py-2 px-4 w-full h-full overflow-y-auto transition-all`}
>

      {/* Logo */}
      <div className="py-2 w-full flex justify-center border-b border-[rgba(0,0,0,0.1)] shrink-0 rounded-2xl" onClick={()=>{
        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
        setSubmenuIndex(null);
      }} 
      >
        <Link to="/">
          <img
            src={logo}
            alt="UDR Crafts Logo"
            className="w-[190px] h-[130px] object-contain"
          />
        </Link>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-3">
        <ul className="mt-4 overflow-y-scroll max-h-[80vh]">

          <li>
            <Link to="/" 
            onClick={()=>{
        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
        setSubmenuIndex(null);
      }}
      >
              <Button className="w-full !capitalize !items-center !justify-start !text-[16px] !font-[600] !text-black/80 !py-3 !px-4 !rounded-md hover:!bg-black/5 transition-all gap-3">
                <MdSpaceDashboard className="text-[23px]" />
                <span> Dashboard </span>
              </Button>
            </Link>
          </li>

          <li>
            <Link to="/users" onClick={()=>{
        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
        setSubmenuIndex(null);
      }} >
              <Button className="w-full !capitalize !items-center !justify-start !text-[16px] !font-[600] !text-black/80 !py-3 !px-4 !rounded-md hover:!bg-black/5 transition-all gap-3">
                <MdGroups className="text-[25px]" />
                <span> Users </span>
              </Button>
            </Link>
          </li>

          {/* Home Banner */}
          <li>
            <Button
              className="w-full !capitalize !items-center !justify-start !text-[16px] !font-[600] !text-black/80 !py-3 !px-4 !rounded-md hover:!bg-black/5 transition-all gap-3"
              onClick={() => isOpenSubMenu(2)}
            >
              <PiSlideshowBold className="text-[23px]" />
              <span> Home Banner </span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
                <FaAngleDown className={`transition-all ${submenuIndex === 2 ? "rotate-180" : ""}`} />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 2}>
              <ul className="w-full">
                <li>
                  <Link to="/homeSlider/list"
                  onClick={()=>{
        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
        setSubmenuIndex(null);
      }} 
                  >
                    <Button className="w-full !capitalize !justify-start !text-[14px] !font-[400] !text-black/80 !py-3 !px-4 !pl-10 hover:!bg-black/5 gap-3">
                      <PiDiamondLight />
                      Home Banner List
                    </Button>
                  </Link>
                </li>

                <li>
                  <Button
                    className="w-full !capitalize !justify-start !text-[14px] !font-[400] !text-black/80 !py-3 !px-4 !pl-10 hover:!bg-black/5 gap-3"
                    onClick={() =>{
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Home Slide",
                      })
                       context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                       setSubmenuIndex(null);
                    }
                      
                    }
                  >
                    <PiDiamondLight />
                    Add New Banner
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>

          {/* Category */}
          <li>
            <Button
              className="w-full !capitalize !items-center !justify-start !text-[16px] !font-[600] !text-black/80 !py-3 !px-4 !rounded-md hover:!bg-black/5 transition-all gap-3"
              onClick={() => isOpenSubMenu(3)}
            >
              <MdCategory className="text-[23px]" />
              <span> Category </span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
                <FaAngleDown className={`transition-all ${submenuIndex === 3 ? "rotate-180" : ""}`} />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 3}>
              <ul className="w-full">
                <li>
                  <Link to="/category/list" onClick={()=>{
        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
        setSubmenuIndex(null);
      }} >
                    <Button className="w-full !justify-start !text-[14px] !py-3 !px-4 !pl-10 hover:!bg-black/5 gap-3">
                      <PiDiamondLight />
                      Category List
                    </Button>
                  </Link>
                </li>

                <li>
                  <Link to="/subCategory/list" onClick={()=>{
        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
        setSubmenuIndex(null);
      }} >
                    <Button className="w-full !justify-start !text-[14px] !py-3 !px-4 !pl-10 hover:!bg-black/5 gap-3">
                      <PiDiamondLight />
                      Sub Category List
                    </Button>
                  </Link>
                </li>

                <li>
                  <Button
                    className="w-full !justify-start !text-[14px] !py-3 !px-4 !pl-10 hover:!bg-black/5 gap-3"
                    onClick={() =>{
                         context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add New Sub Category",
                      })
                       context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                       setSubmenuIndex(null);
                    }
                   
                    }
                  >
                    <PiDiamondLight />
                    New Sub Category
                  </Button>
                </li>

                <li>
                  <Button
                    className="w-full !justify-start !text-[14px] !py-3 !px-4 !pl-10 hover:!bg-black/5 gap-3"
                    onClick={() =>{
                        context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add New Category",
                      }) 
                      context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                      setSubmenuIndex(null);
                    }
                    
                    }
                  >
                    <PiDiamondLight />
                    Add New Category
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>

          {/* Products */}
          <li>
            <Button
              className="w-full !capitalize !items-center !justify-start !text-[16px] !font-[600] !text-black/80 !py-3 !px-4 hover:!bg-black/5 gap-3"
              onClick={() => isOpenSubMenu(4)}
            >
              <SiPiapro className="text-[23px]" />
              <span> Products </span>
              <FaAngleDown className={`ml-auto transition-all ${submenuIndex === 4 ? "rotate-180" : ""}`} />
            </Button>

            <Collapse isOpened={submenuIndex === 4}>
              <ul className="w-full">
                <li>
                  <Link to="/products" onClick={()=>{
        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
        setSubmenuIndex(null);
      }}  >
                    <Button className="w-full !text-[14px] !py-3 !px-4 !pl-10 hover:!bg-black/5 gap-3">
                      <PiDiamondLight />
                      Product List
                    </Button>
                  </Link>
                </li>

                <li>
                  <Button
                    className="w-full !text-[14px] !py-3 !px-4 !pl-10 hover:!bg-black/5 gap-3"
                    onClick={() =>{
                         context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Product",
                      })
                      context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                      setSubmenuIndex(null);
                    }
                   
                    }
                  >
                    <PiDiamondLight />
                    Product Upload
                  </Button>
                </li>

                <li>
                  <Link to="/product/addSize" onClick={()=>{
        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
        setSubmenuIndex(null);
      }} >
                    <Button className="w-full !text-[14px] !py-3 !px-4 !pl-10 hover:!bg-black/5 gap-3">
                      <PiDiamondLight />
                      Product Size
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          {/* Orders */}
          <li>
            <Link to="/orders" onClick={()=>{
        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
        setSubmenuIndex(null);
      }} >
              <Button className="w-full !text-[16px] !font-[600] !py-3 !px-4 hover:!bg-black/5 gap-3">
                <SiTicktick className="text-[23px]" />
                Orders
              </Button>
            </Link>
          </li>

        </ul>
      </div>

      {/* Logout */}
      <div className="shrink-0 px-3 py-2 border-t border-[rgba(0,0,0,0.1)]">
        <Link to="/logout">
          <Button className="w-full !text-[16px] !font-[600] !py-3 !px-4 hover:!bg-black/5 gap-3">
            <HiOutlineLogout className="text-[25px]" />
            Logout
          </Button>
        </Link>
      </div>
       <div className="sidebarOverlay fixed top-0 left-0 bg-[rgba(0,0,0,1)]  w-full h-fullz-[49] pointer-events-auto sm:pointer-events-none "
       onClick={()=>context?.isSidebarOpen(false)}
       ></div>
    </div>

   
  );
};

export default Sidebar;



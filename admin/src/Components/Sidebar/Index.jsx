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
  const { isSidebarOpen } = context;     

  const [submenuIndex, setSubmenuIndex] = useState(null);
  const isOpenSubMenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  }

  return (
    <div className={`sidebar fixed top-0 left-0 bg-[#f1f1f1] ${isSidebarOpen ? 'w-[23%]' : 'w-0'} h-screen border-r border-[rgba(0,0,0,0.1)] py-2 px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 bg-white`}>
      <div className="py-2 w-full flex justify-center border-b border-[rgba(0,0,0,0.1)] shrink-0 rounded-2xl">
        <Link to="/">
          <img
            src={logo}
            alt="UDR Crafts Logo"
            className="w-[190px] h-[130px] object-contain "
          />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <ul className="mt-4">
          <li>
            <Link to="/">
              <Button className="w-full !capitalize !items-center !justify-start !text-[16px] !font-[600] !text-[rgba(0,0,0,0.8)] !py-3 !px-4 !rounded-md hover:!bg-[rgba(0,0,0,0.05)] transition-all gap-3">
                <MdSpaceDashboard className="text-[23px]" />
                <span> Dashboard </span>
              </Button>
            </Link>
          </li>

          <li>
            <Link to='/users'>
            <Button
              className="w-full !capitalize !items-center !justify-start !text-[16px] !font-[600] !text-[rgba(0,0,0,0.8)] !py-3 !px-4 !rounded-md hover:!bg-[rgba(0,0,0,0.05)] transition-all gap-3"
              onClick={() => isOpenSubMenu(1)}
            >
              <MdGroups className="text-[25px]" />
              <span> Users </span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
               
              </span>
            </Button>
            </Link>
            
          </li>

          <li>
            <Button className="w-full !capitalize !items-center !justify-start !text-[16px] !font-[600] !text-[rgba(0,0,0,0.8)] !py-3 !px-4 !rounded-md hover:!bg-[rgba(0,0,0,0.05)] transition-all gap-3" onClick={() => isOpenSubMenu(2)}>
              <PiSlideshowBold className="text-[23px]" />
              <span> Home Banner </span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center" >
                <FaAngleDown className={`transition-all ${submenuIndex === 2 ? 'rotate-180' : ''}`} />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 2 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/homeSlider/list">
                    <Button className="w-full !capitalize !items-center !justify-start !text-[14px] !font-[400] !text-[rgba(0,0,0,0.8)] !py-3 !px-4 !pl-10 !rounded-md hover:!bg-[rgba(0,0,0,0.05)] transition-all gap-3">
                      <PiDiamondLight />
                      <span>
                        Home Banner List
                      </span>
                    </Button>
                  </Link>
                </li>

                <li className="w-full">
                  
                    <Button className="w-full !capitalize !items-center !justify-start !text-[14px] !font-[400] !text-[rgba(0,0,0,0.8)] !py-3 !px-4 !pl-10 !rounded-md hover:!bg-[rgba(0,0,0,0.05)] transition-all gap-3"onClick={()=>context.setIsOpenFullScreenPanel({
                      open: true,
                      model:"Add Home Slide"
                    })}>
                      <PiDiamondLight />
                      <span>
                        Add New Banner
                      </span>
                    </Button>
                
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <Button className="w-full !capitalize !items-center !justify-start !text-[16px] !font-[600] !text-[rgba(0,0,0,0.8)] !py-3 !px-4 !rounded-md hover:!bg-[rgba(0,0,0,0.05)] transition-all gap-3" onClick={() => isOpenSubMenu(3)}>
              <MdCategory className="text-[23px]" />
              <span>
                Category
              </span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center" >
                <FaAngleDown className={`transition-all ${submenuIndex === 3 ? 'rotate-180' : ''}`} />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 3 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/category/list">
                    <Button className="w-full !capitalize !items-center !justify-start !text-[14px] !font-[400] !text-[rgba(0,0,0,0.8)] !py-3 !px-4 !pl-10 !rounded-md hover:!bg-[rgba(0,0,0,0.05)] transition-all gap-3">
                      <PiDiamondLight />
                      <span>
                        Category List
                      </span>
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Link to="/subCategory/list">
                    <Button className="w-full !capitalize !items-center !justify-start !text-[14px] !font-[400] !text-[rgba(0,0,0,0.8)] !py-3 !px-4 !pl-10 !rounded-md hover:!bg-[rgba(0,0,0,0.05)] transition-all gap-3">
                      <PiDiamondLight />
                      <span>
                       Sub Category List
                      </span>
                    </Button>
                  </Link>
                </li>
                 <li className="w-full">
                 
                    <Button className="w-full !capitalize !items-center !justify-start !text-[14px] !font-[400] !text-[rgba(0,0,0,0.8)] !py-3 !px-4 !pl-10 !rounded-md hover:!bg-[rgba(0,0,0,0.05)] transition-all gap-3" onClick={()=>context.setIsOpenFullScreenPanel({
                      open: true,
                      model:"Add New Sub Category"
                    })}>
                      <PiDiamondLight />
                      <span>
                      New Sub CategoryList
                      </span>
                    </Button>
                 
                </li>
                <li className="w-full">
                 
                    <Button className="w-full !capitalize !items-center !justify-start !text-[14px] !font-[400] !text-[rgba(0,0,0,0.8)] !py-3 !px-4 !pl-10 !rounded-md hover:!bg-[rgba(0,0,0,0.05)] transition-all gap-3" onClick={()=>context.setIsOpenFullScreenPanel({
                      open: true,
                      model:"Add New Category"
                    })}>
                      <PiDiamondLight />
                      <span>
                        Add New Category
                      </span>
                    </Button>
               
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <Button className="w-full !capitalize !items-center !justify-start !text-[16px] !font-[600] !text-[rgba(0,0,0,0.8)] !py-3 !px-4 !rounded-md hover:!bg-[rgba(0,0,0,0.05)] transition-all gap-3" onClick={() => isOpenSubMenu(4)}>
              <SiPiapro className="text-[23px]" />
              <span>
                Products
              </span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center" >
                <FaAngleDown className={`transition-all ${submenuIndex === 4 ? 'rotate-180' : ''}`} />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 4 ? true : false}>
              <ul className="w-full">
               
                <li className="w-full">
                  <Link to="/products">
                    <Button className="w-full !capitalize !items-center !justify-start !text-[14px] !font-[400] !text-[rgba(0,0,0,0.8)] !py-3 !px-4 !pl-10 !rounded-md hover:!bg-[rgba(0,0,0,0.05)] transition-all gap-3">
                      <PiDiamondLight />
                      <span>
                        Product List
                      </span>
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  
                    <Button className="w-full !capitalize !items-center !justify-start !text-[14px] !font-[400] !text-[rgba(0,0,0,0.8)] !py-3 !px-4 !pl-10 !rounded-md hover:!bg-[rgba(0,0,0,0.05)] transition-all gap-3" onClick={()=>context.setIsOpenFullScreenPanel({
                      open: true,
                      model:"Add Product"
                    })}>
                      <PiDiamondLight />
                      <span>
                        Product Upload
                      </span>
                    </Button>
                
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <Link to='/orders'>
            <Button className="w-full !capitalize !items-center !justify-start !text-[16px] !font-[600] !text-[rgba(0,0,0,0.8)] !py-3 !px-4 !rounded-md hover:!bg-[rgba(0,0,0,0.05)] transition-all gap-3" onClick={() => isOpenSubMenu(5)}>
              <SiTicktick className="text-[23px]" />
              <span>
                Orders
              </span>
            </Button>
            </Link>
          </li>

        </ul>
      </div>

      <div className="shrink-0 px-3 py-2 border-t border-[rgba(0,0,0,0.1)]">
        <Link to="/logout">
          <Button className="w-full !capitalize !items-center !justify-start !text-[16px] !font-[600] !text-[rgba(0,0,0,0.8)] !py-3 !px-4 !rounded-md hover:!bg-[rgba(0,0,0,0.05)] transition-all gap-3">
            <HiOutlineLogout className="text-[25px]" />
            <span> Logout </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

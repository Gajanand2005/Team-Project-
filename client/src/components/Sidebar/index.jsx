import React, { useState } from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../Sidebar/style.css";
import { Collapse } from "react-collapse";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export const Sidebar = () => {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter]= useState(true);
   const [isOpenAvailFilter, setIsOpenAvailFilter]= useState(true);
   const [isOpenSizeFilter, setIsOpenSizeFilter]= useState(true);
  return (
    <aside className="sidebar py-5 ">
      <div className="box mt-3">
        <h3 className="mb-3 w-full text-[16px] font-[600] flex items-center pr-5 ">
          Shop by Categories
          <Button className=" !text-black !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto" onClick={()=>setIsOpenCategoryFilter(!isOpenCategoryFilter)}>
            {
              isOpenCategoryFilter===true ? <FaAngleUp /> :   <FaAngleDown />
            }
          
            
          </Button>
        </h3>
        <Collapse isOpened={isOpenCategoryFilter}>
          <div className="scroll px-4 relative -left-[13px] ">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Ethnic"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="West Wear"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Co-Ords"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>

         <div className="box mt-3">
        <h3 className="mb-3 w-full text-[16px] font-[600] flex items-center pr-5 ">
          Availability
          <Button className=" !text-black !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto" onClick={()=>setIsOpenAvailFilter(!isOpenAvailFilter)}>
            {
              isOpenAvailFilter===true ? <FaAngleUp /> :   <FaAngleDown />
            }
          
            
          </Button>
        </h3>
        <Collapse isOpened={isOpenAvailFilter}>
          <div className="scroll px-4 relative -left-[13px] ">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Available"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="In Stock"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Not Available"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>
     
    
         <div className="box mt-3">
        <h3 className="mb-3 w-full text-[16px] font-[600] flex items-center pr-5 ">
          Size
          <Button className=" !text-black !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto" onClick={()=>setIsOpenSizeFilter(!isOpenSizeFilter)}>
            {
              isOpenSizeFilter===true ? <FaAngleUp /> :   <FaAngleDown />
            }
          
            
          </Button>
        </h3>
        <Collapse isOpened={isOpenSizeFilter}>
          <div className="scroll px-5 pb-3 relative -left-[13px] ">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="XS"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="S"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="L"
              className="w-full"
            />
             <FormControlLabel
              control={<Checkbox size="small" />}
              label="XL"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="2XL"
              className="w-full"
            />
             <FormControlLabel
              control={<Checkbox size="small" />}
              label="3XL"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="4XL"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="5XL"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>

    
         <div className="box mt-4">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5 pb-3">
          Filter By Price
        </h3>
        <RangeSlider className="mt-3" />
        <div className="flex justify-between pt-4 pb-2 priceRange">
          <span>
            From: <strong className="text-dark">Rs. {100}</strong>
          </span>
          <span>
            To: <strong className="text-dark">Rs. {5000}</strong>
          </span>
        </div>
      </div>

    

    </aside>
  );
};

export default Sidebar;

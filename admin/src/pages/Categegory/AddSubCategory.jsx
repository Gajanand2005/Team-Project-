import React, { useState } from 'react'
import UploadBox from '../../Components/UploadBox/Index'
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const AddSubCategory = () => {
   const [productSubCat, setProductSubCat] = useState("");

     const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
  };

  return (
    <>
     <section className="p-5 bg-gray-50 mt-3 ">
        <form className="form py-3 p-8 ">
          <div className="scroll max-h-72vh] ">
            <div className="grid grid-cols-1 mb-3 ">
            <div className="col w-[25%]">
              
               <div className="col">
              <h3 className="text-[14px] font-[500] !mb-2">
                Product Sub Category
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-[#fafafa]"
                size="small"
                value={productSubCat}
                label="Category"
                onChange={handleChangeProductSubCat}
              >
                <MenuItem value={10}>Organza</MenuItem>
                <MenuItem value={20}>Georgette</MenuItem>
                <MenuItem value={30}>Silk</MenuItem>
                <MenuItem value={40}>Banarsi</MenuItem>
                <MenuItem value={50}>Cotton</MenuItem>
                <MenuItem value={60}>Chinnon</MenuItem>
                <MenuItem value={70}>Woollen</MenuItem>
                <MenuItem value={80}>Lucknowi</MenuItem>
                <MenuItem value={90}>Crepe</MenuItem>
                <MenuItem value={100}>Net</MenuItem>
                <MenuItem value={110}>Winter Wear</MenuItem>
                <MenuItem value={120}>Summer Wear</MenuItem>
                <MenuItem value={130}>Western Co-ords</MenuItem>
                <MenuItem value={140}> Ethnic Co-ords</MenuItem>
              </Select>
            </div>
            </div>
          
          <br />
          
          </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] !mb-2">Sub Category Name</h3>
              <input
                type="text"
                className="w-[25%] h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] bg-[#fafafa]"
              />
            </div>
            </div>
           <hr />
         <br />
        <Button type="button"  className="btn-blue btn-lg w-[250px] flex gap-4"><FaCloudUploadAlt className="text-[25px]" />Publish and View</Button>

          </form>
          </section>
    </>
  )
}

export default AddSubCategory

import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadBox from "../../Components/UploadBox/Index";
import { IoIosImages } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddProduct = () => {
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productFeatured, setProductFeatured] = useState("");
  const [productSize, setProductSize] = useState("");

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
  };

  const handleChangeProductFeatured = (event) => {
    setProductFeatured(event.target.value);
  };

  const handleChangeProductSize = (event) => {
    setProductSize(event.target.value);
  };

  return (
    <>
      <section className="p-5 bg-gray-50 ">
        <form className="form py-3 p-8 ">
          <div className="scroll max-h-72vh] overflow-y-scroll">
          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[14px] font-[500] !mb-2">Product Name</h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 mb-3 ">
            <div className="col">
              <h3 className="text-[14px] font-[500] !mb-2">
                Product Description
              </h3>
              <textarea
                type="text"
                className="w-full h-[140px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] !mb-2">Product Category</h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-[#fafafa]"
                size="small"
                value={productCat}
                label="Category"
                onChange={handleChangeProductCat}
              >
                <MenuItem value={10}>Suits</MenuItem>
                <MenuItem value={20}>West Wear</MenuItem>
                <MenuItem value={30}>Co-Ords</MenuItem>
              </Select>
            </div>

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
            <div className="col">
              <h3 className="text-[14px] font-[500] !mb-2">Product Price</h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] bg-[#fafafa]"
              />
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] !mb-2">
                Product Old Price
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] bg-[#fafafa]"
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] !mb-2">Is Featured</h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-[#fafafa]"
                size="small"
                value={productFeatured}
                label="Category"
                onChange={handleChangeProductFeatured}
              >
                <MenuItem value={10}>True</MenuItem>
                <MenuItem value={20}>false</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] !mb-2">Product Stock</h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] bg-[#fafafa]"
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] !mb-2">Product Brand</h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] bg-[#fafafa]"
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] !mb-2">Product Discount</h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] bg-[#fafafa]"
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] !mb-2">Product Size </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-[#fafafa]"
                size="small"
                value={productSize}
                label="Category"
                onChange={handleChangeProductSize}
              >
                <MenuItem value={10}>XS</MenuItem>
                <MenuItem value={20}>S</MenuItem>
                <MenuItem value={30}>M</MenuItem>
                <MenuItem value={40}>L</MenuItem>
                <MenuItem value={50}>XL</MenuItem>
                <MenuItem value={60}>2XL</MenuItem>
                <MenuItem value={70}>3XL</MenuItem>
                <MenuItem value={80}>4XL</MenuItem>
                <MenuItem value={90}>5XL</MenuItem>
              </Select>
            </div>
          </div>

          <div className="col w-full px-0 p-5">
            <h3 className="font-[600] text-[22px] mb-2">Media & Images</h3>

            <div className="grid grid-cols-7 gap-20 ">
              <div className="uploadBoxWrapper relative">  
                <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[75px] flex items-center justify-center z-50 cursor-pointer"><IoClose className="text-white text-[17px]" /></span>   
              <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.4)] h-[150px] w-[180px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                <LazyLoadImage
                  alt={"image"}
                  effect="blur"
                  wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                    style: { transitionDelay: "1s" },
                  }}
                  className="w-full h-full object-cover"
                  src="https://ecme-react.themenate.net/img/products/product-6.jpg"
                />
              </div>
              </div>

                  <div className="uploadBoxWrapper relative">  
                <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[75px] flex items-center justify-center z-50 cursor-pointer"><IoClose className="text-white text-[17px]" /></span>   
              <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.4)] h-[150px] w-[180px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                <LazyLoadImage
                  alt={"image"}
                  effect="blur"
                  wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                    style: { transitionDelay: "1s" },
                  }}
                  className="w-full h-full object-cover"
                  src="https://ecme-react.themenate.net/img/products/product-6.jpg"
                />
              </div>
              </div>



              <div className="uploadBoxWrapper relative">  
                <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[75px] flex items-center justify-center z-50 cursor-pointer"><IoClose className="text-white text-[17px]" /></span>   
              <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.4)] h-[150px] w-[180px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                <LazyLoadImage
                  alt={"image"}
                  effect="blur"
                  wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                    style: { transitionDelay: "1s" },
                  }}
                  className="w-full h-full object-cover"
                  src="https://ecme-react.themenate.net/img/products/product-6.jpg"
                />
              </div>
              </div>

              <UploadBox multiple={true} />
            </div>
          </div>
        </div>
        

         <hr />
         <br />
        <Button type="button"  className="btn-blue btn-lg w-full flex gap-4"><FaCloudUploadAlt className="text-[25px]" />Publish and View</Button>
        </form> 
      </section>
    </>
  );
};

export default AddProduct;

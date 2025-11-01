import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { GoTriangleDown } from "react-icons/go";
import { LuBaggageClaim } from "react-icons/lu";
const CartItems = (props) => {
     const [sizeanchorEl, setSizeAnchorEl] = useState(null);
      const [selectedSize, setCartItems]= useState(props.size);
      const openSize  = Boolean(sizeanchorEl);

      const [qtyanchorEl, setQtyAnchorEl] = useState(null);
      const [selectedQty, setSelectedQty]= useState(props.qty);
      const openQty  = Boolean(qtyanchorEl);

      const handleClickSize = (event) => {
        setSizeAnchorEl(event.currentTarget);
      };
      const handleCloseSize = (value) => {
        setSizeAnchorEl(null);
        if(value!==null){
            setCartItems(value)
        }
      };

       const handleClickQty = (event) => {
        setQtyAnchorEl(event.currentTarget);
      };
      const handleCloseQty = (value) => {
        setQtyAnchorEl(null);
        if(value!==null){
            setSelectedQty(value)
        }
      };

  return (
    <>
      <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
                <div className="img w-[15%] rounded-md overflow-hidden">
                  <Link to="/product/7845" className="group">
                    <img
                      src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/71-home_default/mug-today-is-a-good-day.jpg"
                      alt=""
                      className="w-full group-hover:scale-105 transition-all"
                    />
                  </Link>
                </div>

                <div className="info w-[85%] relative">
                  <IoMdClose className="cursor-pointer absolute top-[0px] right-[1px] text-[18px] link transition-all" />
                  <span className="text-[13px] font-[600] ">Levis</span>
                  <h3 className="text-[15px] font-[600] text-black">
                    <Link className="link">A-Line Kurti with Sharara</Link>
                  </h3>
                  <div className="flex items-center gap-4 !mt-2">
                    <div className="relative">
                      <span className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-[600] py-1 px-2 rounded-md cursor-pointer"  onClick={handleClickSize}>
                        Size : {selectedSize} <GoTriangleDown className=""  />
                       
                      </span>
                      <Menu
                        id="size-menu"
                        anchorEl={sizeanchorEl}
                        open={openSize}
                        onClose={()=>handleCloseSize(null)}
                        slotProps={{
                          list: {
                            "aria-labelledby": "basic-button",
                          },
                        }}
                      >
                        <MenuItem onClick={()=>handleCloseSize('S')}>S</MenuItem>
                        <MenuItem onClick={()=>handleCloseSize('XS')}>XS</MenuItem>
                        <MenuItem onClick={()=>handleCloseSize('L')}>L</MenuItem>
                        <MenuItem onClick={()=>handleCloseSize('L')}>L</MenuItem>
                        <MenuItem onClick={()=>handleCloseSize('XL')}>XL</MenuItem>
                        <MenuItem onClick={()=>handleCloseSize('2XL')}>2XL</MenuItem>
                        <MenuItem onClick={()=>handleCloseSize('3XL')}>3XL</MenuItem>
                        <MenuItem onClick={()=>handleCloseSize('4XL')}>4XL</MenuItem>
                        <MenuItem onClick={()=>handleCloseSize('5XL')}>5XL</MenuItem>
                      </Menu>
                    </div>
                    <div className="relative">
                      <span className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-[600] py-1 px-2 rounded-md cursor-pointer" onClick={handleClickQty}>
                        Qty: {selectedQty} <GoTriangleDown className="" />
                      </span>
                         <Menu
                        id="Qty-menu"
                        anchorEl={qtyanchorEl}
                        open={openQty}
                        onClose={()=>handleCloseQty(null)}
                        slotProps={{
                          list: {
                            "aria-labelledby": "basic-button",
                          },
                        }}>
                        <MenuItem onClick={()=>handleCloseQty(1)}>1</MenuItem>
                        <MenuItem onClick={()=>handleCloseQty(2)}>2</MenuItem>
                        </Menu>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 !mt-2">
                    <span className="price text-black text-[15px] font-[600]">
                      $58.00
                    </span>
                    <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
                      $58.00
                    </span>
                    <span className="price text-orange-600 text-[15px] font-[600]">
                      55% OFF
                    </span>
                  </div>
                </div>
              </div>
    </>
  )
}

export default CartItems

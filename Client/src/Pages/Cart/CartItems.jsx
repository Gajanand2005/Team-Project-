import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GoTriangleDown } from "react-icons/go";
import { deleteData, editData, fetchDataFromApi } from "../../Utils/Api";
import { useContext } from "react";
import { MyContext } from "../../App.jsx";

const CartItems = (props) => {
  const [sizeanchorEl, setSizeAnchorEl] = useState(null);
  const [selectedSize, setSelectedSize] = useState(props.size);
  const openSize = Boolean(sizeanchorEl);

  const [qtyanchorEl, setQtyAnchorEl] = useState(null);
  const [selectedQty, setSelectedQty] = useState(props.qty);
  const openQty = Boolean(qtyanchorEl);
    const context = useContext(MyContext);

  const handleClickSize = (event) => {
    setSizeAnchorEl(event.currentTarget);
  };
  const handleCloseSize = (value) => {
    setSizeAnchorEl(null);
    if (value !== null) {
      setSelectedSize(value);
      props.onSizeChange && props.onSizeChange(value);
    }
  };

const cleanPrice = (price) => {
  return Number(String(price).replace(/[^0-9.]/g, ""));
};


  const handleClickQty = (event) => {
    setQtyAnchorEl(event.currentTarget);
  };
  const handleCloseQty = (value) => {
    setQtyAnchorEl(null);
    if (value !== null) {
      // Stock validation
      if (value > props?.item?.countInStock) {
        context.alertBox("error", "The requested quantity exceeds available stock.");
        return;
      }
      setSelectedQty(value);
      const cartObj = {
        _id: props?.item?._id,
        qty: value,
        subTotal: Number(props?.item?.price) * value,
        size: selectedSize,
      };
      editData("/api/cart/update-qty", cartObj).then((res) => {
        if (res?.error === false) {
          context.alertBox("success", res?.message);
        }
      });
      props.onQtyChange && props.onQtyChange(value);
    }
  };

  const updateCart = (selectedVal, qty, field) => {
    if (field === "size") {
      fetchDataFromApi(`/api/product/${props?.item?.productId}`).then((res) => {
        const product = res?.product;
        if (product?.size?.includes(selectedVal)) {
          props.onSizeChange && props.onSizeChange(selectedVal);
        } else {
          context.alertBox("error", "Size not available");
        }
      });
    }
  };

  const removeItem = (id) => {
    deleteData(`/api/cart/delete-cart-item/${id}`).then((res) => {
      context.alertBox("success", "Product removed from cart");
      context?.getCartItems();
    })
  }

  return (
    <>
      <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
        <div className="img w-[15%] rounded-md overflow-hidden">
          <Link to={`/product/${props?.item?._id}`} className="group">
            <img
              src={props?.item?.image}
              alt=""
              className="w-full group-hover:scale-105 transition-all"
            />
          </Link>
        </div>

        <div className="info w-[85%] relative">
          <IoMdClose
            className="cursor-pointer absolute top-[0px] right-[1px] text-[18px] link transition-all"
            onClick={()=>removeItem(props?.item?._id)}
          />
          <span className="text-[13px] font-[600] ">{props?.item?.brand}</span>
          <h3 className="text-[15px] font-[600] text-black">
            <Link to={`/product/${props?.item?.productId}`} className="link">
              {props?.item?.productTitle}
            </Link>
          </h3>
          <div className="flex items-center gap-4 !mt-2">
            {props?.item?.productSizes?.length !== 0 && (
              <div className="relative">
                <span
                  className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-[600] py-1 px-2 rounded-md cursor-pointer"
                  onClick={handleClickSize}
                >
                  Size : {selectedSize} <GoTriangleDown className="" />
                </span>
                <Menu
                  id="size-menu"
                  anchorEl={sizeanchorEl}
                  open={openSize}
                  onClose={() => handleCloseSize(null)}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  {props?.item?.productSizes?.map((item, index) => (
                    <MenuItem
                      key={index}
                      className={`${item === selectedSize && "selected"}`}
                      onClick={() => updateCart(item, props?.item?.quantity,"size")}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            )}

            <div className="relative">
              <span
                className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-[600] py-1 px-2 rounded-md cursor-pointer"
                onClick={handleClickQty}
              >
                Qty: {selectedQty} <GoTriangleDown className="" />
              </span>
              <Menu
                id="Qty-menu"
                anchorEl={qtyanchorEl}
                open={openQty}
                onClose={() => handleCloseQty(null)}
                slotProps={{
                  list: {
                    "aria-labelledby": "basic-button",
                  },
                }}
              >
                {
                  Array.from({length: 25}).map((_, index)=>(
                  <MenuItem key={index} onClick={() => handleCloseQty(index+1)}>{index+1}</MenuItem>
                  )
               )}

              </Menu>
            </div>
          </div>

         <div className="flex items-center gap-4 !mt-2">

  {/* SALE PRICE */}
  <span className="price text-black text-[15px] font-[600]">
    {context?.formatPrice(cleanPrice(props?.item?.oldPrice))}
  </span>

  {/* ORIGINAL PRICE */}
  <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
    {context?.formatPrice(cleanPrice(props?.item?.price))}
  </span>

  {/* DISCOUNT */}
  <span className="price text-orange-600 text-[15px] font-[600]">
    {props?.item?.discount}% OFF
  </span>

</div>

        </div>
      </div>
    </>
  );
};

export default CartItems;




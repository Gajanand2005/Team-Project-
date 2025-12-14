import React, { useContext, useState } from "react";
import { LuCarTaxiFront } from "react-icons/lu";
import { TbHeartHandshake } from "react-icons/tb";
import QtyBox from "../QtyBox/index.jsx";
import Button from "@mui/material/Button";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { MyContext } from "../../App.jsx";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../Utils/Api.js";


const ProductDetailsComponent = (props) => {
  const context = useContext(MyContext);
  const [quantity, setQuantity] = useState(1);
  const [productActionIndex, setProductActionIndex] = useState(null);
  const [selectedTabName, setSelectedTabName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tabError, setTabError]= useState(false);

  const handleSelectQty = (qty) => {
    setQuantity(qty);
  };

  const handleClickActiveTab = (index, name) => {
    setProductActionIndex(index);
    setSelectedTabName(name);
  };




 //add to cart Ai version
 const addToCart = (product, userId, quantity) => {
   if (!userId) {
     context?.alertBox("error", "Please login first");
     return;
   }

   // Stock validation
   if (quantity > product?.countInStock) {
     context?.alertBox("error", "The requested quantity exceeds available stock.");
     return;
   }

   // Size validation
   if (props?.item?.size?.length !== 0) {
     if (selectedTabName === null) {
       setTabError(true);
       setIsLoading(false);
       return;
     }
   }

   const productItem = {
     productTitle: product?.name,
     name: product?.name,
     image: product?.images[0],
     price: product?.price,
     oldPrice: product?.oldPrice,
     discount: product?.discount,
     quantity: quantity,
     countInStock: product?.countInStock,
     productId: product?._id,
     subTotal: parseInt(product?.price * quantity),
     userId: userId,
     brand: product?.brand,
     size: selectedTabName,
   };

   setIsLoading(true);

   postData("/api/cart/add", productItem).then((res) => {
     if (res?.error === false) {
       context?.alertBox("success", res?.message);
       context?.getCartItems();
       setTimeout(() => setIsLoading(false), 1000);
     } else {
       context?.alertBox("error", res?.message);
       setIsLoading(false);
     }
   });
 };


  return (
    <>
      <h1 className=" text-[18px] sm:text-[24px] font-[600] !mb-2">{props?.item?.name}</h1>
      <div className="flex items-center flex-col sm:flex-row gap-3 text-[13px]">
        <span className="text-gray-400">
          Brand :{" "}
          <span className="font-[500] text-black opacity-75">
            {props?.item?.brand}
          </span>
        </span>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 py-1 !mt-0">
<div className="flex items-center gap-4">
<span className="oldPrice line-through text-gray-500 text-[20px] font-[500]">
  {context?.formatPrice(props?.item?.oldPrice)}
</span>

<span className="price text-orange-600 font-bold text-[20px]">
  {context?.formatPrice(props?.item?.price)}
</span>
</div>


<div className="flex items-center gap-4">
        <span className="text-[15px]">
          Available In Stock:{" "}
          <span className="text-green-600 text-[15px] font-[600]">
            {props?.item?.countInStock} Items
          </span>
        </span>
        </div>
      </div>

      <p className="!mt-0 pr-0 lg:pr-10 !mb-5">{props?.item?.description}</p>
      {props?.item?.size?.length !== 0 && (
        <div className="flex items-center gap-1">
          <span className="text-[16px]">Size :</span>
          <div className="flex items-center gap-1 actions">
            {props?.item?.size?.map((item, index) => {
              return (
                <Button
                  key={`size-${index}-${item}`}
                  className={`${
                    productActionIndex === index
                      ? "!bg-orange-600 !text-white "
                      : ""
                  }${tabError===true && '!border !border-red-700'}`}
                  onClick={() => handleClickActiveTab(index, item)}
                >
                  {item}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-[14px] !mt-2 lg:!mt-4 mb-2">Delivery Time 5-12 Days</p>
      <div className="flex items-center !mt-2 lg:!mt-4 gap-4">
        <div className="qtyBoxWrapper w-[69px]">
          <QtyBox handleSelectQty={handleSelectQty} />
        </div>
        <Button
          className="!bg-orange-600 btn-org hover:!bg-black !text-white flex gap-2 !min-w-[150px]"
          onClick={() =>
            addToCart(props?.item, context?.userData?._id, quantity)
          }
        >
          {isLoading === true ? (
            <CircularProgress color="inherit" className="!text-white" />
          ) : (
            <>
              <LuCarTaxiFront className="!text-[22px] " />
              Add to Cart
            </>
          )}
        </Button>
      </div>

      <div className="flex items-center gap-4 !mt-4 lg:!mt-6">
        <span className="flex items-center gap-3 text-[13px ] lg:text-[15px] link cursor-pointer font-[600] ">
          <TbHeartHandshake className="text-[19px]" />
          Add to Wishlist
        </span>
     
      </div>
    </>
  );
};

export default ProductDetailsComponent;


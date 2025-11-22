import React, { useContext, useEffect, useState } from "react";
import "../Productitem/style.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa6";
import { IoGitCompare } from "react-icons/io5";
import { MdClose, MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { MyContext } from "../../App";
import { deleteData, editData, postData } from "../../Utlis/Api";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";


function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function ProductItem(props) {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isAddedInMyList, setIsAddedInMyList] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isShowTabs, setIsShowTabs] = useState(false);
   const [selectedTabName, setSelectedTabName] = useState(null);

  const context = useContext(MyContext);

  const addToCart = (product, userId, quantity) => {

   
    const productItem = {
     _id:product?._id,
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

    if (props?.item?.size?.length !== 0) {
      setIsShowTabs(true);
    } else {
      context?.addToCart(productItem, userId, quantity);
      setIsAdded(true);
      setIsShowTabs(false);
    }

    if (activeTab !== null) {
      context?.addToCart(productItem, userId, quantity);
      setIsAdded(true);
      setIsShowTabs(false);
    }
  };

  const handleClickActiveTab = (index, name) => {
    setActiveTab(index);
    setSelectedTabName(name);
  };

  useEffect(() => {
    const item = context?.cartData?.filter((cartItem) =>
      cartItem.productId.includes(props?.item?._id)
    );

 const myListItem = context?.myListData?.filter((item) =>
      item.productId.includes(props?.item?._id)
    );

    if (item?.length !== 0) {
      setIsAdded(true);
      setCartItem(item);
      setQuantity(item[0]?.quantity);
    } else {
      setQuantity(1);
    }

 if (myListItem?.length !== 0) {
      setIsAddedInMyList(true);
    } else {
      setIsAddedInMyList(false)
    }



  }, [context?.cartData]);

  const minusQty = () => {
    if (quantity !== 1 && quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }

    if (quantity === 1) {
      deleteData(`api/cart/delete-cart-item/${cartItem[0]?._id}`).then(
        (res) => {
          setIsAdded(false);
          context.alertBox("success", "Item Removed from cart");
          context?.getCartItems();
          setIsShowTabs(false);
          setActiveTab(null);
        }
      );
    } else {
      const obj = {
        _id: cartItem[0]?._id,
        qty: quantity - 1,
        subTotal: props?.item?.price * (quantity - 1),
      };
      editData(`/api/cart/update-qty`, obj).then((res) => {
        context.alertBox("success", res?.message);
        context?.getCartItems();
      });
    }
  };

  const addQty = () => {
    setQuantity(quantity + 1);

    const obj = {
      _id: cartItem[0]?._id,
      qty: quantity + 1,
      subTotal: props?.item?.price * (quantity + 1),
    };
    editData(`/api/cart/update-qty`, obj).then((res) => {
      context.alertBox("success", res?.message);
      context?.getCartItems();
    });
  };

 const handleAddtoMyList = (item) => {
if(context?.userData === null){
  context?.alertBox("error" , "you are not login please login first ");
  return false;
}else{

 const obj ={
    productId : item?._id,
    userId:context?.userData?._id,
    productTitle:item?.name,
    image:item?.images[0],
    price:item?.price,
    oldPrice:item?.oldPrice,
    brand:item?.brand,
    discount:item?.discount
  }

postData("/api/myList/add",obj).then((res)=>{
  if(res?.error === false){
    context?.alertBox("success",res?.message);
    setIsAddedInMyList(true);
    context?.getMyListData()
  }else{
    context?.alertBox("error",res?.error)
  }
})

}}
  

  return (
    <div className="productItem shadow-lg rounded-md overflow-hidden border-2  border-[rgba(0,0,0,0.1)] ">
      <div className="group imgWrapper w-[100%] overflow-hidden rounded-md relative">
        <Link to={`/product/${props?.item?._id}`}>
          <div className="img  overflow-hidden">
            <img src={props?.item?.images[0]} alt="" className="w-full" />
            <img src={props?.item?.images[1]} alt="" className="w-full" />
          </div>
        </Link>

        {isShowTabs === true && (
          <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-[60] p-3 gap-2">

           <Button className="!absolute top-[10px] right-[10px] !min-w-[30px] !min-h-[30px] !w-[30px] !h-[30px] !rounded-full !bg-[rgba(255,255,255,1)] text-black "
           
           onClick={()=>setIsShowTabs(false)}
           ><MdClose className=" text-black z-[90] text-[25px]" /></Button>


            {props?.item?.size.length !== 0 &&
              props?.item?.size?.map((size, index) => {
                return (
                  <span
                    key={index}
                    className={`flex items-center justify-center p-1 px-2 bg-[rgba(255,555,255,0.8)] h-[25px] rounded-sm cursor-pointer mix-w-[35px] hover:bg-white ${
                      activeTab === index && "!bg-orange-600 !text-white"
                    }`}
                    onClick={() => handleClickActiveTab(index, size)}
                  >
                    {size}
                  </span>
                );
              })}
          </div>
        )}

        <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-orange-500 text-white rounded-full p-1 text-[10px] md:text-[12px] font-[500]  ">
          {" "}
          {props?.item?.discount}%
        </span>

        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[35px] sm:w-[30px] md:w-[50px] transition-all duration-300 group-hover:top-[10px] opacity-0 group-hover:opacity-100">
          <Tooltip title="Heart" placement="left-start">
            <Button className="!w-[28px] !h-[28px] sm:!w-[30px] sm:!h-[30px] md:!w-[35px] md:!h-[35px] !min-w-[28px] sm:!min-w-[30px] md:!min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-orange-500 hover:!text-white group"
            
            onClick={()=>handleAddtoMyList(props?.item)}
            >
 
{
  isAddedInMyList ? (
    <IoMdHeart
      className="text-[14px] sm:text-[16px] md:text-[18px] text-orange-500 fill-current"
    />
  ) : (
    <FaHeart
      className="text-[14px] sm:text-[16px] md:text-[18px] text-black  fill-current"
    />
  )
}

 
            </Button>
          </Tooltip>

          <Tooltip title="View Product Details" placement="left-start">
            <Button
              className="!w-[28px] !h-[28px] sm:!w-[30px] sm:!h-[30px] md:!w-[35px] md:!h-[35px] !min-w-[28px] sm:!min-w-[30px] md:!min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-orange-500 hover:!text-white"
              onClick={() =>
                context.handleOpenProductDetailsModal(true, props?.item)
              }
            >
              <MdZoomOutMap className="text-[14px] sm:text-[16px] md:text-[18px] !text-black group-!hover:text-white hover:!text-white" />{" "}
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="info p-2 md:p-3 py-3 relative pb-[50px] h-[190px] ">
        <h6 className="text-[11px] sm:text-[12px] md:text-[14px]">
          <span className="link transition-all">{props?.item?.brand}</span>
        </h6>
        <h3 className="text-[13px] sm:text-[14px] md:text-[16px] title mt-1 font-[500] text-[#000]">
          <Link
            to={`/product/${props?.item?._id}`}
            className="link transition-all"
          >
            {props?.item?.name?.substr(0, 30) + "...."}
          </Link>
        </h3>
        <div className="py-1"></div>

        <div className="flex items-center gap-3 sm:gap-4 py-1">
          <span className="oldPrice line-through text-gray-500 text-[12px] sm:text-[14px] md:text-[16px] font-[500]">
            {" "}
            {context?.formatPrice(props?.item?.price)}
          </span>
          <span className="oldPrice text-orange-600 font-bold text-[12px] sm:text-[14px] md:text-[16px]">
            {" "}
            {context?.formatPrice(props?.item?.oldPrice)}
          </span>
        </div>
        <div className="w-full !absolute bottom-[15px] left-0 pl-3 pr-3">
          {isAdded === false ? (
            <Button
              className="btn-org btn-border flex w-full btn-sm gap-2"
              size="small"
              onClick={() =>
                addToCart(props?.item, context?.userData?._id, quantity)
              }
            >
              <MdOutlineShoppingCart className="text-[18px]" /> Add to Cart
            </Button>
          ) : (
            <div className="flex items-center justify-between overflow-hidden rounded-full border border-[rgba(0,0,0,0.1)] ">
              <Button
                className="!min-w-[30px] !w-[30px] !h-[30px] !bg-[#f1f1f1] !rounded-none "
                onClick={minusQty}
              >
                <FaMinus className="text-[rgba(0,0,0,0.7)]" />
              </Button>
              <span>{quantity}</span>
              <Button
                className="!min-w-[30px] !w-[30px] !h-[30px] !bg-orange-600 !rounded-none "
                onClick={addQty}
              >
                <FaPlus className="text-white" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;

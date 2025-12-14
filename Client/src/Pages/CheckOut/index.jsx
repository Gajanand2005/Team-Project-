import React, { useContext, useEffect, useState, useMemo } from "react";
import Button from "@mui/material/Button";
import { RiShoppingBag3Line } from "react-icons/ri";
import { MyContext } from "../../App";
import { PiPlusBold } from "react-icons/pi";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { deleteData, postData } from "../../Utils/Api";
import { useNavigate } from "react-router-dom";



const VITE_APP_RAZORPAY_KEY_ID = import.meta.env.VITE_APP_RAZORPAY_KEY_ID;
const VITE_APP_RAZORPAY_KEY_SECRET = import.meta.env.VITE_APP_RAZORPAY_KEY_SECRET;

const CheckOut = () => {
  const context = useContext(MyContext);
  const userData = context?.userData;
  const [isChecked, setIsChecked] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState();

  const history = useNavigate();

  const totalPrice = useMemo(() => {
    return (
      context?.cartData?.reduce(
        (acc, item) => acc + item?.quantity * item?.price,
        0
      ) || 0
    );
  }, [context?.cartData]);

  useEffect(() => {
    setTotalAmount(
      context?.cartData?.length !== 0
        ? context?.cartData
            ?.map((item) => parseInt(item.price) * item.quantity)
            .reduce((total, value) => total + value, 0)
        : 0
    )?.toLocaleString("en-US", { style: "currency", currency: "INR" });
    // localStorage.setItem("totalAmount", context?.cartData?.length !==0 ? context?.cartData?.map(item=> parseInt(item.price)* item.quantity).reduce((total, value)=> total + value, 0): 0)?.toLocaleString('en-US',{style: 'currency', currency: 'INR' })
  }, [context?.cartData]);

  const editAddress = (id) => {
    context?.setOpenAddressPanel(true);
    context?.setAddressMode("edit");
    context?.setAddressId(id);
  };

  const handleChange = (e, index) => {
    if (e.target.checked) {
      setIsChecked(index);
      setSelectedAddress(e.target.value);
    }
  };

  useEffect(()=>{

    setSelectedAddress(context?.addressData[0]?._id);

  }, [context?.addressData]);

  const checkout = (e) => {
    e.preventDefault();

    // Check stock availability
    const outOfStockItems = context?.cartData?.filter(item => item.quantity > item.countInStock);
    if (outOfStockItems?.length > 0) {
      context.alertBox("error", "Some items in your cart are out of stock or exceed available quantity. Please update your cart.");
      return;
    }
     if(context?.addressData?.length !==0){
       var options = {
      key: VITE_APP_RAZORPAY_KEY_ID,
      key_secret: VITE_APP_RAZORPAY_KEY_SECRET,
      amount: parseInt(totalAmount * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + context?.userData?.name,
      name: "S-mal Couture",
      description: "For testing purpose",
      method: {
        emi: false,
        paylater: false,
      },

      handler: function (response) {
        const paymentId = response.razorpay_payment_id;

        const user = context?.userData;
       
            const payLoad = {
          userId: user?._id,
          products: context?.cartData,
          paymentId: paymentId,
          payment_status: "paid",
          delivery_address: selectedAddress,
          totalAmt: totalAmount,
          data: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        };
        postData(`/api/order/create`,payLoad).then((res)=>{
          context.alertBox("success", res?.message);
          if(res?.error === false){
            deleteData(`/api/cart/emptyCart/${user?._id}`).then((res)=>{
              context?.getCartItems();
            })
            history("/order/success");
          }else{
            history("/order/failed");
            context.alertBox("error", res?.message);
          }
        })
        
      
      },

      theme: {
        color: "#F37254",
      },
    };

    var pay = new window.Razorpay(options);
    pay.on('payment.failed', function (response){
      history("/order/failed");
    });
    pay.open();
     }else{
      context.alertBox("error", "Please add address");
     }
   
  };


  const cashOnDelivery = (e) =>{
     // Check stock availability
     const outOfStockItems = context?.cartData?.filter(item => item.quantity > item.countInStock);
     if (outOfStockItems?.length > 0) {
       context.alertBox("error", "Some items in your cart are out of stock or exceed available quantity. Please update your cart.");
       return;
     }

     const user = context?.userData;

     if(context?.addressData?.length !==0){
       const payLoad = {
          userId: user?._id,
          products: context?.cartData,
          paymentId: '',
          payment_status: "CASH ON DELIVERY",
          delivery_address: selectedAddress,
          totalAmt: totalAmount,
          data: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        };
         postData(`/api/order/create`,payLoad).then((res)=>{
          context.alertBox("success", res?.message);
          if(res?.error === false){
            deleteData(`/api/cart/emptyCart/${user?._id}`).then((res)=>{
              context?.getCartItems();

            })
          }else{
            context.alertBox("error", res?.message);
          }
          history("/order/success");
        })
     }else{
      context.alertBox("error", "Please add address");
     }

    
  }

  return (
    <>
      <section className="py-3 lg:py-10 px-3 ">
        <form
          action=""
          onSubmit={checkout}
          className="flex items-center justify-center"
        >
          <div className="w-full lg:w-[70%] m-auto flex flex-col md:flex-row gap-5">
            {/* LEFT */}
            <div className="leftCol w-full md:w-[60%] ">
              <div className="card bg-white shadow-md p-5 rounded-md w-full">
                <div className="flex items-center justify-between">
                  <h1 className="text-[12px] lg:text-[20px] font-[600]">
                    Select Delivery Address
                  </h1>
                  <Button
                    className="!bg-orange-600 !text-white hover:!bg-black btn "
                    onClick={() => {
                      context?.setOpenAddressPanel(true);
                      context?.setAddressMode("add");
                    }}
                  >
                    <PiPlusBold />
                    ADD{context?.windowWidth < 762 ? "" :"New Adress" }
                  </Button>
                </div>
                <br />

                <RadioGroup>
                  <div className="flex flex-col gap-4">
                    {/* Address List */}
                    {context?.addressData?.length > 0 ? (
                      context?.addressData?.map((address, index) => {
                        return (
                          <label
                            className={`flex gap-3 p-4 border border-[rgba(0,0,0,0.1)] rounded-md relative ${
                              isChecked === index && "bg-orange-200"
                            }`}
                            key={index}
                          >
                            <div>
                              <Radio
                                size="small"
                                className="!text-orange-600"
                                onChange={(e) => handleChange(e, index)}
                                checked={isChecked === index}
                                value={address?._id}
                              />
                            </div>

                            <div className="info">
                              <span className="inline-block p-1 bg-[#f1f1f1] rounded-md">
                                {address?.addressType}
                              </span>
                              <h3 className="text-[20px] font-[600] capitalize">
                                {userData?.name}
                              </h3>

                              <p className="!mt-0 !mb-0 capitalize">
                                {address?.address_line1 +
                                  " " +
                                  address?.city +
                                  " " +
                                  address?.country +
                                  " " +
                                  address?.state +
                                  " " +
                                  address?.landmark}
                              </p>

                              <p className="!mt-0 !mb-0 capitalize font-[600]">
                                +{address?.mobile}
                              </p>
                            </div>

                            <Button
                              variant="text"
                              className="top-[15px] right-[15px] !absolute !bg-orange-600 !text-white hover:!bg-black btn"
                              size="small"
                              onClick={() => editAddress(address?._id)}
                            >
                              EDIT
                            </Button>
                          </label>
                        );
                      })
                    ) : (
                      <>
                        <div className="flex items-center justify-between flex-col p-5">
                          <img src="/address.png" alt="" width="80px" />
                          <h2 className="text-center">No Addresses found</h2>
                          <p>Add a delivery address</p>
                          <Button className="!bg-orange-600 !text-white hover:!bg-black">
                            Add Address
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* RIGHT */}
            <div className="rightCol w-full md:w-[40%]">
              <div className="card shadow-md bg-white p-5 rounded-md">
                <h2 className="!mb-3 font-[600]">Your Order</h2>

                <div className="flex justify-between items-center py-3 border-t border-b border-[rgba(0,0,0,0.2)] ">
                  <span className="text-[15px] font-[600]">Product</span>
                  <span className="text-[15px] font-[600]">Subtotal</span>
                </div>

                {/* CART ITEMS */}
                <div className="scroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2 !mb-5">
                  {context?.cartData?.length > 0 &&
                    context?.cartData?.map((item, index) => {
                      return (
                        <div
                          className="flex items-center justify-between py-2 "
                          key={index}
                        >
                          <div className="part1 flex items-center gap-3">
                            <div className="img w-[50px] h-[50px] overflow-hidden rounded-md group cursor-pointer">
                              <img
                                src={item?.image}
                                alt=""
                                className="w-full transition-all group-hover:scale-105"
                              />
                            </div>

                            <div className="info">
                              <h4
                                className="font-[600] text-[14px]"
                                title={item?.productTitle}
                              >
                                {item?.productTitle?.substr(0, 20) + "..."}
                              </h4>

                              <span className="text-[13px]">
                                Qty : {item?.quantity}
                              </span>
                            </div>
                          </div>

                          <span className="text-[14px] font-[600]">
                            {context.formatPrice(item?.quantity * item?.price)}
                          </span>
                        </div>
                      );
                    })}
                </div>

                {/* TOTAL */}
                <div className="flex justify-between items-center py-3 border-t border-[rgba(0,0,0,0.2)]">
                  <span className="text-[16px] font-[600]">Total</span>

                  <span className="text-[16px] font-[600]">
                    {context.formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="flex items-center flex-col gap-3 mb-2">
                <Button
                  type="submit"
                  className="!bg-orange-600 flex !text-white w-full items-center text-[19px] hover:!bg-black gap-2"
                  disabled={context?.cartData?.length === 0}
                >
                  Checkout
                  <RiShoppingBag3Line className="text-[19px]" />
                </Button>
                 <Button
                   type="button"
                   className="!bg-orange-600 flex !text-white w-full items-center flex items-center text-[19px] hover:!bg-black gap-2" onClick={cashOnDelivery}
                   disabled={context?.cartData?.length === 0}
                 >
                  Cash on Delivery
                  <RiShoppingBag3Line className="text-[19px]" />
                </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default CheckOut;



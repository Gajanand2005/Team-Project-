import React, { useContext, useEffect, useState, useMemo } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { RiShoppingBag3Line } from "react-icons/ri";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { PiPlusBold } from "react-icons/pi";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { fetchDataFromApi, postData, deleteData } from "../../Utlis/Api";
import { BsFillBagCheckFill } from "react-icons/bs";

const VITE_APP_RAZORPAY_KEY_ID = import.meta.env.VITE_APP_RAZORPAY_KEY_ID;
const VITE_APP_RAZORPAY_KEY_SECRET = import.meta.env.VITE_APP_RAZORPAY_KEY_SECRET;

const VITE_API_URL = import.meta.env.VITE_API_URL;
const CheckOut = () => {

  const context = useContext(MyContext);
  const [userData , setUserData] = useState(null);
  const [isChecked, setIsChecked]= useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState();

  const history = useNavigate();


  const totalPrice = useMemo(() => {
    window.scrollTo(0,0);
    return context?.cartData?.reduce((acc, item) => acc + (item?.quantity * item?.price), 0) || 0;
  }, [context?.cartData]);


  useEffect(() => {
    setUserData(context?.userData);
    setSelectedAddress(context?.userData?.address_details[0]?._id);


    // fetchDataFromApi(`/api/order/order-list`).then((res)=>{
    //   console.log(res)
    // })

  }, [context?.userData, userData])



  useEffect(()=> {
    setTotalAmount(
      context.cartData?.length !== 0 ?
      context.cartData?.map(item => parseInt(item.price) * item.quantity)
      .reduce((total, value) => total + value, 0) : 0)
      ?.toLocaleString('en-Us', {style: 'currency', currency: 'INR' }
      );

      // localStorage.setItem("totalAmount", context.cartData?.length !== 0 ?
      // context.cartData?.map(item => parseInt(item.price) * item.quantity)
      // .reduce((total, value) => total + value, 0) : 0
      // ?.toLocaleString('en-Us', {style: 'currency', currency: 'INR' })

  }, [context.cartData])


  const editAddress=(id)=>{
    context?.setOpenAddressPanel(true);
    context?.setAddressMode("edit");
    context?.setAddressId(id);
  }

  const handleChange=(e,index)=>{
    if(e.target.checked){
      setIsChecked(index)
      setSelectedAddress(e.target.value)
    }
  }


  const checkout=(e)=>{
    e.preventDefault();

    if(userData?.address_details?.length !== 0){
       var option = {
      key : VITE_APP_RAZORPAY_KEY_ID,
      key_secret: VITE_APP_RAZORPAY_KEY_SECRET,
      amount: parseInt(totalAmount * 100),
      currency: "INR",
      order_receipt: context?.userData?.name,
      name: "E-Commerce",
      description: "foe learning purpose",
      handler: function (response) {
        console.log(response);

        const paymentId = response.razorpay_payment_id;

        const user = context?.userData

        const payLoad = {
          userId: user?._id,
          products: context?.cartData,
          paymentId: paymentId,
          payment_status: "COMPLETED",
          delivery_address: selectedAddress,
          totalAmt: totalAmount,
          date: new Date().toLocaleString("en-Us", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
        };


        postData('/api/order/create', payLoad).then((res) => {
          context.alertBox("success", res?.message);
          if(res?.error == false) {
            deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) => {
              context?.getCartItems();
            })
            history("/order/success");
          } else {
            history("/order/failed");
            context.alertBox("error", res?.message);
          }
        });


      },

      theme: {
        color: "#ff5252",
      },
      };

   
       var pay = new window.Razorpay(option);
       pay.open();
    }else{
       context.alertBox("error", "Please add address");
      }

  }
 


  const cashOnDelivery = () => {

    const user = context?.userData

      if(userData?.address_details?.length !== 0){

        const payLoad = {
          userId: user?._id,
          products: context?.cartData,
          paymentId: '',
          payment_status: "CASH ON DELIVERY",
          delivery_address: selectedAddress,
          totalAmt:totalAmount,
          date: new Date().toLocaleString("en-Us", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
        };
    
    
        postData('/api/order/create', payLoad).then((res) => {
          context.alertBox("success", res?.message);
          if(res?.error == false) {
            deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) => {
              context?.getCartItems();
            })
           
          } else {
            context.alertBox("error", res?.message);
          }
          history("/order/success");
    
        });

      }else{
        context.alertBox("error", "Please add address");
      }
}



  return (
    <>
      <section className="py-10 flex items-center justify-center">
        <form onSubmit={checkout}>
        <div className="w-[70%] m-auto flex   gap-5">
          <div className="leftCol w-[60%] ">
            <div className="card bg-white shadow-md p-5 rounded-md w-full">
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] font-[600]">
                  Select Delivery Address{" "}
                </h1>
                <Button
                  className="!bg-orange-600 !text-white hover:!bg-black"
                  onClick={() => {
                    context?.setOpenAddressPanel(true);
                    context?.setAddressMode("add");
                  }}
                >
                  <PiPlusBold />
                  ADD NEW ADDRESS
                </Button>
              </div>
              <br />
              <RadioGroup>
                <div className="flex flex-col gap-4">
                  {userData?.address_details?.length > 0 ?
                   userData?.address_details?.map((address, index) => {
                      return (
                        <label className={`flex gap-3 p-4 border border-[rgba(0,0,0,0.1)] rounded-md relative ${isChecked === index  && 'bg-orange-200'}`} key={index}>
                         <div>
                           <Radio size="small" className="!text-orange-600" onChange={(e)=>handleChange(e,index)} checked={isChecked === index} value={address?.id}/>
                         </div>
                          <div className="info">
                            <span className="inline-block p-1 bg-[#f1f1f1] rounded-md">{address?.addressType}</span>
                            <h3 className="text-[20px] font-[600] capitalize">
                              {userData?.name}
                            </h3>
                            <p className="!mt-0 !mb-0 capitalize">{address?.address_line1 + " " + address?.city + " " +address?.country + " " +address?.state + " " + address?.landmark  + ' '  + address?.mobile}</p>
                            <p className="!mt-0 !mb-0 capitalize font-[600]">
                              {userData?.mobile}
                            </p>
                          </div>

                          <Button
                            variant="text"
                            className="top-[15px] right-[15px] !absolute !bg-orange-600 !text-white hover:!bg-black"
                            size="small" onClick={()=>editAddress(address?._id)}
                          >
                            EDIT
                          </Button>
                        </label>
                      );
                    })
                  :

                  <>
                  <div className="flex items-center justify-between flex-col p-5">
                    <img src="/address.png" alt="" width="80px" />
                    <h2 className="text-center">No Addresses found in your account</h2>
                    <p>Add a delivery address</p>
                    <Button className="!bg-orange-600 !text-white hover:!bg-black">Add Address</Button>
                  </div>
                  </>
                  
                  }
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="rightCol w-[40%]">
            <div className="card shadow-md bg-white p-5 rounded-md">
              <h2 className="!mb-3 font-[600]">Your Order</h2>

              <div className="flex justify-between items-center py-3 border-t border-b border-[rgba(0,0,0,0.2)] ">
                <span className="text-[15px] font-[600]">Product</span>
                <span className="text-[15px] font-[600]">subtotal</span>
              </div>
              <div className="scroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2 !mb-5">
                {context?.cartData?.length > 0 &&
                  context?.cartData?.map((item, index) => {
                    return (
                      <div className="flex items-center justify-between py-2 ">
                        <div className="part1 flex items-center gap-3">
                          <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
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
                              Qty : {item?.quantity}{" "}
                            </span>
                          </div>
                        </div>

                        <span className="text-[14px] font-[600]">
                          {(item?.quantity * item?.price)?.toLocaleString(
                            "en-US",
                            { style: "currency", currency: "INR" }
                          )}
                        </span>
                      </div>
                    );
                  })}
              </div>

              <div className="flex justify-between items-center py-3 border-t border-[rgba(0,0,0,0.2)]">
                <span className="text-[16px] font-[600]">Total</span>
                <span className="text-[16px] font-[600]">
                  {totalPrice?.toLocaleString(
                    "en-US",
                    { style: "currency", currency: "INR" }
                  )}
                </span>
              </div>

              <div className="flex items-center flex-col gap-3 mb-2">
              <Button type="submit" className="!bg-orange-600 flex !text-white w-full items-center text-[19px] hover:!bg-black gap-2">
                Checkout
                <RiShoppingBag3Line className="text-[19px]" />
              </Button>

              <Button type="button" className="btn-dark btn-lg w-full flex gap-2 items-center" onClick={cashOnDelivery}>
                <BsFillBagCheckFill className="text-[20px]" />
                Cash On Delivery</Button>
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

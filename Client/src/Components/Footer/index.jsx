import React, { useContext } from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaPinterestP,
  FaInstagram,
  FaRegCommentDots,
} from "react-icons/fa";
import {
  SiVisa,
  SiMastercard,
  SiAmericanexpress,
  SiPaypal,
} from "react-icons/si";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnBold } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { TfiGift } from "react-icons/tfi";
import { BiSupport } from "react-icons/bi";
import Drawer from "@mui/material/Drawer";
import CartPanel from "../CartPanel/index.jsx";
import { MyContext } from "../../App.jsx";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ProductZoom from "../ProductZoom/index.jsx";
import ProductDetailsComponent from "../ProductDetails/index.jsx";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AddAddress from "../../Pages/MyAccount/AddAddress.jsx";
import "./Footer.css"

const Footer = () => {
  const context = useContext(MyContext);

  return (
    <>
    {/* TOP ICON SLIDER (Mobile Slider + Desktop Grid) */}
<footer className="py-8 lg:bg-red-200 sm: bg-white">
  <div className="container mx-auto px-4">

    {/* MOBILE SLIDER */}
   <div className="flex sm:hidden overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scroll-smooth hide-scrollbar">

      
      {/* ITEM 1 */}
      <div className="min-w-[75%] flex flex-col items-center snap-center bg-white/40 py-4 rounded-lg shadow">
        <LiaShippingFastSolid className="text-4xl transition-all duration-300" />
        <h3 className="text-base font-semibold mt-2">Free Shipping</h3>
        <p className="text-xs text-gray-700">Only in India</p>
      </div>

      {/* ITEM 2 */}
      <div className="min-w-[75%] flex flex-col items-center snap-center bg-white/40 py-4 rounded-lg shadow">
        <BsWallet2 className="text-4xl transition-all duration-300" />
        <h3 className="text-base font-semibold mt-2">Secured Payment</h3>
        <p className="text-xs text-gray-700">All type of payment</p>
      </div>

      {/* ITEM 3 */}
      <div className="min-w-[75%] flex flex-col items-center snap-center bg-white/40 py-4 rounded-lg shadow">
        <BiSupport className="text-4xl transition-all duration-300" />
        <h3 className="text-base font-semibold mt-2">Support 24/7</h3>
        <p className="text-xs text-gray-700">Contact us Anytime</p>
      </div>

    </div>

    {/* DESKTOP GRID */}
    <div className="hidden sm:grid grid-cols-3 gap-6 text-center">
      
      <div className="flex flex-col items-center group">
        <LiaShippingFastSolid className="text-4xl md:text-5xl group-hover:text-red-600 group-hover:-translate-y-1 transition" />
        <h3 className="text-base font-semibold mt-2">Free Shipping</h3>
        <p className="text-xs text-gray-700">Only in India</p>
      </div>

      <div className="flex flex-col items-center group">
        <BsWallet2 className="text-4xl md:text-5xl group-hover:text-red-600 group-hover:-translate-y-1 transition" />
        <h3 className="text-base font-semibold mt-2">Secured Payment</h3>
        <p className="text-xs text-gray-700">All type of payment</p>
      </div>

      <div className="flex flex-col items-center group">
        <BiSupport className="text-4xl md:text-5xl group-hover:text-red-600 group-hover:-translate-y-1 transition" />
        <h3 className="text-base font-semibold mt-2">Support 24/7</h3>
        <p className="text-xs text-gray-700">Contact us Anytime</p>
      </div>

    </div>

  </div>
</footer>

      <footer className="bg-white border-t border-gray-200  ">
        <div className="container mx-auto py-6 md:py-10 footer-flex px-4 gap-2 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-300 pb-6 md:pb-8">
            {/* Contact us */}
            <div>
              <h3 className="text-base font-semibold mb-3">Contact us</h3>
              <p className="mb-1 text-sm">S-Mal Couture</p>

              <p className="mb-1 text-sm">
                Pull Bazar, Near Shiv Mandir Narnaul Haryana Pincode:- 123001
              </p>

              <p className="mb-1 text-sm">smalcouture@gmail.com</p>
              <p className="text-red-500 font-bold mb-3 text-base">
               8199985004
              </p>
              <div className="flex items-center gap-2 text-red-500 font-semibold cursor-pointer text-sm">
                <FaRegCommentDots size={20} />
                <span></span>
              </div>
              <p className="font-semibold text-sm">Get Expert Help</p>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-base font-semibold mb-3">Products</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>Ethnic</li>
                <li>Western Wear</li>
                <li>Co-Ords</li>
              </ul>
            </div>

            {/* Our company */}
            <div>
              <h3 className="text-base font-semibold mb-3">Support</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li><Link to='/delivery'>Delivery</Link></li>
                <li>Privacy Policy</li>
                <li><Link to='/AboutUs'>AboutUs</Link></li>
                <li>Secure payment</li>
                <li>Login</li>
              </ul>
            </div>

            {/* Subscribe to newsletter */}
            <div>
              <h3 className="text-base font-semibold mb-3">
                Join S-Mal Couture{" "}
              </h3>
              <p className="text-gray-700 mb-4 text-sm">
                Subscribe to our latest trendy collection to get special
                discounts
              </p>
              {/* <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                />
                <button
                  type="submit"
                  className="bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition text-sm"
                >
                  SUBSCRIBE
                </button>
                <label className="flex items-center gap-2 text-xs text-gray-600">
                  <input type="checkbox" />I agree to the terms and conditions
                  and the privacy policy
                </label>
              </form> */}
            </div>
          </div>

          {/* Bottom footer */}
<div className="flex flex-col md:flex-row items-center justify-between mt-6 pt-6 gap-6 text-center">

  {/* Social media icons */}
  <div className="flex gap-4 text-gray-600 text-2xl justify-center w-full order-1">
    <a
      href="https://www.instagram.com/smalcouture?igsh=MmtxYjlwb3prajdi"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaInstagram className="hover:text-red-500 transition" />
    </a>
    <a
      href="https://www.instagram.com/smal_west?igsh=MXBwZTFzOW9vbXlwZA=="
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaInstagram className="hover:text-red-500 transition" />
    </a>
  </div>

  {/* Copyright */}
  <div className="text-gray-500 text-xs md:text-sm w-full order-3 md:order-2">
    © 2025 - Ecommerce Template
  </div>

  {/* Payment icons */}
  <div className="flex gap-4 text-2xl justify-center w-full order-2 md:order-3">
    <SiVisa className="text-blue-600" title="Visa" />
    <SiMastercard className="text-yellow-500" title="MasterCard" />
    <SiAmericanexpress className="text-blue-600" title="American Express" />
    <SiPaypal className="text-blue-600" title="PayPal" />
  </div>

</div>

        </div>
        {/* cart panel */}
        <Drawer
          open={context?.openCartPanel}
          onClose={() => context?.toggleCartPanel(false)}
          anchor={"right"}
          className="cartPanel"
        >
          <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-[#000]">
            <h4>Shopping Cart ({context?.cartData?.length})</h4>
            <IoClose
              className="text-[20px] cursor-pointer"
              onClick={() => context?.toggleCartPanel(false)}
            />
          </div>

        {
          context?.cartData?.length!==0 ? <CartPanel data={context?.cartData} /> :
          <>
       <div className="flex items-center justify-center flex-col pt-[200px] ">
           <img src="/bag.png" alt="" className="!w-[150px]"/>
           <h4 className="!mt-5 text-[20px] font-[600] text-blue-300">Your Cart is Currently empty</h4>
           <Button className="!bg-orange-600 !text-white hover:!bg-black !mt-5" onClick={()=>context?.toggleCartPanel(false)}>Continue Shopping</Button>
       </div>
          </>
        }
          
        </Drawer>


         {/* Address panel */}
        <Drawer
          open={context?.openAddressPanel}
          
          anchor={"right"}
          className="addressPanel"
        >
          <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-[#000]">
            <h4>{context?.addressMode == "add" ? 'Add' : 'Edit'} Delivery Address </h4>
            <IoClose
              className="text-[20px] cursor-pointer"
              onClick={()=>context?.toggleAddressPanel(false)}
            />
          </div>

          <div className="w-full max-h-screen overflow-auto">
          <AddAddress/>
          </div>
          
        </Drawer>

      </footer>



      <Dialog
            open={context?.openProductDetailsModal.open}
            fullWidth={context?.fullWidth}
            maxWidth={context?.maxWidth}
            onClose={context?.handleCloseProductDetailsModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="productDetailsModal"
          >
            <DialogTitle id="alert-dialog-title">
              Product Details
              <Button
                className="!w-[40px] !h-[40px] min-w-[40px] !rounded-full !text-[#000] !absolute top-[10px] right-[10px] "
                onClick={context?.handleCloseProductDetailsModal}
              >
                <IoClose className="text-[20px]" />
              </Button>
            </DialogTitle>
            <DialogContent>
              {
              context?.openProductDetailsModal?.item?.length !== 0 && (
                <div className="flex flex-col md:flex-row items-start w-full productDetailsModalContainer relative">
                  <div className="col1 w-full md:w-[40%] px-3 h-auto md:h-[70vh]">
                    <ProductZoom images={ context?.openProductDetailsModal?.item?.images} />
                  </div>

                  <div className="col2 w-full md:w-[60%] py-6 md:py-8 px-4 md:px-8">
                    <ProductDetailsComponent
                      item={ context?.openProductDetailsModal?.item}
                    />
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* size chart */}
          <Dialog
  open={context?.openSizeChart}
  fullWidth={true}
  maxWidth="sm"
  onClose={() => context?.setOpenSizeChart(false)}
>
  <DialogTitle>
    Size Guide
    <Button
      className="!w-[40px] !h-[40px] min-w-[40px] !rounded-full !text-[#000] !absolute top-[10px] right-[10px]"
      onClick={() => context?.setOpenSizeChart(false)}
    >
      <IoClose className="text-[20px]" />
    </Button>
  </DialogTitle>
<DialogContent>
  <div className="w-full overflow-x-auto">
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="bg-[#fce8f1]">
          <th className="border p-3 font-semibold text-[#b74c7f]">Size</th>
          <th className="border p-3 font-semibold text-[#b74c7f]">Bust (in)</th>
          <th className="border p-3 font-semibold text-[#b74c7f]">Waist (in)</th>
          <th className="border p-3 font-semibold text-[#b74c7f]">Hip (in)</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td className="border p-3">XS</td>
          <td className="border p-3">32 - 33</td>
          <td className="border p-3">24 - 25</td>
          <td className="border p-3">34 - 35</td>
        </tr>

        <tr className="bg-[#fff6fa]">
          <td className="border p-3">S</td>
          <td className="border p-3">34 - 35</td>
          <td className="border p-3">26 - 27</td>
          <td className="border p-3">36 - 37</td>
        </tr>

        <tr>
          <td className="border p-3">M</td>
          <td className="border p-3">36 - 37</td>
          <td className="border p-3">28 - 29</td>
          <td className="border p-3">38 - 39</td>
        </tr>

        <tr className="bg-[#fff6fa]">
          <td className="border p-3">L</td>
          <td className="border p-3">38 - 40</td>
          <td className="border p-3">30 - 32</td>
          <td className="border p-3">40 - 42</td>
        </tr>

        <tr>
          <td className="border p-3">XL</td>
          <td className="border p-3">41 - 43</td>
          <td className="border p-3">33 - 35</td>
          <td className="border p-3">43 - 45</td>
        </tr>

        <tr className="bg-[#fff6fa]">
          <td className="border p-3">XXL</td>
          <td className="border p-3">44 - 46</td>
          <td className="border p-3">36 - 38</td>
          <td className="border p-3">46 - 48</td>
        </tr>
      </tbody>
    </table>
  </div>
</DialogContent>

</Dialog>
    </>
  );
};

export default Footer;



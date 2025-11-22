 import React from 'react'
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Index.jsx";
import Header from "./Components/Header/Index.jsx";
import Sidebar from "./Components/Sidebar/Index.jsx";
import { createContext, useState } from "react";
import Login from "./pages/Login/index.jsx";
import SignUp from "./pages/Signup/index.jsx";
import Products from "./pages/Products/Index.jsx";

import toast, {Toaster} from 'react-hot-toast'; 

import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';


import Users from './pages/Users/Index.jsx';
import Orders from './pages/Orders/Index.jsx';
import ForgotPassword from './pages/ForgotPassword/index.jsx';
import VerifyAccount from './pages/VerifyAccount/index.jsx';
import ChangePassword from './pages/ChangePassword/index.jsx';
import { fetchDataFromApi } from '../Utlis/Api.js';
import { useEffect } from 'react';
import Profile from './pages/Profile/index.jsx';
import CategoryList from './pages/Categegory/Index.jsx';
import SubCatList from './pages/Categegory/SubCatList.jsx';
import ProductDetails from './pages/Products/productDetails.jsx';

import AddSize from './pages/Products/addSize.jsx';
import HomeSliderBanner from './pages/HomeSliderBanners/Index.jsx';





   const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const alertBox = (status, msg)=>{

    if(status.toLowerCase()==="success"){
      toast.success(msg);
    }
    if(status.toLowerCase()==="error"){
      toast.error(msg);
    }

  }

export const MyContext = createContext();

function createData(
  id,
  name,
  category,
  subCategory,
  oldPrice,
  newPrice,
  stock
) {
  return { id, name, category, subCategory, oldPrice, newPrice, stock };
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData]= useState(null);
  const [address, setAddress]= useState([]);
  const [catData, setCatData]= useState([]);

  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    id : ""
  });
   const [isOpenFullScreenPanel2 , setIsOpenFullScreenPanel2] = useState({
    open: false,
    id : ""
  });
  

  const [productRows, setProductRows] = useState([
    createData(
      1,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      85
    ),
    createData(
      2,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      35
    ),
    createData(
      3,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      75
    ),
    createData(
      4,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      55
    ),
    createData(
      5,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      15
    ),
    createData(
      6,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      5
    ),
    createData(
      7,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      40
    ),
    createData(
      8,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      20
    ),
    createData(
      9,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      90
    ),
    createData(
      10,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      70
    ),
    createData(
      11,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      40
    ),
    createData(
      12,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      39
    ),
    createData(
      13,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      69
    ),
  ]);

  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true
                    ? "w-[23%] transition-all"
                    : "w-[0%] opacity-0 transition-all"
                }`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen
                    ? "w-[77%] transition-all"
                    : "w-[100%] transition-all"
                }`}
              >
                <Dashboard />
              </div>
            </div>
          </section>
        </>
      ),
    },

    {
      path: "/login",
      exact: true,
      element: (
        <>
          <section className="main">
            <Login />
          </section>
        </>
      ),
    },

    

    {
      path: "/forgot-password",
      exact: true,
      element: (
        <>
          <section className="main">
            <ForgotPassword />
          </section>
        </>
      ),
    },

    {
      path: "/verify-account",
      exact: true,
      element: (
        <>
          <section className="main">
            <VerifyAccount />
          </section>
        </>
      ),
    },

    {
      path: "/change-password",
      exact: true,
      element: (
        <>
          <section className="main">
            <ChangePassword />
          </section>
        </>
      ),
    },

    {
      path: "/signup",
      exact: true,
      element: (
        <>
          <section className="main">
            <SignUp />
          </section>
        </>
      ),
    },

    {
      path: "/products",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true
                    ? "w-[23%] transition-all"
                    : "w-[0%] opacity-0 transition-all"
                }`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen
                    ? "w-[77%] transition-all"
                    : "w-[100%] transition-all"
                }`}
              >
                <Products />
              </div>
            </div>
          </section>
        </>
      ),
    },

     {
      path: "/homeSlider/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true
                    ? "w-[23%] transition-all"
                    : "w-[0%] opacity-0 transition-all"
                }`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen
                    ? "w-[77%] transition-all"
                    : "w-[100%] transition-all"
                }`}
              >
                <HomeSliderBanner />
              </div>
            </div>
          </section>
        </>
      ),
    },

      {
      path: "/category/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true
                    ? "w-[23%] transition-all"
                    : "w-[0%] opacity-0 transition-all"
                }`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen
                    ? "w-[77%] transition-all"
                    : "w-[100%] transition-all"
                }`}
              >
                <CategoryList />
              </div>
            </div>
          </section>
        </>
      ),
    },

      {
      path: "/subCategory/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true
                    ? "w-[23%] transition-all"
                    : "w-[0%] opacity-0 transition-all"
                }`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen
                    ? "w-[77%] transition-all"
                    : "w-[100%] transition-all"
                }`}
              >
                <SubCatList />
              </div>
            </div>
          </section>
        </>
      ),
    },

      {
      path: "/users",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true
                    ? "w-[23%] transition-all"
                    : "w-[0%] opacity-0 transition-all"
                }`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen
                    ? "w-[77%] transition-all"
                    : "w-[100%] transition-all"
                }`}
              >
                <Users />
              </div>
            </div>
          </section>
        </>
      ),
    },

      {
      path: "/orders",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true
                    ? "w-[23%] transition-all"
                    : "w-[0%] opacity-0 transition-all"
                }`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen
                    ? "w-[77%] transition-all"
                    : "w-[100%] transition-all"
                }`}
              >
                <Orders />
              </div>
            </div>
          </section>
        </>
      ),
    },

  {
      path: "/profile",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true
                    ? "w-[23%] transition-all"
                    : "w-[0%] opacity-0 transition-all"
                }`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen
                    ? "w-[77%] transition-all"
                    : "w-[100%] transition-all"
                }`}
              >
                <Profile />
              </div>
            </div>
          </section>
        </>
      ),
    },

 {
      path: "/product/:id",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true
                    ? "w-[23%] transition-all"
                    : "w-[0%] opacity-0 transition-all"
                }`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen
                    ? "w-[77%] transition-all"
                    : "w-[100%] transition-all"
                }`}
              >
                <ProductDetails />
              </div>
            </div>
          </section>
        </>
      ),
    },

     {
      path: "/product/addSize",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true
                    ? "w-[23%] transition-all"
                    : "w-[0%] opacity-0 transition-all"
                }`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen
                    ? "w-[77%] transition-all"
                    : "w-[100%] transition-all"
                }`}
              >
                <AddSize />
              </div>
            </div>
          </section>
        </>
      ),
    },

  ]);

useEffect(()=>{
     const token= localStorage.getItem('accessToken');
     if(token!==undefined && token!==null && token !==""){
       setIsLogin(true)

       fetchDataFromApi(`/api/user/user-details`).then((res)=>{

           if(res?.success){
             setUserData(res?.data);
           } else if(res?.message === "You have not login" || res?.message === "jwt expired" || res?.message === "Invalid token"){
             localStorage.removeItem('accessToken');
             localStorage.removeItem('refreshToken');
             setUserData(null);
             alertBox("error","Your session is closed please login again")
             window.location.href="/login";
           }

       });

     }else{
       setIsLogin(false)
       setUserData(null);
     }
   },[])// Remove [isLogin] to prevent infinite loop

    useEffect(()=>{
      fetchDataFromApi("/api/category").then((res)=>{
        setCatData(res?.data)
      })
    }, [])


  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    productRows,
    setProductRows,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
   isOpenFullScreenPanel2,
 setIsOpenFullScreenPanel2,
    alertBox,
    setUserData,
    userData,
    address,
    setAddress,
    setCatData,
    catData,
  };

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />

      

        <Toaster/>

      </MyContext.Provider>
    </>
  );
}

export default App;
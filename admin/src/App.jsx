import React from 'react'
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { createContext, useState } from "react";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import Products from "./Pages/Products/Index";
import AddProduct from './Pages/Products/AddProduct';
import Dialog from '@mui/material/Dialog';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { FaDoorClosed } from "react-icons/fa6";
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import HomeSliderBanners from './Pages/HomeSliderBanners/Index';
import AddHomeSlide from './Pages/HomeSliderBanners/AddHomeSlide';
import CategoryList from './Pages/Categegory/Index';
import AddCategory from './Pages/Categegory/AddCategory';
import SubCatList from './Pages/Categegory/SubCatList';
import AddSubCategory from './Pages/Categegory/AddSubCategory';
import Users from './pages/Users/Index';
import Orders from './Pages/Orders/Index';
import ForgotPassword from './pages/ForgotPassword';
import VerifyAccount from './pages/VerifyAccount';
import ChangePassword from './pages/ChangePassword';




   const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


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
  const [isSidebarOpen, setisSidebarOpen] = useState(true);
  const [isLogin, setisLogin] = useState(false);

  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model : "",
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
                <HomeSliderBanners />
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


  ]);



  const values = {
    isSidebarOpen,
    setisSidebarOpen,
    isLogin,
    setisLogin,
    productRows,
    setProductRows,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
  };

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />

       <Dialog
        fullScreen
        open={isOpenFullScreenPanel.open}
        onClose={()=>setIsOpenFullScreenPanel({
          open: false,
        })}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setIsOpenFullScreenPanel({
                open: false,
              })}
              aria-label="close"
            >
              <FaDoorClosed   />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {isOpenFullScreenPanel ?.model}
            </Typography>
         
          </Toolbar>
        </AppBar>
     
        {
          isOpenFullScreenPanel ?.model === "Add Product" && <AddProduct/>
        }

        {
          isOpenFullScreenPanel ?.model === "Add Home Slide" && <AddHomeSlide/>
        }

         {
          isOpenFullScreenPanel ?.model === "Add New Category" && <AddCategory/>
        }

      {
          isOpenFullScreenPanel ?.model === "Add New Sub Category" && <AddSubCategory/>
        }

      </Dialog>



      </MyContext.Provider>
    </>
  );
}

export default App;
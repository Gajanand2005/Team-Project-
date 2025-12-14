import React, { useContext, lazy, Suspense } from 'react'
import "./App.css";
import './respo.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Dashboard = lazy(() => import("./pages/Dashboard/Index.jsx"));
const Header = lazy(() => import("./Components/Header/Index.jsx"));
const Sidebar = lazy(() => import("./Components/Sidebar/Index.jsx"));
import { createContext, useState } from "react";
const Login = lazy(() => import("./pages/Login/index.jsx"));
const SignUp = lazy(() => import("./pages/Signup/index.jsx"));
const Products = lazy(() => import("./pages/Products/Index.jsx"));

import toast, {Toaster} from 'react-hot-toast';
import Slide from '@mui/material/Slide';
const Users = lazy(() => import('./pages/Users/Index.jsx'));
const Orders = lazy(() => import('./pages/Orders/Index.jsx'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword/index.jsx'));
const VerifyAccount = lazy(() => import('./pages/VerifyAccount/index.jsx'));
const ChangePassword = lazy(() => import('./pages/ChangePassword/index.jsx'));
import { fetchDataFromApi } from '../Utils/Api.js';
import { useEffect } from 'react';
const Profile = lazy(() => import('./pages/Profile/index.jsx'));
const CategoryList = lazy(() => import('./pages/Categegory/Index.jsx'));
const SubCatList = lazy(() => import('./pages/Categegory/SubCatList.jsx'));
const ProductDetails = lazy(() => import('./pages/Products/productDetails.jsx'));

const AddSize = lazy(() => import('./pages/Products/addSize.jsx'));
const HomeSliderBanner = lazy(() => import('./pages/HomeSliderBanners/Index.jsx'));





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
  const [windowWidth, setWindowWidth]= useState(window.innerWidth);
  const [sidebarWidth, setSidebarWidth]= useState(18);

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

const context = useContext(MyContext)

  const router = createBrowserRouter([

{
  path: "/",
  exact: true,
  element: (
    <>
      <section className="main">
        <Header />
        {/* Parent div should ALWAYS have 'flex' */}
        <div className={`contentMain flex w-full relative`}>
          {/* Overlay for mobile - only covers content, not header */}
          {isSidebarOpen && (
            <div
              className="absolute inset-0 bg-black/50 z-[40] sm:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          <div 
            className={`sidebarWrapper ${
              isSidebarOpen === true 
                ? 'w-[60%] sm:w-[23%]' 
                : 'w-0'
            } transition-all duration-300 overflow-hidden flex-shrink-0 relative z-[41]`}
          >
            <Sidebar />
          </div>

          <div 
            className={`contentRight py-4 px-4 sm:px-5 flex-1 overflow-auto transition-all duration-300`}
          >
            <Dashboard />
          </div>
        </div>
      </section>
    </>
  )
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
            <div className="contentMain flex w-full relative">
              {/* Overlay for mobile - only covers content, not header */}
              {isSidebarOpen && (
                <div
                  className="absolute inset-0 bg-black/50 z-[40] sm:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen === true
                    ? 'w-[60%] sm:w-[23%]'
                    : 'w-0'
                } transition-all duration-300 overflow-hidden flex-shrink-0 relative z-[41]`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-4 sm:px-5 flex-1 overflow-auto transition-all duration-300`}
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
            <div className="contentMain flex w-full relative">
              {/* Overlay for mobile - only covers content, not header */}
              {isSidebarOpen && (
                <div
                  className="absolute inset-0 bg-black/50 z-[40] sm:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen === true
                    ? 'w-[60%] sm:w-[23%]'
                    : 'w-0'
                } transition-all duration-300 overflow-hidden flex-shrink-0 relative z-[41]`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-4 sm:px-5 flex-1 overflow-auto transition-all duration-300`}
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
            <div className="contentMain flex w-full relative">
              {/* Overlay for mobile - only covers content, not header */}
              {isSidebarOpen && (
                <div
                  className="absolute inset-0 bg-black/50 z-[40] sm:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen === true
                    ? 'w-[60%] sm:w-[23%]'
                    : 'w-0'
                } transition-all duration-300 overflow-hidden flex-shrink-0 relative z-[41]`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-4 sm:px-5 flex-1 overflow-auto transition-all duration-300`}
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
            <div className="contentMain flex w-full relative">
              {/* Overlay for mobile - only covers content, not header */}
              {isSidebarOpen && (
                <div
                  className="absolute inset-0 bg-black/50 z-[40] sm:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen === true
                    ? 'w-[60%] sm:w-[23%]'
                    : 'w-0'
                } transition-all duration-300 overflow-hidden flex-shrink-0 relative z-[41]`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-4 sm:px-5 flex-1 overflow-auto transition-all duration-300`}
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
            <div className="contentMain flex w-full relative">
              {/* Overlay for mobile - only covers content, not header */}
              {isSidebarOpen && (
                <div
                  className="absolute inset-0 bg-black/50 z-[40] sm:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen === true
                    ? 'w-[60%] sm:w-[23%]'
                    : 'w-0'
                } transition-all duration-300 overflow-hidden flex-shrink-0 relative z-[41]`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-4 sm:px-5 flex-1 overflow-auto transition-all duration-300`}
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
            <div className="contentMain flex w-full relative">
              {/* Overlay for mobile - only covers content, not header */}
              {isSidebarOpen && (
                <div
                  className="absolute inset-0 bg-black/50 z-[40] sm:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen === true
                    ? 'w-[60%] sm:w-[23%]'
                    : 'w-0'
                } transition-all duration-300 overflow-hidden flex-shrink-0 relative z-[41]`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-4 sm:px-5 flex-1 overflow-auto transition-all duration-300`}
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
            <div className="contentMain flex w-full relative">
              {/* Overlay for mobile - only covers content, not header */}
              {isSidebarOpen && (
                <div
                  className="absolute inset-0 bg-black/50 z-[40] sm:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen === true
                    ? 'w-[60%] sm:w-[23%]'
                    : 'w-0'
                } transition-all duration-300 overflow-hidden flex-shrink-0 relative z-[41]`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-4 sm:px-5 flex-1 overflow-auto transition-all duration-300`}
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
            <div className="contentMain flex w-full relative">
              {/* Overlay for mobile - only covers content, not header */}
              {isSidebarOpen && (
                <div
                  className="absolute inset-0 bg-black/50 z-[40] sm:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen === true
                    ? 'w-[60%] sm:w-[23%]'
                    : 'w-0'
                } transition-all duration-300 overflow-hidden flex-shrink-0 relative z-[41]`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-4 sm:px-5 flex-1 overflow-auto transition-all duration-300`}
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
            <div className="contentMain flex w-full relative">
              {/* Overlay for mobile - only covers content, not header */}
              {isSidebarOpen && (
                <div
                  className="absolute inset-0 bg-black/50 z-[40] sm:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen === true
                    ? 'w-[60%] sm:w-[23%]'
                    : 'w-0'
                } transition-all duration-300 overflow-hidden flex-shrink-0 relative z-[41]`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-4 sm:px-5 flex-1 overflow-auto transition-all duration-300`}
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
     const token= localStorage.getItem('adminAccessToken');
     if(token!==undefined && token!==null && token !==""){
       setIsLogin(true)

       fetchDataFromApi(`/api/admin/auth/user-details`).then((res)=>{

           if(res?.success){
             setUserData(res?.data);
           } else if(res?.message === "You have not login" || res?.message === "jwt expired" || res?.message === "Invalid token"){
             localStorage.removeItem('adminAccessToken');
             localStorage.removeItem('adminRefreshToken');
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

useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

window.addEventListener("resize",handleResize)

return ()=>{
  window.removeEventListener("resize",handleResize);
};


}, [])

useEffect(()=>{
if(windowWidth < 992){
  setIsSidebarOpen(false);
  setSidebarWidth(100)
}else{
  setSidebarWidth(18)
}
},[windowWidth])


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
    windowWidth, 
    setWindowWidth,
    sidebarWidth, 
    setSidebarWidth,
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


import React, { createContext, useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductListing from "./Pages/ProductListing/index.jsx";
import Home from "./Pages/Home/index.jsx";
import ProductDetails from "./Pages/ProductDetails/index.jsx";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ProductZoom from "./components/ProductZoom/index.jsx";
import { IoClose } from "react-icons/io5";
import ProductDetailsComponent from "./components/ProductDetails/index.jsx";
import Login from "./Pages/Login/index.jsx";
import Register from "./Pages/Register/index.jsx";
import CartPage from "./Pages/Cart/index.jsx";
import Verify from "./Pages/Verify/index.jsx";
import toast, {Toaster} from 'react-hot-toast'; 
import ForgotPassword from './Pages/ForgotPassword/index.jsx'
import CheckOut from "./Pages/CheckOut/index.jsx";
import MyAccount from "./Pages/MyAccount/index.jsx";
import MyList from "./Pages/MyList/index.jsx";
import Order from "./Pages/Orders/index.jsx";
import Whataap from "./components/Whataap/index.jsx";
import BlogList from "./components/BlogList/index.jsx";
import { fetchDataFromApi } from "./utils/api.js";




const MyContext = createContext();

function App()  {
  const [openProductDetailsModal, setOpenProductDetailsModel] = useState(false);
  const [maxWidth, setMaxWidth] = useState("lg");
  const [fullWidth, setFullWidth] = useState(true);
  const [openCartPanel, setOpenCartPanel] =useState(false);
  const [isLogin, setIsLogin]= useState(false);
  const [userData, setUserData] = useState(null);
  // const apiUrl = import.meta.env.VITE_API_URL;

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModel(false);
  };

  const toggleCartPanel = (newOpen)=>()=>{
    setOpenCartPanel(newOpen);
  };

  
  useEffect(()=>{

    const token = localStorage.getItem('accessToken')
    if(token!==undefined && token!==null && token!==""){
       setIsLogin(true);

       fetchDataFromApi(`/api/user/user-details?token=${token}`).then((res)=>{
        // console.log(res);
        setUserData(res.data);
       })
    }else{
      setIsLogin(false);
    }
  },[isLogin])


  const alertBox = (type, msg)=>{
    if(type==="success"){
      toast.success(msg);
    }
    if(type==="error"){
      toast.error(msg);
    }

  }

  const value = {
    setOpenProductDetailsModel,
    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
    isLogin,
    setIsLogin,
    alertBox,
    setUserData,
    userData
  };

  return ( 
    <>
      <BrowserRouter>
        <MyContext.Provider value={value}>
          <Header />
          <Routes>
            <Route path={"/"} exact={true} element={<Home />} />
            <Route
              path={"/productListing"}
              exact={true}
              element={<ProductListing />}
            />
            <Route
              path={"/product/:id"}
              exact={true}
              element={<ProductDetails />}
            />
            <Route path={"/login"} exact={true} element={<Login />} />
            <Route path={"/register"} exact={true} element={<Register />} />
            <Route path={"/cart"} exact={true} element={<CartPage />} />
            <Route path={"/verify"} exact={true} element={<Verify />} />
            <Route path={"/forgot-Password"} exact={true} element={<ForgotPassword />} />
            <Route path={"/checkout"} exact={true} element={<CheckOut />} />
             <Route path={"/my-account"} exact={true} element={<MyAccount />} />
              <Route path={"/my-list"} exact={true} element={<MyList />} />
              <Route path={"/my-order"} exact={true} element={<Order />} />
          </Routes>
          <Whataap/>
          <BlogList/>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>
      {/* <Toaster/> */}
      <Dialog
        open={openProductDetailsModal}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="productDetailsModal"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="flex items-center w-full productDetailsModalContainer relative ">
            <Button
              className="!w-[40px] !h-[40px] min-w-[40px] !rounded-full !text-[#000] !absolute top-[0px] right-[0px] "
              onClick={handleCloseProductDetailsModal}
            >
              <IoClose className="text-[20px]" />
            </Button>
            <div className="col1 w-[40%] px-3">
              <ProductZoom />
            </div>

            <div className="col2 w-[60%] py-8 px-8">
              <ProductDetailsComponent />
            </div>
          </div>
        </DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>


      <Toaster/>

    </>
  );
};

export default App;
export { MyContext };

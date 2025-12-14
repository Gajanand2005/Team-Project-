import React, { createContext, useEffect, useState } from "react";
import Footer from "./Components/Footer/index.jsx";
import MobileBottomNav from "./Components/MobileBottomNav/index.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductListing from "./Pages/ProductListing/index.jsx";
import ProductDetails from "./Pages/ProductDetails/index.jsx";
import Login from "./Pages/Login/index.jsx";
import Register from "./Pages/Register/index.jsx";
import CartPage from "./Pages/Cart/index.jsx";
import toast, { Toaster } from "react-hot-toast";
import ForgotPassword from "./Pages/ForgotPassword/index.jsx";
import CheckOut from "./Pages/CheckOut/index.jsx";
import MyAccount from "./Pages/MyAccount/index.jsx";
import MyList from "./Pages/MyList/index.jsx";
import Order from "./Pages/Orders/index.jsx";
import Whataap from "./Components/Whataap/index.jsx";
import HelpCenter from "./Pages/HelpCenter/Index.jsx";
import { fetchDataFromApi, postData, editData } from "./Utils/Api.js";
import Verify from "./Pages/Verify/index.jsx";
import Address from "./Pages/MyAccount/Address.jsx";
import Home from "./Pages/Home/index.jsx";
import Size from "./Pages/SizeGuide/Index.jsx";
import Header from "./Components/Header/index.jsx";
import SearchPage from "./Pages/Search/index.jsx";
import Success from "./Pages/Orders/success.jsx";
import Failed from "./Pages/Orders/failed.jsx";
import Delivery from "./Components/Footer/Delivery.jsx";
import Aboutus from "./Components/Footer/Aboutus.jsx";
import "./respo.css"


const MyContext = createContext();
const App = () => {
  const [openProductDetailsModal, setOpenProductDetailsModel] = useState({
    open: false,
    item: {},
  });
  const [maxWidth, setMaxWidth] = useState("lg");
  const [fullWidth, setFullWidth] = useState(true);
  const [openCartPanel, setOpenCartPanel] = useState(false);
   const [openAddressPanel, setOpenAddressPanel] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [catData, setCatData] = useState([]);
  const [openSizeChart, setOpenSizeChart] = useState(false);
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: "",
    id: "",
  });
    const [addressMode, setAddressMode] = useState("add");
  const [cartData, setCartData] = useState([]);
  const [myListData, setMyListData] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [addressId, setAddressId]= useState("");
  const [searchData, setSearchData]= useState([]);
const [currency, setCurrency] = useState("INR");
const [currencyRate, setCurrencyRate] = useState(1);
  const [windowWidth, setWindowWidth]= useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenProductDetailsModal = (status, item) => {
    setOpenProductDetailsModel({
      open: status,
      item: item,
    });
  };
  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModel({
      open: false,
      item: {},
    });
  };

  const toggleCartPanel = (newOpen) => {
    setOpenCartPanel(newOpen);
  };

   const toggleAddressPanel = (newOpen) => {
    if(newOpen === false){
      setAddressMode("add");
    }
    setOpenAddressPanel (newOpen);
  };



useEffect(() => {
  setCurrencyRate(currencyRates[currency]);
}, [currency]);


const currencyRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,   // British Pound
  AUD: 0.018,    // Australian Dollar
  CAD: 0.017,    // Canadian Dollar
  AED: 0.044,    // UAE Dirham
};

// global converter
const formatPrice = (amount) => {
  const converted = (amount * currencyRate).toFixed(2);

  switch (currency) {
    case "INR": return "₹" + converted;
    case "USD": return "$" + converted;
    case "EUR": return "€" + converted;
    case "GBP": return "£" + converted;
    case "AUD": return "A$" + converted;
    case "CAD": return "C$" + converted;
    case "AED": return "د.إ" + converted;
    default: return converted;
  }
};




  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

      fetchDataFromApi(`/api/user/user-details`)
        .then((res) => {
          if (res?.success) {
            setUserData(res?.data);
            getAddressData();
          } else if (
            res?.message === "You have not login" ||
            res?.message === "jwt expired" ||
            res?.message === "Invalid token"
          ) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            alertBox("error", "Your session is closed please login again");
            window.location.href = "/login";
            setIsLogin(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          alertBox("error", "Failed to fetch user details");
        });

      getCartItems();
      getMyListData();
    } else {
      setIsLogin(false);
    }
  }, []); // Remove [isLogin] to prevent infinite loop

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      if (res?.error === false) {
        setCatData(res?.data);
      }
    });
     const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

window.addEventListener("resize",handleResize)

return ()=>{
  window.removeEventListener("resize",handleResize);
};
  }, []);

  const alertBox = (status, msg) => {
    if (status.toLowerCase() === "success") {
      toast.success(msg);
    }
    if (status.toLowerCase() === "error") {
      toast.error(msg);
    }
  };

  const addToCart = (product, userId, quantity) => {
    if (userId === undefined) {
      alertBox("error", "You are not logged in, please login first");
      return false;
    }

    const data = {
      productTitle: product?.name,
      image: product?.image || product?.images?.[0],
      price: product?.price,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
      quantity: quantity,
      countInStock: product?.countInStock,
      productId: product?._id,
      subTotal: Number(product?.price) * quantity,
      userId: userId,
      brand: product?.brand,
      size: Array.isArray(product?.size) ? product?.size?.[0] : product?.size || '',
    };

    postData("/api/cart/add", data).then((res) => {
      if (res?.error === false) {
        alertBox("success", res?.message);

        getCartItems();
      } else {
        alertBox("error", res?.message);
      }
    });
  };

  const getCartItems = () => {
    fetchDataFromApi(`/api/cart/get`).then((res) => {
      if (res?.error === false) {
        setCartData(res?.data);
      }
    });
  };

  const updateCartSize = (_id, size) => {
    const data = {
      _id: _id,
      size: size,
    };

    editData("/api/cart/update-size", data).then((res) => {
      if (res?.error === false) {
        alertBox("success", "Size updated successfully");
        getCartItems();
      } else {
        alertBox("error", res?.message);
      }
    });
  };


  const getMyListData =() => {

fetchDataFromApi(`api/myList/`).then((res)=>{
  if(res?.error === false){
    setMyListData(res?.data);
  }
})

  }

  const getAddressData = () => {
    fetchDataFromApi(`/api/address/get?userId=${userData?._id}`).then((res) => {
      if (res?.error === false) {
        setAddressData(res?.data);
      }
    });
  };
  


  const value = {
    setOpenProductDetailsModel,
    openProductDetailsModal,
    handleOpenProductDetailsModal,
    handleCloseProductDetailsModal,
    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
    setOpenAddressPanel,
    toggleAddressPanel,
    openAddressPanel,
    maxWidth,
    fullWidth,
    setMaxWidth,
    setFullWidth,
    alertBox,
    isLogin,
    setIsLogin,
    setUserData,
    userData,
    setCatData,
    catData,
    setIsOpenFullScreenPanel,
    isOpenFullScreenPanel,
    addToCart,
    cartData,
    setCartData,
    getCartItems,
    updateCartSize,
    myListData,
    setMyListData,
    getMyListData,
    addressData,
    setAddressData,
    getAddressData,
    setAddressMode,
    addressMode,
    setAddressId,
    addressId,
    openSizeChart,
setOpenSizeChart,
  currency,
  setCurrency,
  currencyRate,
  formatPrice,
  searchData,
  setSearchData,
   windowWidth, 
    setWindowWidth,
    sidebarOpen,
    setSidebarOpen,
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={value}>
          <Header />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route
              path={"/productListing"}
              element={<ProductListing />}
            />
            <Route
              path={"/product/:id"}
              element={<ProductDetails />}
            />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/cart"} element={<CartPage />} />
            <Route path={"/Verify"} element={<Verify />} />
            <Route
              path={"/forgot-Password"}
              element={<ForgotPassword />}
            />
            <Route path={"/checkout"} element={<CheckOut />} />
            <Route path={"/my-account"} element={<MyAccount />} />
            <Route path={"/my-list"} element={<MyList />} />
            <Route path={"/my-order"} element={<Order />} />
            <Route path={"/order/success"} element={<Success/>} />
            <Route path={"/order/failed"} element={<Failed/>} />
            <Route
              path={"/help-center"}
              element={<HelpCenter />}
            />
            <Route path={"/address"} element={<Address />} />
            <Route path={"/search"} element={<SearchPage />} />
            <Route path={"/size"} element={<Size />} />
            <Route path={"/delivery"} element={<Delivery />} />
            <Route path={"/AboutUs"} element={<Aboutus />} />
          </Routes>
          <Whataap />
          {
            windowWidth < 992 && <MobileBottomNav />
          }
          <Footer />
          
        </MyContext.Provider>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
export { MyContext };



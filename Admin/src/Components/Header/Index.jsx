import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { IoMenuSharp } from "react-icons/io5";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { PiBellFill } from "react-icons/pi";
import profilePhoto from "../../assets/profilephoto.jpg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { IoMdSettings } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../../Utils/Api";
import AddProduct from "../../pages/Products/AddProduct";
import AddHomeSlide from "../../pages/HomeSliderBanners/AddHomeSlide";
import AddCategory from "../../pages/Categegory/AddCategory";
import AddSubCategory from "../../pages/Categegory/AddSubCategory";
import AddAdress from "../../pages/Adress/AddAdress";
import EditCategory from './../../pages/Categegory/editCategory';
import Dialog from '@mui/material/Dialog';
import toast, {Toaster} from 'react-hot-toast'; 
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { FaDoorClosed } from "react-icons/fa6";
import { Slide } from "@mui/material";
import EditProduct from "../../pages/Products/editProduct";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));


const Header = () => {
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const history = useNavigate();

   const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


  
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };
  
  const context = useContext(MyContext);

  const logout = () => {
    setAnchorMyAcc(null);

    // Immediately clear client-side state and localStorage
    context?.setIsLogin(false);
    context?.setUserData(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    history("/");

    // Asynchronously call the logout API to clear server-side session
    fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
      { withCredentials: true }
    ).then((res) => {
      // Optional: Handle API response if needed, but session is already ended on client
      if (res?.error === false) {
        console.log("Server-side logout successful");
      } else {
        console.log("Server-side logout failed, but client session ended");
      }
    }).catch((error) => {
      console.log("Logout API call failed, but client session ended");
    });
  };

  return (
    <> 
    <header className="w-full h-[auto] py-2 shadow-md pr-7 bg-[#f1f1f1] flex items-center justify-between bg-white">
      <div
        className={`part1 ${
          context?.isSidebarOpen === true
            ? "pl-[25%] transition-all"
            : "pl-[1%] transition-all"
        }`}
      >
        <Button
          className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[rgba(0,0,0,0.8)]"
          onClick={() => context?.setIsSidebarOpen(!context?.isSidebarOpen)}
        >
          <IoMenuSharp className="text-[22px] text-[rgba(0,0,0,0.8)]" />
        </Button>
      </div>

      <div className="part2 w-[40%] flex items-center justify-end gap-5">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="secondary">
            <PiBellFill className="text-[22px]" />
          </StyledBadge>
        </IconButton>

        {context?.isLogin === true ? (
          <div className="relative">
            <div
              className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer"
              onClick={handleClickMyAcc}
            >
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <Menu
              anchorEl={anchorMyAcc}
              id="account-menu"
              open={openMyAcc}
              onClose={handleCloseMyAcc}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1.5,
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
            >
              <MenuItem onClick={handleCloseMyAcc} className="!bg-white">
                <div className="flex items-center gap-3">
                  <div className="rounded-full w-[40px] h-[40px] overflow-hidden cursor-pointer">
                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="info">
                    <h3 className="text-[15px] font-[500] leading-5">
                      {context?.userData?.name}
                    </h3>
                    <p className="text-[13px] font-[400] opacity-70">
                      {context?.userData?.email}
                    </p>
                  </div>
                </div>
              </MenuItem>

              <Divider />
              <Link to="/profile">
              <MenuItem
                onClick={handleCloseMyAcc}
                className="flex items-center gap-4"
              >
                <FaUser className="text-[16px]" />{" "}
                <span className="text-[16px]">Profile</span>
              </MenuItem>
              </Link>

              <MenuItem
                onClick={handleCloseMyAcc}
                className="flex items-center gap-3"
              >
                <IoMdSettings className="text-[20px]" />{" "}
                <span className="text-[16px]">Settings</span>
              </MenuItem>
              <MenuItem onClick={logout} className="flex items-center gap-3">
                <IoMdLogOut className="text-[20px]" />{" "}
                <span className="text-[16px]">Logout</span>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Link to="/signup">
            <Button className="btn-blue btn-sm !rounded-full">Sign-In</Button>
          </Link>
        )}
      </div>
    </header>

    
       <Dialog
        fullScreen
        open={context?.isOpenFullScreenPanel.open}
        onClose={()=> context?.setIsOpenFullScreenPanel({
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
              onClick={()=>context?.setIsOpenFullScreenPanel({
                open: false,
              })}
              aria-label="close"
            >
              <FaDoorClosed   />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {context?.isOpenFullScreenPanel ?.model}
            </Typography>
         
          </Toolbar>
        </AppBar>
       {
          context?.isOpenFullScreenPanel ?.model === "Add Product" && <AddProduct/>
        }

        {
          context?.isOpenFullScreenPanel ?.model === "Add Home Slide" && <AddHomeSlide/>
        }

         {
          context?.isOpenFullScreenPanel ?.model === "Add New Category" && <AddCategory/>
        }

      {
          context?.isOpenFullScreenPanel ?.model === "Add New Sub Category" && <AddSubCategory/>
        }
      {
          context?.isOpenFullScreenPanel ?.model === "Add New Address" && <AddAdress/>
        }

        {
          context?.isOpenFullScreenPanel ?.model === "Edit Category" && <EditCategory/>
        }

        {
          context?.isOpenFullScreenPanel ?.model === "Edit Product" && <EditProduct/>
        }

      </Dialog>
  </>
  );
};

export default Header;



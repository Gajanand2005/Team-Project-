import React, { useState, useContext } from "react";
// import Sidebar from "../../Components/Sidebar/Index.jsx";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import ProductItem from "../../Components/ProductItem/index.jsx";
import ProductItemListView from "../../Components/ProductItemListView/index.jsx";
import Button from "@mui/material/Button";
import { BsUiRadiosGrid } from "react-icons/bs";
import { TfiLayoutGrid2Thumb } from "react-icons/tfi";
import { RiMenuSearchLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { MdClose } from "react-icons/md";
import Sidebar from "../../Components/Sidebar/index.jsx";
import ProductLoadingGrid from "../../Components/ProductLoading/ProductLoadingGrid.jsx";
import { postData } from "../../Utils/Api.js";
import { MyContext } from "../../App.jsx";

const ProductListing = () => {
  const context = useContext(MyContext);
  const [itemView, setIsItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [productData, setProductData] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSortVAl,setSelectedSortVal] = useState("Name, A to Z");

  // Close sidebar drawer when window resizes to desktop size
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && context?.sidebarOpen) {
        context?.setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [context?.sidebarOpen]);





  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


const handleSortBy = (name,order,products,value) => {
  setSelectedSortVal(value);
  postData(`/api/product/sortBy`,{
    products:products,
    sortBy:name,
    order:order
  }).then((res)=>{
    setProductData(res);
    setAnchorEl(null)
  })
}







  return (
    <section className="py-4 md:py-8 pb-0">
      <div className="container">
        <Breadcrumbs 
          aria-label="breadcrumb"
          sx={{ fontSize: { xs: '0.75rem', md: '1rem' } }}
        >
          <Link
            underline="hover"
            color="inherit"
            href="/"
            className="link transition"
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/"
            className="link transition"
          >
            Fashion
          </Link>
        </Breadcrumbs>
      </div>
      <div className="bg-white py-2 sm:py-3 md:py-6 mt-2 sm:mt-3 md:mt-4">
        <div className="container flex flex-col md:flex-row gap-2 sm:gap-3 md:gap-6 px-2 sm:px-3 md:px-0">
          {/* Desktop Sidebar */}
          <div className="sidebarWrapper hidden md:block w-full md:w-[25%] lg:w-[20%] bg-white">
            <Sidebar  
            productData={productData}
             setProductData={setProductData} 
            isloading={isloading} 
            setIsLoading={setIsLoading}
            page={page}
            setTotalPages={setTotalPages}
            />
          </div>

          {/* Mobile Sidebar Drawer */}
          <Drawer
            anchor="left"
            open={context?.sidebarOpen || false}
            onClose={() => context?.setSidebarOpen(false)}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                width: { xs: '85%', sm: '320px' },
                maxWidth: '400px',
                padding: '16px',
                paddingTop: '50px',
                boxSizing: 'border-box',
              },
            }}
            ModalProps={{
              keepMounted: true, // Better mobile performance
            }}
          >
            <div className="relative h-full">
              <IconButton
                onClick={() => context?.setSidebarOpen(false)}
                sx={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  zIndex: 10,
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.1)',
                  }
                }}
              >
                <MdClose size={24} />
              </IconButton>
              <div className="overflow-y-auto h-full pb-4">
                <Sidebar  
                  productData={productData}
                  setProductData={setProductData} 
                  isloading={isloading} 
                  setIsLoading={setIsLoading}
                  page={page}
                  setTotalPages={setTotalPages}
                />
              </div>
            </div>
          </Drawer>

          <div className="rightContent w-full md:w-[75%] lg:w-[80%] px-2 md:px-0">
            <div className="bg-[#f1f1f1] p-2 sm:p-3 md:p-4 w-full mb-3 md:mb-4 rounded-md flex items-center gap-2 sm:gap-3 sticky top-[70px] md:top-[100px] lg:top-[130px] z-[99]">
              {/* Hamburger Menu */}
              <Button
                onClick={() => context?.setSidebarOpen(true)}
                className="!w-[32px] !h-[32px] sm:!w-[35px] sm:!h-[35px] md:!w-[40px] md:!h-[40px] !min-w-[32px] sm:!min-w-[35px] md:!min-w-[40px] !rounded-full !bg-[#e0e0e0] hover:!bg-[#d0d0d0] !text-[#000] !p-0"
              >
                <FaBars className="text-xs sm:text-sm md:text-base" />
              </Button>

              {/* View Toggle Buttons */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Button
                  className={`!w-[32px] !h-[32px] sm:!w-[35px] sm:!h-[35px] md:!w-[40px] md:!h-[40px] !min-w-[32px] sm:!min-w-[35px] md:!min-w-[40px] !rounded-full !bg-[#e0e0e0] hover:!bg-[#d0d0d0] !text-[#000] !p-0 ${
                    itemView == "list" && "!bg-orange-500 !text-white hover:!bg-orange-600"
                  }`}
                  onClick={() => setIsItemView("list")}
                >
                  <RiMenuSearchLine className="text-xs sm:text-sm md:text-base" />
                </Button>
                <Button
                  className={`!w-[32px] !h-[32px] sm:!w-[35px] sm:!h-[35px] md:!w-[40px] md:!h-[40px] !min-w-[32px] sm:!min-w-[35px] md:!min-w-[40px] !rounded-full !bg-[#e0e0e0] hover:!bg-[#d0d0d0] !text-[#000] !p-0 ${
                    itemView == "grid" && "!bg-orange-500 !text-white hover:!bg-orange-600"
                  }`}
                  onClick={() => setIsItemView("grid")}
                >
                  <BsUiRadiosGrid className="text-xs sm:text-sm md:text-base" />
                </Button>
              </div>

              {/* Spacer */}
              <div className="flex-1"></div>

              {/* Sort Section */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-[11px] sm:text-[12px] md:text-[14px] font-medium text-[rgba(0,0,0,0.7)] whitespace-nowrap">
                  Sort By
                </span>

                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-white !text-[10px] sm:!text-[11px] md:!text-[12px] !text-[#000] !font-semibold capitalize !border !border-[#000] !px-2 sm:!px-2.5 md:!px-3 !py-1 sm:!py-1.5 !rounded"
                  sx={{
                    minWidth: { xs: '100px', sm: '120px', md: '140px' },
                  }}
                >
                  <span className="truncate block">
                    {selectedSortVAl}
                  </span>
                </Button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                  PaperProps={{
                    sx: {
                      maxHeight: '300px',
                      width: { xs: '180px', sm: '200px' },
                    },
                  }}
                >
                  <MenuItem
                    onClick={()=> handleSortBy('name',"asc", productData ,'Name, A to Z')}
                    className="!bg-white !text-[12px] md:!text-[13px] !text-[#000] capitalize"
                  >
                    Name, A to Z
                  </MenuItem>
                  <MenuItem
                    onClick={()=> handleSortBy('name',"desc", productData ,'Name, Z to A')}
                    className="!bg-white !text-[12px] md:!text-[13px] !text-[#000] capitalize"
                  >
                    Name, Z to A
                  </MenuItem>
                  <MenuItem
                     onClick={()=> handleSortBy('price',"asc", productData ,'Price, Low to High')}
                    className="!bg-white !text-[12px] md:!text-[13px] !text-[#000] capitalize"
                  >
                    Price, Low to High
                  </MenuItem>
                  <MenuItem
                    onClick={()=> handleSortBy('price',"desc", productData ,'Price High to Low ')}
                    className="!bg-white !text-[12px] md:!text-[13px] !text-[#000] capitalize"
                  >
                    Price, hight to low
                  </MenuItem>
                </Menu>
              </div>
            </div>

           <div
              className={`grid ${
                itemView === "grid"
                  ? `grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
                  : `grid-cols-1`
              } gap-2 sm:gap-3 md:gap-4`}
            >
              {itemView === "grid" ? (
                <>
                {
                  isloading=== true ? <ProductLoadingGrid view={itemView}/>
                  :
                  productData?.products?.length !== 0 && productData?.products?.map((item,index)=>{
                    return(
                      <ProductItem key={index}  item={item} />
                    )
                  })
                }
                </>
              ) : (
                <>
                     {
                  isloading=== true ? <ProductLoadingGrid view={itemView}/>
                  :
                  productData?.products?.length !== 0 && productData?.products?.map((item,index)=>{
                    return(
                      <ProductItemListView key={index}  item={item} />
                    )
                  })
                }
                </>
              )}
            </div>

                   {
                      totalPages > 1 && 
                      <div className="flex items-center justify-center mt-6 md:mt-10 overflow-x-auto pb-2"> 
              <Pagination  
                showFirstButton 
                showLastButton 
                count={totalPages}
                page={page}
                onChange={(e,value)=>setPage(value)}
                size="small"
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    minWidth: { xs: '32px', sm: '40px' },
                    height: { xs: '32px', sm: '40px' },
                  }
                }}
              />
            </div>
                    }

            
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductListing;



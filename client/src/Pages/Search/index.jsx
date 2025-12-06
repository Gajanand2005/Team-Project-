import React, { useState, useContext, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../../Components/ProductItem/Index.jsx";
import ProductItemListView from "../../Components/ProductItemListView/Index.jsx";
import Button from "@mui/material/Button";
import { BsUiRadiosGrid } from "react-icons/bs";
import { RiMenuSearchLine } from "react-icons/ri";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Sidebar from "../../Components/Sidebar/index.jsx";
import ProductLoadingGrid from "../../Components/ProductLoading/ProductLoadingGrid.jsx";
import { postData } from "../../Utlis/Api.js";
import { MyContext } from "../../App";
import { useLocation } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const SearchPage = () => {
  const [itemView, setIsItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [productData, setProductData] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSortVAl,setSelectedSortVal] = useState("Name, A to Z");

  const context = useContext(MyContext);
  const location = useLocation();

  // Load search results when page loads or query changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("q");

    if (searchQuery) {
      setIsLoading(true);
      const obj = {
        page: page,
        limit: 30,
        query: searchQuery
      };
      
      postData(`/api/product/search/get`, obj).then((res) => {
        setProductData(res);
        setTotalPages(res?.totalPages || 1);
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
      });
    } else if (context?.searchData && context?.searchData?.products?.length > 0) {
      // Use context search data if available
      setProductData(context?.searchData);
      setTotalPages(context?.searchData?.totalPages || 1);
    }
  }, [location.search, page]);





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
    <section className="py-5 pb-0">
      <div className="container">
        <Breadcrumbs aria-label="breadcrumb">
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
      <div className="bg-white p-2 mt-4">
        <div className="container flex flex-col lg:flex-row gap-3">
          <div className="sidebarWrapper w-full lg:w-[20%]  bg-white ">
            <Sidebar  
            productData={productData}
             setProductData={setProductData} 
            isloading={isloading} 
            setIsLoading={setIsLoading}
            page={page}
            setTotalPages={setTotalPages}
            />
          </div>

          <div className="rightContent w-full lg:w-[80%] py-2 ">
            <div className="bg-[#f1f1f1] p-2 w-full  mb-4 rounded-md flex items-center justify-between sticky top-[130px] z-[99]">
              <div className="col1 flex items-center itemViewAction ">
                <Button
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${
                    itemView == "list" && "active "
                  }`}
                  onClick={() => setIsItemView("list")}
                >
                  <RiMenuSearchLine className="text-[rgba(0,0,0,0.7)]" />
                </Button>
                <Button
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${
                    itemView == "grid" && "active "
                  }`}
                  onClick={() => setIsItemView("grid")}
                >
                  <BsUiRadiosGrid className="text-[rgba(0,0,0,0.7)]" />
                </Button>

                <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7 )]">
                    There are {productData?.products?.length !== 0 ? productData?.products?.length : 0} Products
                </span>
              </div>

              <div className="col2 ml-auto flex items-center justify-end gap-3 pr-4">
                <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7 )]">
                  Sort By
                </span>

                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-white !text-[12px] !text-[#000] capitalize !border-1 !border-[#000]"
                >
                  {selectedSortVAl}
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
                >
                  {/* <MenuItem
                    onClick={handleClose}
                    className="!bg-white !text-[13px] !text-[#000] capitalize"
                  >
                    Sales, highest to lowest
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="!bg-white !text-[13px] !text-[#000] capitalize"
                  >
                    Relevance
                  </MenuItem> */}
                  <MenuItem
                    onClick={()=> handleSortBy('name',"asc", productData ,'Name, A to Z')}
                    className="!bg-white !text-[13px] !text-[#000] capitalize"
                  >
                    Name, A to Z
                  </MenuItem>
                  <MenuItem
                    onClick={()=> handleSortBy('name',"desc", productData ,'Name, Z to A')}
                    className="!bg-white !text-[13px] !text-[#000] capitalize"
                  >
                    Name, Z to A
                  </MenuItem>
                  <MenuItem
                     onClick={()=> handleSortBy('price',"asc", productData ,'Price, Low to High')}
                    className="!bg-white !text-[13px] !text-[#000] capitalize"
                  >
                    Price, Low to High
                  </MenuItem>
                  <MenuItem
                    onClick={()=> handleSortBy('price',"desc", productData ,'Price High to Low ')}
                    className="!bg-white !text-[13px] !text-[#000] capitalize"
                  >
                    Price, hight to low
                  </MenuItem>
                </Menu>
              </div>
            </div>

           <div
              className={`grid ${
                itemView === "grid"
                  ? ` grid-cols-4 md:grid-cols-4`
                  : `grid-cols-1 md:grid-cols-1 `
              } gap-4`}
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
                      <div className="flex items-center justify-center !mt-10"> 
              <Pagination  showFirstButton showLastButton 
              count={totalPages}
              onClick={(e,value)=>setPage(value)}
              />
            </div>
                    }

            
          </div>
        </div>
      </div>
    </section>
  );
};
export default SearchPage;

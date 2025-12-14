import React, { useState, useContext, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../../Components/ProductItem/index.jsx";
import ProductItemListView from "../../Components/ProductItemListView/index.jsx";
import Button from "@mui/material/Button";
import { BsUiRadiosGrid } from "react-icons/bs";
import { RiMenuSearchLine } from "react-icons/ri";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Sidebar from "../../Components/Sidebar/index.jsx";
import ProductLoadingGrid from "../../Components/ProductLoading/ProductLoadingGrid.jsx";
import { postData } from "../../Utils/Api.js";
import { MyContext } from "../../App";
import { useLocation } from "react-router-dom";
import Search from "../../Components/Search/index.jsx";
 // <-- IMPORTANT (Search Bar)

const SearchPage = () => {
  const [itemView, setIsItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [productData, setProductData] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSortVAl, setSelectedSortVal] = useState("Name, A to Z");

  const context = useContext(MyContext);
  const location = useLocation();

  // Load search results
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("q");

    if (searchQuery) {
      setIsLoading(true);
      const obj = {
        page: page,
        limit: 30,
        query: searchQuery,
      };

      postData(`/api/product/search/get`, obj)
        .then((res) => {
          setProductData(res);
          setTotalPages(res?.totalPages || 1);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    } else if (context?.searchData?.products?.length > 0) {
      setProductData(context.searchData);
      setTotalPages(context.searchData.totalPages || 1);
    }
  }, [location.search, page]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSortBy = (name, order, products, value) => {
    setSelectedSortVal(value);

    postData(`/api/product/sortBy`, {
      products: products,
      sortBy: name,
      order: order,
    }).then((res) => {
      setProductData(res);
      setAnchorEl(null);
    });
  };

  return (
    <section className="py-5 pb-0">

      {/* ✅ MOBILE SEARCH BAR (FIXED TOP) */}
      <div className="lg:hidden px-3 mb-3 sticky top-[70px] z-[999] bg-white py-2 shadow-sm">
        <Search />
      </div>

      <div className="container hidden lg:block">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/" className="link transition">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/" className="link transition">
            Fashion
          </Link>
        </Breadcrumbs>
      </div>

      <div className="bg-white p-2 mt-4">
        <div className="container flex flex-col lg:flex-row gap-3">

          {/* ✅ SIDEBAR - HIDE ON MOBILE */}
          <div className="sidebarWrapper hidden lg:block w-full lg:w-[20%] bg-white">
            <Sidebar
              productData={productData}
              setProductData={setProductData}
              isloading={isloading}
              setIsLoading={setIsLoading}
              page={page}
              setTotalPages={setTotalPages}
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="rightContent w-full lg:w-[80%] py-2">

            {/* SORT + VIEW TOOLS */}
<div className="flex items-center gap-3">
                <span className="text-[14px] font-medium text-gray-700">
                  Sort By
                </span>

                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-white !text-[12px] !text-[#000] !font-semibold capitalize !border !border-[#000] !px-3 !py-1 !rounded-md"
                  sx={{
                    minWidth: { xs: "120px", sm: "140px", md: "160px" },
                  }}
                >
                  <span className="truncate">{selectedSortVAl}</span>
                </Button>

                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem onClick={() => handleSortBy("name", "asc", productData, "Name, A to Z")}>
                    Name, A to Z
                  </MenuItem>
                  <MenuItem onClick={() => handleSortBy("name", "desc", productData, "Name, Z to A")}>
                    Name, Z to A
                  </MenuItem>
                  <MenuItem onClick={() => handleSortBy("price", "asc", productData, "Price, Low to High")}>
                    Price, Low to High
                  </MenuItem>
                  <MenuItem onClick={() => handleSortBy("price", "desc", productData, "Price, High to Low")}>
                    Price, High to Low
                  </MenuItem>
                </Menu>
              </div>

            {/* PRODUCTS GRID */}
            <div
              className={`grid ${
                itemView === "grid"
                  ? `grid-cols-2 sm:grid-cols-3 md:grid-cols-4`
                  : `grid-cols-1`
              } gap-4`}
            >
              {isloading ? (
                <ProductLoadingGrid view={itemView} />
              ) : (
                productData?.products?.map((item, index) =>
                  itemView === "grid" ? (
                    <ProductItem key={index} item={item} />
                  ) : (
                    <ProductItemListView key={index} item={item} />
                  )
                )
              )}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-10">
                <Pagination
                  showFirstButton
                  showLastButton
                  count={totalPages}
                  onChange={(e, value) => setPage(value)}
                />
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default SearchPage;



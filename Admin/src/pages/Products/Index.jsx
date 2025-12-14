import { Button } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TooltipMUI from "@mui/material/Tooltip";
import { PiExportBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import Checkbox from "@mui/material/Checkbox";
import ProgressBar from "../../Components/ProgressBar";
import SearchBox from "../../Components/SearchBox/Index";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { deleteData, fetchDataFromApi, deleteWithData } from "../../../Utils/Api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import CircularProgress from '@mui/material/CircularProgress';

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "product", label: "Product Name", minWidth: 80 },
  { id: "category", label: "Category", minWidth: 100 },
  { id: "subCategory", label: "Sub Category", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 80 },
  { id: "sales", label: "Sales", minWidth: 120 },
  { id: "action", label: "Action", minWidth: 100 },
];

function createData(product, index, deleteProduct, context) {
  const salesPercent = 50; // Default sales percent; adjust if API provides this
  const sales = (
    <div className="flex items-center gap-3">
      <ProgressBar
        value={salesPercent}
        type={
          salesPercent >= 70
            ? "success"
            : salesPercent >= 40
            ? "warning"
            : "error"
        }
      />
      <span className="text-gray-700 font-medium">{salesPercent}%</span>
    </div>
  );

  const action = (
    <div className="flex items-center gap-1">
      <TooltipMUI title="Edit Product" placement="top">
        <Button
          className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]"
          onClick={() =>
            context.setIsOpenFullScreenPanel({
              open: true,
              model: "Edit Product",
              id: product?._id,
            })
          }
        >
          <FaEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
        </Button>
      </TooltipMUI>
      <TooltipMUI title="View Product Details" placement="top">
        <Link to={`/product/${product?._id}`}>
          <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]">
            <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[24px]" />
          </Button>
        </Link>
      </TooltipMUI>

      <TooltipMUI title="Remove Product" placement="top">
        <Button
          className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]"
          onClick={() => deleteProduct(product?._id)}
        >
          <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[25px]" />
        </Button>
      </TooltipMUI>
    </div>
  );

  const priceColumn = (
    <div className="flex flex-col gap-1">
      <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
        ₹{product.oldPrice}
      </span>
      <span className="price text-blue-600 text-[14px] font-[600]">
        ₹{product.price}
      </span>
    </div>
  );

  const productName = (
    <div className="flex items-center gap-4 w-[220px]">
      <Link to={`/product/${product._id}`}>
        <div className="img w-[55px] h-[55px] rounded-md overflow-hidden group">
          <LazyLoadImage
            alt={"image"}
            effect="blur"
            wrapperProps={{
              style: { transitionDelay: "1s" },
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-all"
            src={product.images && product.images[0]}
          />
        </div>
      </Link>
      <div className="info w-[75%] text-[#696969]">
        <h3 className="font-[600] text-[12px] leading-4 hover:text-blue-600">
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </h3>
        <span className="text-[11px]">{product.catName}</span>
      </div>
    </div>
  );

  return {
    id: index + 1,
    product: productName,
    category: product.catName,
    subCategory: product.subCat,
    price: priceColumn,
    sales,
    action,
  };
}

const orderColumns = [
  { id: "orderId", label: "Order ID", minWidth: 100 },
  { id: "paymentId", label: "Payment ID", minWidth: 150 },
  { id: "name", label: "Name", minWidth: 150 },
  { id: "amount", label: "Amount", minWidth: 80 },
  { id: "ph_no", label: "Phone Number", minWidth: 120 },
  { id: "address", label: "Address", minWidth: 150 },
  { id: "date", label: "Ordered date", minWidth: 150 },
];

const Product = () => {
  const context = useContext(MyContext);
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLavelCat, setProductThirdLavelCat] = useState("");
  const [sortedIds, setSortedIds] = useState([]);
  const [isLoading, setIsLoading]= useState(false);

  const handleChangeProductCat = (event) => {
    setIsLoading(true)
    setProductCat(event.target.value);
      setProductSubCat('');
      setProductThirdLavelCat('');
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${event.target.value}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsLoading(false)
        }, 500);
      }
    });
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    setProductCat('');
      setProductThirdLavelCat('');
    setIsLoading(true)
    fetchDataFromApi(
      `/api/product/getAllProductsBySubCatId/${event.target.value}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
         setTimeout(() => {
          setIsLoading(false)
        }, 500);
      
      }
    });
  };

  const handleChangeProductThirdLavelCat = (event) => {
    setProductThirdLavelCat(event.target.value);
    setProductCat('');
      setProductSubCat('');
      
    setIsLoading(true)
    fetchDataFromApi(
      `/api/product/getAllProductsByThirdLavelCatId/${event.target.value}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
         setTimeout(() => {
          setIsLoading(false)
        }, 500);
      
      }
    });
  };

  const getProducts = async () => {
    setIsLoading(true)
    fetchDataFromApi("/api/product/getAllProducts?perPage=10000").then((res) => {
      let productArr = [];
      if (res?.error === false) {
        for (let i = 0; i < res?.products?.length; i++) {
          productArr[i] = res?.products[i];
          productArr[i].checked = false;
        }
       setTimeout(() =>{
         setProductData(productArr);
         setIsLoading(false)
       },500)
      }
    });
  };

  const deleteProduct = (id) => {
    deleteData(`/api/product/${id}`).then((res) => {
      getProducts();
      context.alertBox("success", "Product Delete");
    });
  };


  const deleteMultipleProduct = () =>{
    if(sortedIds.length === 0){
      context.alertBox('error', 'Please select items to delete');
      return;
    }

    try {
      deleteWithData(`/api/product/deleteMultiple`, {ids: sortedIds}).then((res)=>{
        getProducts();
        context.alertBox("success","Product Deleted");
      })
    } catch (error) {
      context.alertBox('error',"error deleting items.");
    }
  }

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel]);

  useEffect(() => {
    setRows(productData.map(() => ({ isSelected: false })));
  }, [productData]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
   
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCheckboxChange = (e, id, index) => {
    const updatedItems = productData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item
    );
    setProductData(updatedItems);

    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const updatedItems = productData?.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setProductData(updatedItems);

    if (isChecked) {
      const ids = updatedItems?.map((item) => item._id).sort((a, b) => a - b);
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }

    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const updatedRows = rows?.map((row, index) => {
      if (index >= start && index < end) return { ...row, isSelected: isChecked };
      return row;
    });
    setRows(updatedRows);
  };

  const allPageRowsSelected = rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .every((row) => row.isSelected);

  return (
    <>
      <div className="card my-5 shadow-md sm:rounded-lg bg-white">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Products</h2>
          <div className="col w-[35%] ml-auto flex items-center justify-end gap-3">
            {
              sortedIds?.length !==0 && <Button className="btn-sm" size="small" color="error" onClick={deleteMultipleProduct}>Delete</Button>
            }
            <TooltipMUI title="Export" placement="top">
              <Button className="!w-[35px] !h-[35px] btn btn-sm flex items-center !rounded-full !text-black !hover:bg-black-300 hover:scale-105">
                <PiExportBold />
              </Button>
            </TooltipMUI>
            <TooltipMUI title="Add Product" placement="top">
              <Button
                className="!w-[35px] !h-[35px] btn btn-sm flex items-center !rounded-full !text-black hover:bg-black-300 hover:scale-105"
                onClick={() =>
                  context.setIsOpenFullScreenPanel({
                    open: true,
                    model: "Add Product",
                  })
                }
              >
                <span className="text-[18px]">
                  <FaPlus />
                </span>
              </Button>
            </TooltipMUI>
          </div>
        </div>

        <div className="grid gird-col-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 w-full px-5 justify-between  gap-4">
          <div className="col ">
            <h4 className="font-[600] text-[13px] pl-3"> Category by </h4>

            {context?.catData?.length !== 0 && (
              <Select
                style={{ zoom: "80%" }}
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-[#fafafa]"
                size="small"
                value={productCat}
                label="Category"
                onChange={handleChangeProductCat}
              >
                {context?.catData?.map((cat, index) => {
                  return <MenuItem value={cat?._id}>{cat?.name}</MenuItem>;
                })}
              </Select>
            )}
          </div>

          <div className="col ">
            <h4 className="font-[600] text-[13px] pl-3">Sub Category by </h4>
            {context?.catData?.length !== 0 && (
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-[#fafafa]"
                size="small"
                value={productSubCat}
                label="Category"
                onChange={handleChangeProductSubCat}
              >
                {context?.catData?.map(
                  (cat, index) =>
                    cat?.children && cat?.children.length !== 0 &&
                    cat?.children?.map((subCat, subIndex) => (
                      <MenuItem key={subCat._id} value={subCat._id}>
                        {subCat.name}
                      </MenuItem>
                    ))
                )}
              </Select>
            )}
          </div>

          <div className="col ">
            <h4 className="font-[600] text-[13px] pl-3">
              ThirdLevel Category{" "}
            </h4>
            {productSubCat && context?.catData?.length !== 0 && (
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-[#fafafa]"
                size="small"
                value={productThirdLavelCat}
                label="Category"
                onChange={handleChangeProductThirdLavelCat}
              >
                {context?.catData?.map((cat) =>
                  cat?.children?.map((subCat) => {
                    if (subCat?._id === productSubCat && subCat?.children?.length > 0) {
                      return subCat?.children?.map((thirdLavelCat) => (
                        <MenuItem key={thirdLavelCat._id} value={thirdLavelCat._id}>
                          {thirdLavelCat.name}
                        </MenuItem>
                      ));
                    }
                    return null;
                  })
                )}
              </Select>
            )}
          </div>

          <div className="col w-full ml-auto flex items-center">
            <div style={{alignSelf:'end'}} className="w-full">
              <SearchBox 
              // searchQuery={searchQuery}
              // setSearchQuery={setSearchQuery}
              // setPageOrder={setPageOrder}
              />
            </div>
            
          </div>
        </div>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" sx={{ pl: 2 }}>
                    <Checkbox
                      checked={
                        productData?.length > 0
                          ? productData.every((item) => item.checked)
                          : false
                      }
                      onChange={handleSelectAll}
                      color="primary"
                    />
                  </TableCell>
                  {columns?.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sx={{ fontWeight: "bold" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {
                 isLoading ===false ? productData?.length !==0 && productData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((product, index) => {
                      const row = createData(
                        product,
                        page * rowsPerPage + index,
                        deleteProduct,
                        context
                      );
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          <TableCell padding="checkbox" sx={{ pl: 2 }}>
                            <Checkbox
                              checked={product.checked === true ? true : false}
                              onChange={(e) =>
                                handleCheckboxChange(e, product._id, index)
                              }
                            />
                          </TableCell>
                          {columns?.map((column) => (
                            <TableCell key={column.id} align={column.align}>
                              {row[column.id]}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })
                   
                    : 
                     <>
                     <TableRow>
                      <TableCell colSpan={8}>
                        <div className="flex items-center justify-center w-full min-h-[400px]"><CircularProgress color="inherit" /></div>
                      </TableCell>
                     </TableRow>
                     </>
                    
                  }
                    
               
               
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={productData?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};

export default Product;



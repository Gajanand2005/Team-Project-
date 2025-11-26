import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import DashboardBoxes from "../../Components/DashboardBoxes";
import dashboard from "../../assets/dashboard.webp";
import ProgressBar from "../../Components/ProgressBar";
import { FaEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import TooltipMUI from "@mui/material/Tooltip";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { PiExportBold } from "react-icons/pi";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import Badge from "../../Components/Badge/Index.jsx";
import { MyContext } from "../../App.jsx";
import SearchBox from "../../Components/SearchBox/Index";
import CircularProgress from '@mui/material/CircularProgress';

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { deleteData, deleteWithData, fetchDataFromApi } from "../../Utlis/Api.js";


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
  const sales = (
    <div className="flex items-center gap-3">
      <ProgressBar
        value={product.salesPercent || 0}
        type={
          (product.salesPercent || 0) >= 70
            ? "success"
            : (product.salesPercent || 0) >= 40
            ? "warning"
            : "error"
        }
      />
      <span className="text-gray-700 font-medium">{product.salesPercent || 0}%</span>
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
              data: product,
            })
          }
        >
          <FaEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
        </Button>
      </TooltipMUI>
      <TooltipMUI title="View Product Details" placement="top">
        <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]">
          <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[24px]" />
        </Button>
      </TooltipMUI>
      <TooltipMUI title="Remove Product" placement="top">
        <Button
          className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]"
          onClick={() => deleteProduct(product._id)}
        >
          <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[25px]" />
        </Button>
      </TooltipMUI>
    </div>
  );

  const priceColumn = (
    <div className="flex flex-col gap-1">
      <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
        ₹{product.oldPrice || product.price}
      </span>
      <span className="price text-blue-600 text-[14px] font-[600]">
        ₹{product.price}
      </span>
    </div>
  );

  const productName = (
    <div className="flex items-center gap-4 w-[220px]">
      <Link to={`/products/${product._id}`}>
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

const Dashboard = () => {
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const [sortedIds, setSortedIds] = useState([]);
  const context = useContext(MyContext);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLavelCat, setProductThirdLavelCat] = useState("");
   const [orders, setOrders] = useState([]);
   const [pageOrder, setPageOrder] = useState(1); 
   const [searchQuery, setSearchQuery] = useState("");
   const [totalOrdersData, setTotalOrdersData] = useState([]);
   const [ordersData, setOrdersData] = useState([]);

   const [users, setUsers] = useState([]);
   const [allReviews, setAllReviews] = useState([]);
   const [ordersCount, setOrdersCount] = useState(null);
   const [chartData, setChartData] = useState([]);
   const [year, setYear] = useState(new Date().getFullYear());


  const handleChangeProductCat = (event) => {
    setIsLoading(true);
    setProductCat(event.target.value);
    setProductSubCat("");
    setProductThirdLavelCat("");
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${event.target.value}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    });
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    setProductCat("");
    setProductThirdLavelCat("");
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsBySubCatId/${event.target.value}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsLoading(false);
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

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };
 

  useEffect(() => {
    fetchDataFromApi(`/api/order/order-list?page=${pageOrder}&limit=5`).then((res) => {
      if(res?.error===false){
        setOrdersData(res)
        // setOrdersData(res?.data)
      }
    })

    fetchDataFromApi(`/api/order/order-list`).then((res) => {
      if(res?.error === false) {
        setTotalOrdersData(res)
      }
    })
    fetchDataFromApi(`/api/order/count`).then((res) => {
      if(res?.error === false) {
        setOrdersCount(res?.count)
      }
    })

  },[pageOrder])


  useEffect(() => {
    // Filter order based on search Query
    if(searchQuery !== "" ) {
      const filteredOrders = totalOrdersData?.data?.filter((order) => 
      order._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.userId?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.userId?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.createdAt.includes(searchQuery)
      );
      setOrdersData(filteredOrders)
    } else {
      fetchDataFromApi(`/api/order/order-list?page=${pageOrder}&limit=5`).then((res) => {
        if(res?.error === false) {
            setOrdersData(res)
            setOrdersData(res?.data)
        }
      })
    }
  }, [searchQuery])


  useEffect(() => {
    getTotalSalesByYear();

    fetchDataFromApi('/api/user/getAllUsers').then((res) =>{
      if(res?.error === false) {
        setUsers(res?.users)
      }
    })

    fetchDataFromApi("/api/user/getAllReviews").then((res) =>{
      if(res?.error === false) {
        setAllReviews(res?.reviews)
      }
    })
  }, []);

  const getTotalUsersByYear = () => {
    fetchDataFromApi(`/api/order/users`).then((res) => {
      const users = [];
      res?.TotalUsers?.length !== 0 &&
      res?.TotalUsers?.map((item) => {
        users.push({
          name: item?.name,
          TotalUsers: parseInt(item?.TotalUsers),
        });
      });

      const uniqueArr = user.filter(
        (obj, index, self) => 
          index === self.findIndex((t) => t.name === obj.name)
      );
      setChartData(uniqueArr);
    })
  }

  const getTotalSalesByYear = () => {
    fetchDataFromApi(`/api/order/sales`).then((res) => {
      const sales = [];
      res?.monthlySales?.length !== 0 &&
      res?.monthlySales?.map((item) => {
        sales.push({
          name: item?.name,
          TotalSales: parseInt(item?.TotalSales),
        });
      });

      const uniqueArr = sales.filter(
        (obj, index, self) => 
          index === self.findIndex((t) => t.name === obj.name)
      );
      setChartData(uniqueArr);
    });
  }

  const handleChangeYear = (event) => {
    getTotalSalesByYear(event.target.value)
    setYear(event.target.value);
  };



  const [page, setPage] = React.useState(0);

  const [chart1Data, setChart1Data] = useState([
    {
      name: "Jan",
      Total_Users: 4000,
      Total_Sales: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      Total_Users: 3000,
      Total_Sales: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      Total_Users: 2000,
      Total_Sales: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      Total_Users: 2780,
      Total_Sales: 3908,
      amt: 2000,
    },
    {
      name: "May",
      Total_Users: 1890,
      Total_Sales: 4800,
      amt: 2181,
    },
    {
      name: "Jun",
      Total_Users: 2390,
      Total_Sales: 3800,
      amt: 2500,
    },
    {
      name: "Jul",
      Total_Users: 7490,
      Total_Sales: 4300,
      amt: 2100,
    },
    {
      name: "Aug",
      Total_Users: 4490,
      Total_Sales: 8300,
      amt: 2100,
    },
    {
      name: "Sep",
      Total_Users: 3490,
      Total_Sales: 6300,
      amt: 2100,
    },
    {
      name: "Oct",
      Total_Users: 5090,
      Total_Sales: 3300,
      amt: 2100,
    },
    {
      name: "Nov",
      Total_Users: 0,
      Total_Sales: 0,
      amt: 0,
    },
    {
      name: "Dec",
      Total_Users: 0,
      Total_Sales: 0,
      amt: 0,
    },
  ]);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getProducts = async () => {
    setIsLoading(true)
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
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
    if(sortedIds?.length === 0){
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

  const handleCheckboxChange = (e, id, index) => {
    if (!Array.isArray(productData) || !id) return;

    const updatedItems = productData.map((item) =>
      item && item._id === id ? { ...item, checked: !item.checked } : item
    );
    setProductData(updatedItems);

    const selectedIds = updatedItems
      .filter((item) => item && item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    if (!Array.isArray(productData)) return;

    const updatedItems = productData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setProductData(updatedItems);

    if (isChecked) {
      const ids = updatedItems
        .filter(item => item && item._id)
        .map((item) => item._id)
        .sort((a, b) => a - b);
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };

  const [orderRows, setOrderRows] = React.useState([
    {
      orderId: "67514d9914da0b327345f1e6",
      paymentId: "pay_xxxxxxxxxxxx",
      name: "John Doe",
      amount: 498,
      ph_no: "9876543210",
      address: "123, Elm Street, Springfield",
      date: "2025-10-28",
      products: "Product 1, Product 2",
      status: "Pending",
      deliveryDate: "2025-11-01",
      modified: "2025-10-28",
    },
    {
      orderId: "67514d9914da0b327345f1e7",
      paymentId: "pay_xxxxxxxxxxxx",
      name: "Jane Smith",
      amount: 799,
      ph_no: "9876543211",
      address: "456, Oak Street, Springfield",
      date: "2025-10-27",
      products: "Product 3, Product 4",
      status: "Pending",
      deliveryDate: "2025-11-02",
      modified: "2025-10-27",
    },
  ]);

  const [categoryFilterValue, setcategoryFilterValue] = React.useState("");

  const handleChangecatFilter = (event) => {
    setcategoryFilterValue(event.target.value);
  };

  return (
    <Das>
      <div className="w-full py-2 px-5 border border-[rgba(0,0,0,0.1)] rounded-md bg-white flex items-center justify-between mb-6 gap-8">
        <div className="info">
          <h1 className="text-[30px] font-[600] leading-18">
            Good Morning, <br />
            S-Mal Couture <span>👋</span>
          </h1>
          <p className="leading-10">
            Here's what's happening on your store today. See the statistics at
            once.
          </p>
          <Button
            className="btn-blue !capitalize mt-4 flex items-center gap-2"
            variant="contained"
          >
            <FaPlus /> Add Product
          </Button>
        </div>
        <img src={dashboard} className="w-[250px]" alt="Dashboard" />
      </div>

      {
        productData?.length !==0 && users?.length !== 0 && allReviews?.length !==0 &&
        <DashboardBoxes orders={ordersCount.length} products={productData?.length} users={users?.length}
        reviews={allReviews?.length} category={context?.catData?.length} /> 
      }
    
      

      <div className="card my-5 shadow-md sm:rounded-lg bg-white">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Products</h2>
          <div className="col w-[35%] ml-auto flex items-center justify-end gap-3">
            {sortedIds?.length !== 0 && (
              <Button
                className="btn-sm"
                size="small"
                color="error"
                onClick={deleteMultipleProduct}
              >
                Delete
              </Button>
            )}
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

        <div className="flex items-center w-full px-5 justify-between pr-5 gap-4">
          <div className="col w-[15%]">
            <h4 className="font-[600] text-[13px] pl-3"> Category by </h4>

            {context?.catData && context?.catData?.length !== 0 && (
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
                {context.catData.map((cat, index) => {
                  return <MenuItem value={cat?._id}>{cat?.name}</MenuItem>;
                })}
              </Select>
            )}
          </div>

          <div className="col w-[15%]">
            <h4 className="font-[600] text-[13px] pl-3">Sub Category by </h4>
            {context?.catData && context?.catData?.length !== 0 && (
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-[#fafafa]"
                size="small"
                value={productSubCat}
                label="Category"
                onChange={handleChangeProductSubCat}
              >
                {context.catData.map(
                  (cat, index) =>
                    cat?.children && cat?.children?.length !== 0 &&
                    cat?.children?.map((subCat, subIndex) => (
                      <MenuItem key={subCat._id} value={subCat._id}>
                        {subCat.name}
                      </MenuItem>
                    ))
                )}
              </Select>
            )}
          </div>

          <div className="col w-[15%]">
            <h4 className="font-[600] text-[13px] pl-3">
              ThirdLevel Category{" "}
            </h4>
            {context?.catData && context?.catData?.length !== 0 && (
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-[#fafafa]"
                size="small"
                value={productThirdLavelCat}
                label="Category"
                onChange={handleChangeProductThirdLavelCat}
              >
                {context.catData.map(
                  (cat, index) =>
                    cat?.children && cat?.children?.length !== 0 &&
                    cat?.children?.map(
                      (subCat, subIndex) =>
                        subCat?.children && subCat?.children?.length !== 0 &&
                        subCat?.children?.map((thirdLavelCat, index) => {
                          return (
                            <MenuItem
                              key={thirdLavelCat._id}
                              value={thirdLavelCat._id}
                            >
                              {thirdLavelCat.name}
                            </MenuItem>
                          );
                        })
                    )
                )}
              </Select>
            )}
          </div>

          <div className="col w-[25%] ml-auto">
            <SearchBox />
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
                  {columns.map((column) => (
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
                {isLoading === false && productData && productData?.length > 0 ? (
                  productData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product, index) => {
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
                        {columns.map((column) => (
                          <TableCell key={column.id} align={column.align}>
                            {row[column.id]}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <>
                    <TableRow>
                      <TableCell colSpan={8}>
                        <div className="flex items-center justify-center w-full min-h-[400px]">
                          <CircularProgress color="inherit" />
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                )}
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

      <div className="card my-5 shadow-md sm:rounded-lg bg-white">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Recent Orders</h2>
          <div className="w-[25%">
            <SearchBox
               searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setPageOrder={setPageOrder}
            />
          </div>
        </div>  

         <div className="relative overflow-x-auto !mt-5">
                        <table className="w-full text-sm text-left rtl:text-right text-black ">
                          <thead className="text-xs text-black uppercase  ">
                            <tr>
                               <th scope="col" className="px-6 py-3">
                                &nbsp;
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Order Id
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Payment Id
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Name
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Number
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Address
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               PinCode
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Total
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Email
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               User Id
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Order Status
                              </th>
                               <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Date
                              </th>
                            </tr>
                          </thead>
                          <tbody>
        
                            {
                              ordersData?.data?.length!==0 && ordersData?.data?.map((order,index)=>{
                                return(
                                  <>
                                     <tr className="bg-white border-b  dark:border-gray-700 border-gray-200 font-[600]">
                              <td className="px-6 py-4">
                                <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]' onClick={()=>isShowOrderdProduct(index)} >
                                  {
                                    isOpenOrderProduct === index ? <FaAngleUp className='text-[18px] text-[#000]' /> : <FaAngleDown className='text-[18px] text-[#000]' />
                                  }
                                 </Button>
                              </td>
                              <td className="px-6 py-4">{order?._id}</td>
                              <td className="px-6 py-4">{order?.paymentId ? order?.paymentId : 'CASH ON DELIVERY'}</td>
                              <td className="px-6 py-4">{order?.userId?.name}</td>
                              <td className="px-6 py-4">{order?.userId?.mobile}</td>
                              <td className="px-6 py-4 "><span className='block w-[300px]'>
                                {order?.delivery_address?.
                                address_line1 + " " + 
                                order?.delivery_address?.city+ " " + 
                                order?.delivery_address?.state + " " +
                                order?.delivery_address?.country + ' ' + order?.delivery_address?.mobile
                                }
                                </span> 
                                </td>
                              <td className="px-6 py-4">{order?.delivery_address?.pincode}</td>
                              <td className="px-6 py-4">{order?.totalAmt}</td>
                              <td className="px-6 py-4">{order?.userId?.email}</td>
                              <td className="px-6 py-4">{order?.userId?._id}</td>
                              <td className="px-6 py-4"><Badge status={order?.order_status} /></td>
                              <td className="px-6 py-4 whitespace-nowrap">{order?.createdAt?.split("T")[0]}</td>
                            </tr>
                            {
                              isOpenOrderProduct=== index && (
                                <tr>
                              <td className='bg-[#f1f1f1] pl-20' colSpan={6}>
                                <div className='relative overflow-x-auto'>
                                <table className="w-full text-sm text-left rtl:text-right text-black ">
        
                          
                           <thead className="text-xs text-black uppercase  ">
                            <tr>
                             
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Product Id
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Product Title 
                               </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Image
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Qty
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Price
                              </th>
                             
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Sub total 
                              </th>
                             </tr>
                             
                          </thead>
                          <tbody>
                            {
                               order?.products?.map((item,index)=>{
                                return(
                                  <tr className="bg-white border-b  dark:border-gray-700 border-gray-200 font-[600]">
                              
                              <td className="px-6 py-4">{item?._id}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="w-[200px">
                                {item?.productTitle}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <img src={item?.image} alt="" className='w-[40px] h-[40px] object-cover rounded-md'/>
                              </td>
                              <td className="px-6 py-4">{item?.quantity}</td>
                              <td className="px-6 py-4 ">{item?.price?.toLocaleString('en-Us', {style:'currency', currency: 'INR'})} </td>
                              <td className="px-6 py-4">{(item?.price * item?.quantity)?.toLocaleString('en-Us', {style:'currency', currency: 'INR'})}</td>
                             
                            </tr>
                                )
                               })
                            }
        
                            <tr>
                              <td className='bg-[#f1f1f1]' colSpan={6}>
                                
                              </td>
                            </tr>
                            
                          </tbody>
                        </table>
                        </div>
                              </td>
                            </tr>
                              )}
                                  </>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                        
                        {/* <table className="w-full text-sm text-left rtl:text-right text-black ">
                          <thead className="text-xs text-black uppercase  ">
                            <tr>
                               <th scope="col" className="px-6 py-3">
                                &nbsp;
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Order Id
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Payment Id
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Name
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Number
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Address
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               PinCode
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Total
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Email
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               User Id
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Order Status
                              </th>
                               <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Date
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b  dark:border-gray-700 border-gray-200 font-[600]">
                              <td className="px-6 py-4">
                                <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]' onClick={()=>isShowOrderdProduct(1)} >
                                  {
                                    isOpenOrderProduct === 1 ? <FaAngleUp className='text-[18px] text-[#000]' /> : <FaAngleDown className='text-[18px] text-[#000]' />
                                  }
                                 </Button>
                              </td>
                              <td className="px-6 py-4">123456</td>
                              <td className="px-6 py-4">4564tyut56</td>
                              <td className="px-6 py-4">Gagan</td>
                              <td className="px-6 py-4">4564564564</td>
                              <td className="px-6 py-4 "><span className='block w-[300px]'>MOnn H.NO 29 outside the earth</span> </td>
                              <td className="px-6 py-4">12345</td>
                              <td className="px-6 py-4">1200</td>
                              <td className="px-6 py-4">Gagan@gmail.com</td>
                              <td className="px-6 py-4">12345646</td>
                              <td className="px-6 py-4"><Badge status="delivered" /></td>
                              <td className="px-6 py-4 whitespace-nowrap">12-2-2025</td>
                            </tr>
                            {
                              isOpenOrderProduct=== 1 && (
                                <tr>
                              <td className='bg-[#f1f1f1] pl-20' colSpan={6}>
                                <div className='relative overflow-x-auto'>
                                <table className="w-full text-sm text-left rtl:text-right text-black ">
                          <thead className="text-xs text-black uppercase  ">
                            <tr>
                             
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Product Id
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Product Title 
                               </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Image
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Qty
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Price
                              </th>
                             
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Sub total 
                              </th>
                             </tr>
                             
                          </thead>
                          <tbody>
        
                            <tr>
                              <td className='bg-[#f1f1f1]' colSpan={6}>
                                
                              </td>
                            </tr>
                            
                          </tbody>
                           <thead className="text-xs text-black uppercase  ">
                            <tr>
                             
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Product Id
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Product Title 
                               </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Image
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Qty
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Price
                              </th>
                             
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                               Sub total 
                              </th>
                             </tr>
                             
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b  dark:border-gray-700 border-gray-200 font-[600]">
                              
                              <td className="px-6 py-4">123456</td>
                              <td className="px-6 py-4 whitespace-nowrap">A -lien color Blue shari for ladiys this is cool</td>
                              <td className="px-6 py-4">
                                <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/90-home_default/hummingbird-cushion.jpg" alt="" className='w-[40px] h-[40px] object-cover rounded-md'/>
                              </td>
                              <td className="px-6 py-4">2</td>
                              <td className="px-6 py-4 ">1200 </td>
                              <td className="px-6 py-4">1200</td>
                             
                            </tr>
        
                            <tr>
                              <td className='bg-[#f1f1f1]' colSpan={6}>
                                
                              </td>
                            </tr>
                            
                          </tbody>
                        </table>
                        </div>
                              </td>
                            </tr>
                              )
                            }
                          </tbody>
                        </table> */}


                        {
                          orders?.totalPages > 1 &&
                          <div className="flex items-center justify-center mt-10 pb-5">
                            <Pagination
                               showFirstButton showLastButton
                               count={orders?.totalPages}
                               page={pageOrder}
                               onChange={(e, value) => setPageOrder(value)}
                            />
                         </div>
                        } 
             </div>

      <div className="card my-5 shadow-md sm:rounded-lg bg-white">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between pb-0">
          <h2 className="text-[18px] font-[600]">
            Total Users and Total Sales
          </h2>
        </div>

        <div className="px-5 py-5 pt-1 sm:px-6 flex items-center gap-5 ">
          <span className="flex items-center gap-1 text-[15px] cursor-pointer " onClick={getTotalUsersByYear}>
            <span className="block w-[8px] h-[8px] rounded-full bg-blue-600"></span>
            Total Users
          </span>

          <span className="flex items-center gap-1 text-[15px] cursor-pointer " onClick={getTotalSalesByYear}>
            <span className="block w-[8px] h-[8px] rounded-full bg-green-600"></span>
            Total Sales
          </span>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          {chart1Data?.length !== 0 &&
          <BarChart
             width={1000}
             height={500}
             data={chartData}
             margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
             }}
            >
              <XAxis
                 dataKey="name"
                 scale="point"
                 padding={{ left: 10, right: 10 }}
                 tick={{ fontSize: 12 }}  
                 label={{position: "insideBottom", fontSize: 14}}
                 style={{fill: context?.theme === "dark" ? "white" : "#000" }}
              />
              <YAxis 
                  tick={{ fontSize: 12 }}
                  label={{position: "insideBottom", fontSize: 14}}  
                  style={{fill: context?.theme === "dark" ? "white" : "#000" }}
              />
              <Tooltip
                  content={{
                    backgroundColor: "#71739",
                    color: "white",
                  }}  // Set tooltip background and text color
                  labelStyle={{ color: "yellow" }}  // Set label text color
                  itemStyle={{ color: "cyan" }}   // Set color for individual items in the tooltip
                  cursor={{ fill: "white" }}    // Customize the tooltip cursor background on hover
              />
              <Legend />
              <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  vertical={false}
              /> 
              <Bar dataKey= "TotalSales" stackId="a" fill="#16a34a" />
              <Bar dataKey="TotalUsers" stackId="b" fill="#0858f7" />

            </BarChart>
          }
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Dashboard;

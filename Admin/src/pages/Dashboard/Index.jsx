import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import { AiTwotoneGift } from "react-icons/ai";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaChartPie, FaBoxOpen } from "react-icons/fa6";
import { BsBarChartFill } from "react-icons/bs";
import { RiBarChartFill } from "react-icons/ri";
import { HiChartBar } from "react-icons/hi2";
import { PiPiggyBankDuotone } from "react-icons/pi";
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Badge from "../../Components/Badge/Index.jsx";
import { MyContext } from "../../App.jsx";
import SearchBox from "../../Components/SearchBox/Index";
import CircularProgress from '@mui/material/CircularProgress';

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { deleteData, deleteWithData, fetchDataFromApi } from "../../../Utils/Api.js";
import Product from "../Products/Index.jsx";


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
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [salesMap, setSalesMap] = useState({});
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLavelCat, setProductThirdLavelCat] = useState("");
   const [orders, setOrders] = useState([]);

  const handleChangeProductCat = (event) => {
    setIsLoading(true);
    setProductCat(event.target.value);
    setProductSubCat("");
    setProductThirdLavelCat("");
    setPage(0);
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
    setPage(0);
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
          setPage(0);

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

 

 
  
   const isShowOrderdProduct =(index)=>{
     if(isOpenOrderProduct===index){
       setIsOpenOrderProduct(null);
     }else{
       setIsOpenOrderProduct(index);
   
     }
   }
   
   useEffect(() => {
    getChartData();
     fetchDataFromApi('/api/order/order-list').then((res)=>{
       if(res?.error===false){
       setOrders(res?.data);
       }
     })
   },[])


  const [page, setPage] = React.useState(0);
 const [chartData, setChartData]=useState([]);
 const [year, setYear]=useState(new Date().getFullYear())
  
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
         setTotalProducts(res?.products?.length);
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

  const totalSales = orders.reduce((sum, order) => sum + (order.totalAmt || 0), 0);

  const boxesData = [
    {
      title: "New Orders",
      value: orders.length.toString(),
      icon1: AiTwotoneGift,
      icon2: IoStatsChartSharp,
      color: "#ff0000",
      size1: "40px",
      size2: "40px"
    },
    {
      title: "Sales",
      value: `₹${totalSales}`,
      icon1: FaChartPie,
      icon2: BsBarChartFill,
      color: "#0000ff",
      size1: "40px",
      size2: "40px"
    },
    {
      title: "Revenue",
      value: `₹${totalSales}`,
      icon1: PiPiggyBankDuotone,
      icon2: RiBarChartFill,
      color: "#00ff00",
      size1: "55px",
      size2: "40px"
    },
    {
      title: "Products",
      value: totalProducts.toString(),
      icon1: FaBoxOpen,
      icon2: HiChartBar,
      color: "#bf00ff",
      size1: "40px",
      size2: "40px"
    }
  ];

  const getChartData = (year = new Date().getFullYear()) => {
    Promise.all([
      fetchDataFromApi(`/api/order/sales?year=${year}`),
      fetchDataFromApi(`/api/order/users?year=${year}`)
    ]).then(([salesRes, usersRes]) => {
      const salesMap = {};
      if (salesRes?.monthlySales?.length !== 0) {
        salesRes.monthlySales.forEach(item => {
          salesMap[item.name] = { Total_Sales: parseInt(item.totalSales) };
        });
      }

      const data = [];
      if (usersRes?.TotalUsers?.length !== 0) {
        usersRes.TotalUsers.forEach(item => {
          const name = item.name;
          const totalUsers = parseInt(item.TotalUsers);
          if (salesMap[name]) {
            data.push({ name, Total_Sales: salesMap[name].Total_Sales, Total_Users: totalUsers });
            delete salesMap[name];
          } else {
            data.push({ name, Total_Sales: 0, Total_Users: totalUsers });
          }
        });
      }

      // Add remaining sales
      Object.keys(salesMap).forEach(name => {
        data.push({ name, Total_Sales: salesMap[name].Total_Sales, Total_Users: 0 });
      });

      setChartData(data);
    });
  }

  const handleChangeYear = (event)=>{
    setYear(event.target.value)
    getChartData(event.target.value)
  }


  return (
    <>
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
        <img src={dashboard} className="w-[250px] hidden lg:block" alt="Dashboard" />
      </div>

      <DashboardBoxes data={boxesData} />

      {/* <div className="card my-5 shadow-md sm:rounded-lg bg-white">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-[600]">Products</h2>
            <p className="!mt-0">
              There are
              <span className="font-bold text-orange-600 ">{productData?.length}</span> Products
            </p>
          </div>
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
      </div> */}

<Product/>


      <div className="card my-5 shadow-md sm:rounded-lg bg-white">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Recent Orders</h2>
        </div>
          <div className="col2 w-full">
           <div className="shadow-md rounded-md  bg-white">
              <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                <h2 className="text-[18px] font-[600]">My Order</h2>
                <p className="!mt-0">
                  There are
                  <span className="font-bold text-orange-600 ">{orders?.length}</span> Order
                </p>
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
                      orders?.length!==0 && orders?.map((order,index)=>{
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
                      <td className="px-6 py-4">{order?.paymentId ? order?.paymentId : "Cash on Delivery"}</td>
                      <td className="px-6 py-4">{order?.userId?.name}</td>
                      <td className="px-6 py-4">{order?.userId?.mobile}</td>
                      <td className="px-6 py-4 "><span className='block w-[300px]'>{order?.delivery_address?.address_line1 + " " + order?.delivery_address?.city + " " + order?.delivery_address?.landmark + " " + order?.delivery_address?.country + " " + order?.delivery_address?.state  }</span> </td>
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
                      <td className='bg-[#f1f1f1] pl-20' colSpan={7}>
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
                      order?.products?.map((item, index)=>{
                        return(
                          <>
                            <tr className="bg-white border-b  dark:border-gray-700 border-gray-200 font-[600]">
                     <td className="px-6 py-4">{item?.productId?._id || item?._id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item?.productId?.name || item?.name}</td>
                      <td className="px-6 py-4">
                        <img src={item?.productId?.images?.[0] || item?.image?.[0] || item?.image} alt="" className='w-[40px] h-[40px] object-cover rounded-md'/>
                      </td>
                      <td className="px-6 py-4">{item?.quantity}</td>
                      <td className="px-6 py-4 ">₹{item?.price} </td>
                      <td className="px-6 py-4">₹{item?.price * item?.quantity}</td>
                      
                    </tr>
                          </>
                        )
                      })
                    }
                  

                    <tr>
                      <td className='bg-[#f1f1f1]' colSpan={7}>
                        
                      </td>
                    </tr>
                    
                  </tbody>
              
                  
                </table>
                </div>
                      </td>
                    </tr>
                      )
                    }
                    
                            </>
                        )
                      })
                    } 
                  </tbody>
                </table>
             
              </div>
              </div>
            </div>
           
            
        </div>
        
      </div>

     <div className="card my-5 shadow-md sm:rounded-lg bg-white w-full">
  <div className="px-4 py-5 sm:px-6 flex items-center justify-between pb-0">
    <h2 className="text-[16px] sm:text-[18px] font-[600]">
      Total Users and Total Sales
    </h2>
  </div>

  {/* Legends */}
  <div className="px-4 py-3 sm:px-6 flex flex-wrap items-center gap-4 sm:gap-5">
    <span className="flex items-center gap-1 text-[14px] sm:text-[15px]">
      <span className="block w-[8px] h-[8px] rounded-full bg-green-600"></span>
      Total Users
    </span>

    <span className="flex items-center gap-1 text-[14px] sm:text-[15px]">
      <span className="block w-[8px] h-[8px] rounded-full bg-blue-600"></span>
      Total Sales
    </span>
  </div>

  {/* Chart Container - fully responsive heights */}
  <div className="w-full h-[250px] sm:h-[320px] md:h-[400px] px-2 sm:px-4">
    <ResponsiveContainer width="100%" height="100%">
      {chartData?.length !== 0 && (
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 0,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="none" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="Total_Sales"
            stroke="#0045d0ff"
            strokeWidth={3}
            activeDot={{ r: 7 }}
          />

          <Line
            type="monotone"
            dataKey="Total_Users"
            stroke="#00b309ff"
            strokeWidth={3}
          />
        </LineChart>
      )}
    </ResponsiveContainer>
  </div>
</div>

    </>
  );
};

export default Dashboard;



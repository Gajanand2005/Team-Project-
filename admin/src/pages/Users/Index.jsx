import { Button } from '@mui/material'
import React, { useState, useMemo, useContext, useEffect} from 'react'
import { MdOutlineAddAlarm } from "react-icons/md";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TooltipMUI from "@mui/material/Tooltip";
import { PiExportBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import Checkbox from "@mui/material/Checkbox";
import ProgressBar from "../../Components/ProgressBar";
import SearchBox from '../../Components/SearchBox/Index';
import { MyContext } from '../../App';
import { Link } from 'react-router-dom';
import { SlCalender } from "react-icons/sl";



const columns = [
  { id: "userImg", label: "USER IMAGE", minWidth: 100 },
  { id: "userName", label: "USER NAME", minWidth: 150 },
  { id: "userEmail", label: "USER EMAIL", minWidth: 150 },
  { id: "userPh", label: "USER PHONE NUMBER", minWidth: 120 },
  { id: "action", label: "CREATED", minWidth: 100 },
];

function createData(id,  userName,userEmail, userPh,  oldPrice, currentPrice, salesPercent) {
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
      <TooltipMUI title="Created" placement="top">
        <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]">
         
          <SlCalender  className="text-[rgba(0,0,0,0.7)] text-[20px]" />
        </Button>
        10-10-2023
      </TooltipMUI>

    </div>
  );

  const priceColumn = (
    <div className="flex flex-col gap-1">
      <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">{oldPrice}</span>
      <span className="price text-blue-600 text-[14px] font-[600]">{currentPrice}</span>
    </div>
  );

  const userImg = (
    <div className="flex items-center gap-4 w-[120px]">
      <Link to="/products/485789">
        <div className="img w-[55px] h-[55px] rounded-md overflow-hidden group">
          <img
            src="https://imgs.search.brave.com/XU02EQY1eIHc1fmfy8XyKpyeq5l5mLEjMKoA4412ajI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/aWNvbnNob2NrLmNv/bS9pbWFnZS9JbXBy/ZXNzaW9ucy9EYXRh/YmFzZS91c2Vy"
            className="w-full group-hover:scale-105 transition-all"
          />
        </div>
      </Link>

    </div>
  );

  return { id, userImg: userImg, userName,  price: priceColumn, sales, action, userEmail, userPh };
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

const Users = () => {
    const [isOpenOrderProduct, setIsOpenOrderProduct]= useState(null);
  
  const isShowOrderdProduct =(index)=>{
    if(isOpenOrderProduct===index){
      setIsOpenOrderProduct(null);
    }else{
      setIsOpenOrderProduct(index);
  
    }
  }

  const [openRow, setOpenRow] = React.useState(null);
  const [rows, setRows] = React.useState([
    createData(1, "Kapil", "Kunal@gmail.com", "789654123", "789654123", "₹299", "85", "2025-10-28"),

  ]);

  const [page, setPage] = React.useState(0);

  const [chart1Data, setChart1Data] = useState([
    {
      name: 'Jan',
      Total_Users: 4000,
      Total_Sales: 2400,
      amt: 2400,
    },
    {
      name: 'Feb',
      Total_Users: 3000,
      Total_Sales: 1398,
      amt: 2210,
    },
    {
      name: 'Mar',
      Total_Users: 2000,
      Total_Sales: 9800,
      amt: 2290,
    },
    {
      name: 'Apr',
      Total_Users: 2780,
      Total_Sales: 3908,
      amt: 2000,
    },
    {
      name: 'May',
      Total_Users: 1890,
      Total_Sales: 4800,
      amt: 2181,
    },
    {
      name: 'Jun',
      Total_Users: 2390,
      Total_Sales: 3800,
      amt: 2500,
    },
    {
      name: 'Jul',
      Total_Users: 7490,
      Total_Sales: 4300,
      amt: 2100,
    },
     {
      name: 'Aug',
      Total_Users: 4490,
      Total_Sales: 8300,
      amt: 2100,
    },
     {
      name: 'Sep',
      Total_Users: 3490,
      Total_Sales: 6300,
      amt: 2100,
    },
     {
      name: 'Oct',
      Total_Users: 5090,
      Total_Sales: 3300,
      amt: 2100,
    },
     {
      name: 'Nov',
      Total_Users: 0,
      Total_Sales: 0,
      amt: 0,
    },
     {
      name: 'Dec',
      Total_Users: 0,
      Total_Sales: 0,
      amt: 0,
    },
  ])

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [userData,setUserData]=useState([]);
  const [isLoading, setIsLoading]= useState(false); ///////////
  
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const updatedRows = rows.map((row, index) => {
      if (index >= start && index < end) return { ...row, isSelected: checked };
      return row;
    });
    setRows(updatedRows);
  };

  const allPageRowsSelected = rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .every((row) => row.isSelected);

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

  const [categoryFilterValue, setcategoryFilterValue] = React.useState('');

  const handleChangecatFilter = (event) => {
    setcategoryFilterValue(event.target.value);
  }


  const context =useContext(MyContext);

  useEffect(()=>{
    getUsers();
    setIsLoading(true);
    fetchDataFromApi('/api/user/getAllUsers').then((res)=>{
      setUserData(res?.users)
      setUserTotalData(res?.users)
      setIsLoading(false)
    })
  },[])

  const getUsers=()=>{
    setIsLoading(true);
    fetchDataFromApi('/api/user/getAllUsers').then((res)=>{
      setUserData(res?.users)
      setUserTotalData(res?.users)
      setIsLoading(false)

  }

  useEffect(()=>{
    // Filter orders based on search query
    if(searchQuery!==""){
      const filterdItems=userTotalData?filter((user)=>
        user._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.mobile!==null && user?.mobile?.includes(searchQuery).
      );
      setUserData(filterdItems)
    }else{
      fetchDataFromApi('/api/User/getAllUsers').then((res)=>{
        if(res?error===false){
          setUserData(res?.Users)
          setIsLoading(False)
        }

      })
    }
  },[])

  const deleteMultipleProduct = () =>{
      if(sortedIds.length === 0){
        context.alertBox('error', 'Please select items to delete');
        return;
      }
  
      try {
        deleteWithData(`/api/user/deleteMultiple`, {ids: sortedIds}).then((res)=>{
          getProducts();
          context.alertBox("success","User Deleted");
        })
      } catch (error) {
        context.alertBox('error',"error deleting items.");
      }
    }

  return (
    
    

     <div className="card my-5 shadow-md sm:rounded-lg bg-white">
       
          
          <div className="flex items-center w-full px-5 justify-between pr-5">
          <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Users List</h2>
          <div className="col w-[15%] ml-auto flex items-center gap-2">
            
          <div className="col w-[40%]" ml-auto>
            <SearchBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

          </div>

          {
            sortedIfds?.length!==0 && <Button variant="contained">
              className="btn-sm" size="small" color="error"
                  onClick={deleteMultiple} Delete </Button>
          }
          </div>
        </div>
          <br />

           <div className="col w-[40%] ml-auto">
            <SearchBox/>
           </div>
          
        </div>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" sx={{ pl: 2 }}>
                    <Checkbox checked={allPageRowsSelected} onChange={handleSelectAll} color="primary" 
                    checked={userData?.length>0?productData.every ((item)=>item.checked):false}/>
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} sx={{ fontWeight: "bold" }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
              {
                isLoading===false ? userData?.length!==0 && userData?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )?.reverse()? map((user,index)=>{
                  return(
                    <TableRow>
                      <TableCell style={{minwidth:columns.minWidth}}>
                        <Checkbox {...label} size="small"/>
                          checked===true?true:false
                          onChange={(e)=>handleCheckboxChange(e,product._id,index)}
                      </TableCell>

                       <TableCell style={{minWidth:columns.width}}>
                          {
                            user?.verify_email===false?
                            <span
                              className={'inline-block py-1 px-4 rounded-full text-[11px] captalize bg-pi-500'}
                            >
                              Not verify
                              :
                            <span
                              className={'inline-block py-1 px-4 rounded-full text-[11px] captalize bg-pi-500'}
                              verfied
                            ></span> 
                            </span>
                           
                          }
                       </TableCell>
                      <TableCell style={{minWidth:columns.width}}>
                        <div className="flex items-center gap-4 w{70px}">
                          <div class="img w=[45] h-[45px] rounded-md overflow-hidden group">
                            <Link to="/product/45745" data-discovered="true">
                            <img
                                 src={user?.avatar!=="" && user?.
                                  avatar!==undefined?user.
                                  avatar:'/user.jpg'}
                                            
                            class="w-full group-hover:scale-105 transistion-all"/>
                            </Link>

                          </div>

                        </div>

                      </TableCell>
                    </TableRow>
                    
                  )
                })
                }
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell padding="checkbox" sx={{ pl: 2 }}>
                        <Checkbox
                          checked={row.isSelected || false}
                          onChange={(e) => {
                            const updatedRows = [...rows];
                            updatedRows[page * rowsPerPage + index].isSelected = e.target.checked;
                            setRows(updatedRows);
                          }}
                          color="primary"
                        />
                      </TableCell>
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align}>
                          {row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={userData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>


    
  )
}

export default Users

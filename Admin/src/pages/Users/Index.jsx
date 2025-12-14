import { Button } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
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
import CircularProgress from '@mui/material/CircularProgress';
import { fetchDataFromApi } from '../../../Utils/Api.js';



const columns = [
  { id: "userImg", label: "USER IMAGE", minWidth: 100 },
  { id: "userName", label: "USER NAME", minWidth: 150 },
  { id: "userEmail", label: "USER EMAIL", minWidth: 150 },
  { id: "userPh", label: "USER PHONE NUMBER", minWidth: 120 },
  { id: "action", label: "CREATED", minWidth: 100 },
];

function createData(user, index) {
  const action = (
    <div className="flex items-center gap-1">
      <TooltipMUI title="Created" placement="top">
        <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]">
          <SlCalender className="text-[rgba(0,0,0,0.7)] text-[20px]" />
        </Button>
        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
      </TooltipMUI>
    </div>
  );

  const userImg = (
    <div className="flex items-center gap-4 w-[120px]">
      <Link to={`/users/${user._id}`}>
        <div className="img w-[55px] h-[55px] rounded-md overflow-hidden group">
          <img
            src={user?.avatar || user?.images?.[0] || "https://imgs.search.brave.com/XU02EQY1eIHc1fmfy8XyKpyeq5l5mLEjMKoA4412ajI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/aWNvbnNob2NrLmNv/bS9pbWFnZS9JbXBy/ZXNzaW9ucy9EYXRh/YmFzZS91c2Vy"}
            className="w-full group-hover:scale-105 transition-all"
          />
        </div>
      </Link>
    </div>
  );

  return {
    id: index + 1,
    userImg,
    userName: user?.name || 'N/A',
    userEmail: user?.email || 'N/A',
    userPh: user?.mobile || 'N/A',
    action
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

const Users = () => {
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };

  const getUsers = () => {
    setIsLoading(true);
    fetchDataFromApi("/api/user/getAllUsers").then((res) => {
      if (res?.error === false) {
        setUsers(res?.data?.map(user => ({ ...user, checked: false })) || []);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const [openRow, setOpenRow] = React.useState(null);
  const rows = users.map((user, index) => createData(user, index));

  const [page, setPage] = React.useState(0);


  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const updatedUsers = users.map((user, index) => {
      if (index >= start && index < end) return { ...user, checked };
      return user;
    });
    setUsers(updatedUsers);
  };

  const allPageRowsSelected = users
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .every((user) => user.checked);

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

  return (
    <>
    

     <div className="card my-5 shadow-md sm:rounded-lg bg-white">
       
          
        <div className="flex items-center w-full px-5 justify-between pr-5">
       <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Users</h2>
          <div className="col w-[15%] ml-auto flex items-center gap-2">
            
        
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
                    <Checkbox checked={allPageRowsSelected} onChange={handleSelectAll} color="primary" />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} sx={{ fontWeight: "bold" }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1}>
                      <div className="flex items-center justify-center w-full min-h-[400px]">
                        <CircularProgress color="inherit" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        <TableCell padding="checkbox" sx={{ pl: 2 }}>
                          <Checkbox
                            checked={users[page * rowsPerPage + index]?.checked || false}
                            onChange={(e) => {
                              const updatedUsers = [...users];
                              updatedUsers[page * rowsPerPage + index].checked = e.target.checked;
                              setUsers(updatedUsers);
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
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>


    </>
  )
}

export default Users



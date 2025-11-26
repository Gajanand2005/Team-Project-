import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import Badge from '../../Components/Badge/Index.jsx'
import PrintVoice from '../Invoice/printvoice.jsx'
import { fetchDataFromApi, editData } from "../../Utlis/Api";

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useContext } from "react";
import { MyContext } from "../../App";
import SearchBox from "../../Components/SearchBox/Index";


const Orders = () => {
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');

  const [orders, setOrders] = useState([]);
  const [pageOrder, setPageOrder] = useState(1); 
  const [searchQuery, setSearchQuery] = useState("");
  const [totalOrdersData, setTotalOrdersData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);


  const context = useContext(MyContext);


  const isShowOrderdProduct = (index) => {
    setIsOpenOrderProduct(isOpenOrderProduct === index ? null : index);
  };


  const handleChange = (event, id) => {
    setOrderStatus(event.target.value);

    const obj = {
      id: id,
      order_status: event.target.value
    }

    editData(`/api/order/order-status/${id}`, obj).then((res)=> {
      if(res?.data?.error===false){
        context.alertBox("success", res?.data?.message);
      }
      // console.log(res)
    })
  };


  // useEffect(() => {
  //   fetchDataFromApi("/api/order/order-list").then((res) => {
  //     if (res?.error === false) {
  //       setOrders(res?.data)
  //     }
  //   })
  // },[orderStatus])

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
   
   
  return (
    <>
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


    </>
  )
}

export default Orders;

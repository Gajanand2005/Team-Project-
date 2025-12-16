import { Button } from '@mui/material'
import React, { useState } from 'react'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import Badge from '../../Components/Badge/Index.jsx'
import PrintVoice from '../Invoice/printvoice.jsx'
import { useEffect } from 'react'
import { editData, fetchDataFromApi } from '../../../Utils/Api.js'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useContext } from 'react'
import { MyContext } from '../../App.jsx'


const Orders = () => {
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
    const [orders, setOrders] = useState([]);
    const context = useContext(MyContext);

 const isShowOrderdProduct =(index)=>{
   if(isOpenOrderProduct===index){
     setIsOpenOrderProduct(null);
   }else{
     setIsOpenOrderProduct(index);
 
   }
 }
 
 // Helper to get size from order item or fallback to product sizes
 const getDisplaySize = (item) => {
   if(!item) return 'N/A';
   if(item?.size) return item.size;
   const pidSize = item?.productId?.size;
   if(Array.isArray(pidSize) && pidSize.length>0) return pidSize[0];
   if(typeof pidSize === 'string' && pidSize) return pidSize;
   return 'N/A';
 }



  const handleChange = (event, id) => {
    const obj = {
      order_status: event.target.value,
    }

    editData(`/api/order/order-status/${id}`, obj).then((res)=>{
      if(res?.success){
        context.alertBox("Success", res?.message);
        // Refetch orders
        fetchDataFromApi('/api/order/order-list').then((res)=>{
          if(res?.error===false){
            setOrders(res?.data);
          }
        }).catch((error) => {
          console.error('Error refetching orders:', error);
        })
      }
    }).catch((error) => {
      console.error('Error updating order status:', error);
      context.alertBox("Error", "Failed to update order status");
    })
  };
 
 useEffect(() => {
   fetchDataFromApi('/api/order/order-list').then((res)=>{
     if(res?.error===false){
     setOrders(res?.data);
     }
   }).catch((error) => {
     console.error('Error fetching orders:', error);
   })
 },[])
 
  return (
    <>
        <div className="card my-5 shadow-md sm:rounded-lg bg-white">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Recent Orders</h2>
        </div>
          <div className="col2 w-full">
           <div className="shadow-md rounded-md  bg-white">
              <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                <h2 className="text-[18px] font-[600]">All Orders</h2>
                <p className="!mt-0">
                  There are
                  <span className="font-bold text-orange-600 ">{orders?.length}</span> Order{orders?.length !== 1 ? 's' : ''}
                </p>
                  <div className="relative overflow-x-auto !mt-5">
                    {/* Desktop table (visible on sm and up) */}
                    <div className="hidden sm:block">
                      <div className="relative overflow-x-auto !mt-5">
                        <table className="w-full text-sm text-left rtl:text-right text-black ">
                          <thead className="text-xs text-black uppercase  ">
                            <tr>
                              <th scope="col" className="px-6 py-3">&nbsp;</th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">Order Id</th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">Payment Id</th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">Name</th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">Number</th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">Address</th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">PinCode</th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">Total</th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">Email</th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">User Id</th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">Order Status</th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders?.length !== 0 &&
                              orders?.map((order, index) => (
                                <React.Fragment key={order?._id || index}>
                                  <tr className="bg-white border-b dark:border-gray-700 border-gray-200 font-[600]">
                                    <td className="px-6 py-4">
                                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]" onClick={() => isShowOrderdProduct(index)}>
                                        {isOpenOrderProduct === index ? <FaAngleUp className="text-[18px] text-[#000]" /> : <FaAngleDown className="text-[18px] text-[#000]" />}
                                      </Button>
                                    </td>
                                    <td className="px-6 py-4">{order?._id}</td>
                                    <td className="px-6 py-4">{order?.paymentId ? order?.paymentId : "Cash on Delivery"}</td>
                                    <td className="px-6 py-4">{order?.userId?.name}</td>
                                    <td className="px-6 py-4">{order?.delivery_address?.mobile}</td>
                                    <td className="px-6 py-4"><span className="block max-w-[300px] truncate">{`${order?.delivery_address?.address_line1 || ''} ${order?.delivery_address?.city || ''} ${order?.delivery_address?.landmark || ''} ${order?.delivery_address?.state || ''} ${order?.delivery_address?.country || ''}`}</span></td>
                                    <td className="px-6 py-4">{order?.delivery_address?.pincode}</td>
                                    <td className="px-6 py-4">{order?.totalAmt}</td>
                                    <td className="px-6 py-4">{order?.userId?.email}</td>
                                    <td className="px-6 py-4">{order?.userId?._id}</td>
                                    <td className="px-6 py-4">
                                      <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={order?.order_status || ''} label="Status" size="small" className="w-full" onChange={(e) => handleChange(e, order?._id)}>
                                        <MenuItem value={'pending'}>Pending</MenuItem>
                                        <MenuItem value={'confirmed'}>Confirmed</MenuItem>
                                        <MenuItem value={'delivered'}>Delivered</MenuItem>
                                      </Select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order?.createdAt?.split("T")[0]}</td>
                                  </tr>

                                  {isOpenOrderProduct === index && (
                                    <tr>
                                      <td className="bg-[#f1f1f1] pl-20" colSpan={12}>
                                        <div className="relative overflow-x-auto">
                                          <table className="w-full text-sm text-left rtl:text-right text-black ">
                                            <thead className="text-xs text-black uppercase">
                                              <tr>
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Product Id</th>
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Product Title</th>
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Image</th>
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Qty</th>
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Size</th>
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Price</th>
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Sub total</th>
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Print Invoice</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {order?.products?.map((item, idx) => (
                                                <tr key={idx} className="bg-white border-b dark:border-gray-700 border-gray-200 font-[600]">
                                                  <td className="px-6 py-4">{item?.productId?._id || item?._id}</td>
                                                  <td className="px-6 py-4 whitespace-nowrap">{item?.productId?.name || item?.name}</td>
                                                  <td className="px-6 py-4"><img src={item?.productId?.images?.[0] || item?.image?.[0] || item?.image} alt="" className="w-[40px] h-[40px] object-cover rounded-md" /></td>
                                                  <td className="px-6 py-4">{item?.quantity}</td>
                                                  <td className="px-6 py-4">{getDisplaySize(item)}</td>
                                                  <td className="px-6 py-4">₹{item?.price}</td>
                                                  <td className="px-6 py-4">₹{item?.price * item?.quantity}</td>
                                                  <td className="px-6 py-4"><PrintVoice order={order} /></td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </React.Fragment>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Mobile cards (visible below sm) */}
                    <div className="block sm:hidden space-y-4">
                      {orders?.length !== 0 ? (
                        orders.map((order, index) => (
                          <div key={order?._id || index} className="bg-white p-3 rounded-lg shadow-sm">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="text-sm font-medium">Order ID</div>
                                <div className="text-xs text-gray-700 truncate max-w-[200px]">{order?._id}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium">Total</div>
                                <div className="text-sm">₹{order?.totalAmt}</div>
                              </div>
                            </div>

                            <div className="mt-3 grid grid-cols-1 gap-2 text-sm">
                              <div><span className="font-medium">Name:</span> {order?.userId?.name}</div>
                              <div><span className="font-medium">Number:</span> {order?.delivery_address?.mobile}</div>
                              <div><span className="font-medium">Address:</span>
                                <div className="text-xs text-gray-700">{`${order?.delivery_address?.address_line1 || ''} ${order?.delivery_address?.city || ''} ${order?.delivery_address?.landmark || ''} ${order?.delivery_address?.state || ''} ${order?.delivery_address?.country || ''}`}</div>
                              </div>
                            </div>

                            <div className="mt-3 flex items-center gap-2">
                              <div className="flex-1">
                                <Select value={order?.order_status || ''} size="small" className="w-full" onChange={(e) => handleChange(e, order?._id)}>
                                  <MenuItem value={'pending'}>Pending</MenuItem>
                                  <MenuItem value={'confirmed'}>Confirmed</MenuItem>
                                  <MenuItem value={'delivered'}>Delivered</MenuItem>
                                </Select>
                              </div>
                              <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]" onClick={() => isShowOrderdProduct(index)}>
                                {isOpenOrderProduct === index ? <FaAngleUp className="text-[18px] text-[#000]" /> : <FaAngleDown className="text-[18px] text-[#000]" />}
                              </Button>
                            </div>

                            {isOpenOrderProduct === index && (
                              <div className="mt-3 border-t pt-3 space-y-2">
                                {order?.products?.map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-3">
                                    <img src={item?.productId?.images?.[0] || item?.image?.[0] || item?.image} alt="" className="w-12 h-12 object-cover rounded" />
                                    <div className="flex-1 text-sm">
                                      <div className="font-medium">{item?.productId?.name || item?.name}</div>
                                      <div className="text-xs text-gray-600">Qty: {item?.quantity} • Size: {getDisplaySize(item)} • ₹{item?.price}</div>
                                    </div>
                                    <div className="text-sm">₹{item?.price * item?.quantity}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500">No orders found</div>
                      )}
                    </div>
                  </div>
              </div>
            </div>
           
            
        </div>
        
      </div>

     
    </>
  )
}

export default Orders



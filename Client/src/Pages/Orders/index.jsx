import React, { useEffect, useState, useContext } from 'react'
import AccountSidebar from '../../Components/AccountSidebar/index.jsx';
import Button from '@mui/material/Button';
import { FaAngleDown } from "react-icons/fa6";
import Badge from '../../Components/Badge/index.jsx';
import { FaAngleUp } from "react-icons/fa6";
import { fetchDataFromApi } from '../../Utils/Api';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import './style.css'
const Order = () => {
   const history = useNavigate();
   const context = useContext(MyContext);

   const [isOpenOrderProduct, setIsOpenOrderProduct]= useState(null);
   const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      history("/login");
    }
  }, []);

const isShowOrderdProduct =(index)=>{
  if(isOpenOrderProduct===index){
    setIsOpenOrderProduct(null);
  }else{
    setIsOpenOrderProduct(index);

  }
}

useEffect(() => {
   fetchDataFromApi('/api/order/my-orders').then((res)=>{
     if(!res?.error){
     setOrders(res?.data || res);
     }
   })
 },[])

  return (
    <>
        <section className="py-5 lg:py-10 w-full">
        <div className="container flex flex-col lg:flex-row gap-5">
          <div className="col1 w-[20%] hidden lg:block ">
           <AccountSidebar/>
          </div>

        <div className="col2 w-full lg:w-[80%]">
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
                      <td className="px-6 py-4">{order?.delivery_address?.mobile || order?.userId?.mobile}</td>
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
      </section>
    </>
  )
}

export default Order



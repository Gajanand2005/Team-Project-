import React, { useState } from 'react'
import AccountSidebar from '../../components/AccountSidebar';
import Button from '@mui/material/Button';
import { FaAngleDown } from "react-icons/fa6";
import Badge from '../../components/Badge';
import { FaAngleUp } from "react-icons/fa6";

const Order = () => {

  const [isOpenOrderProduct, setIsOpenOrderProduct]= useState(null);

const isShowOrderdProduct =(index)=>{
  if(isOpenOrderProduct===index){
    setIsOpenOrderProduct(null);
  }else{
    setIsOpenOrderProduct(index);

  }
}

  return (
    <>
        <section className="py-10 w-full">
        <div className="container flex gap-5">
          <div className="col1 w-[20%]">
           <AccountSidebar/>
          </div>

        <div className="col2 w-[80%]">
           <div className="shadow-md rounded-md  bg-white">
              <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                <h2 className="text-[18px] font-[600]">My Order</h2>
                <p className="!mt-0">
                  There are
                  <span className="font-bold text-orange-600 ">2</span> Order
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
                    <tr className="bg-white border-b  dark:border-gray-700 border-gray-200 font-[600]">
                      <td className="px-6 py-4">
                        <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]' onClick={()=>isShowOrderdProduct(0)} >
                          {
                            isOpenOrderProduct === 0 ? <FaAngleUp className='text-[18px] text-[#000]' /> : <FaAngleDown className='text-[18px] text-[#000]' />
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
                      isOpenOrderProduct=== 0 && (
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
                </table>
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

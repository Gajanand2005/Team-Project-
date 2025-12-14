import React , { Children, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegSquareMinus } from "react-icons/fa6";




const CategoryCollapse = (props) => {
    const [submenuIndex, setSubmenuIndex] = useState(null);
    const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);


    const openSubmenu = (index) => {
    setSubmenuIndex(submenuIndex === index ? null : index);
  };
    const openInnerSubmenu = (index) => {
    setInnerSubmenuIndex(innerSubmenuIndex === index ? null : index);
  };
  return (
    <>
    <div className='scroll'>
        <ul className='w-full'>
          {
            props?.data?.length!==0 &&  props?.data?.map((cat, index)=>{
              return(
                <li className='list-none relative flex-col' key={index}>
            <Link to={`/productListing?catId=${cat?._id}`} className='w-full' onClick={()=>props?.setIsOpenCatPanel && props?.setIsOpenCatPanel(false)}>
              <Button className='w-full !text-left !justify-start !px-3 !text-black'>{cat?.name}</Button>
            </Link>
            {submenuIndex === index ? (
             <FaRegSquareMinus
             className="absolute top-[10px] right-[15px] cursor-pointer"
            onClick={() => openSubmenu(index)}
           />
            ) : (
          <FaRegPlusSquare
          className="absolute top-[10px] right-[15px] cursor-pointer"
         onClick={() => openSubmenu(index)}
         />
           )}
            {submenuIndex === index && (
              <li className='list-none relative mb-1'>
                <ul className='submenu  pl-3'>
                          {
                    cat?.children?.length!==0 && cat?.children?.map((subCat, index_)=>{
                      return(
                          <li className='list-none relative mb-1' key={index_}>
                    <Link to={`/productListing?subCatId=${subCat?._id}`} onClick={()=>props?.setIsOpenCatPanel && props?.setIsOpenCatPanel(false)}>
                      <Button className='w-full !text-left !justify-start !px-3 !text-black'>{subCat?.name}</Button>
                    </Link>
                    {innerSubmenuIndex === index_ ? (
                    <FaRegSquareMinus
                     className="absolute top-[10px] right-[15px] cursor-pointer" onClick={() => openInnerSubmenu(index_)}
                    />
                  ) : (
              <FaRegPlusSquare
              className="absolute top-[10px] right-[15px] cursor-pointer"
              onClick={() => openInnerSubmenu(index_)}
           />
           )}
                          {
            innerSubmenuIndex === index_ && (
                      <ul className='inner_submenu  w-full !pl-3 !px-3'>
                        {
                          subCat?.children?.length !==0 &&  subCat?.children?.map((thirdLavelCat, index__)=>{
                            return(
                              <li className='list-none relative mb-1' key={index__}>
                          <Link to={`/productListing?thirdsubCatId=${thirdLavelCat?._id}`} className='link w-full !text-left !justify-start transition text-[13px]' onClick={()=>props?.setIsOpenCatPanel && props?.setIsOpenCatPanel(false)}>
                           {thirdLavelCat?.name}
                          </Link>
                        </li>
                            )
                          })
                        }
                        
                       
                      </ul>
                    )}
                  </li>
                      )
                    })
                  }
                
                </ul>
              </li>
            )}
          </li>
              )
            })
          }
          
        </ul>
       
      </div> 
    </>
  )
}

export default CategoryCollapse;



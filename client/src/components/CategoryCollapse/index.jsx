import React , { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegSquareMinus } from "react-icons/fa6";
const CategoryCollapse = () => {
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
          <li className='list-none relative flex-col'>
            <Link to='/' className='w-full'>
              <Button className='w-full !text-left !justify-start !px-3 !text-black'>Fashine</Button>
            </Link>
            {submenuIndex === 0 ? (
             <FaRegSquareMinus
             className="absolute top-[10px] right-[15px] cursor-pointer"
            onClick={() => openSubmenu(0)}
           />
            ) : (
          <FaRegPlusSquare
          className="absolute top-[10px] right-[15px] cursor-pointer"
         onClick={() => openSubmenu(0)}
         />
           )}
            {submenuIndex === 0 && (
              <li className='list-none relative mb-1'>
                <ul className='submenu  pl-3'>
                  <li className='list-none relative mb-1'>
                    <Link to='/'>
                      <Button className='w-full !text-left !justify-start !px-3 !text-black'>Apparel</Button>
                    </Link>
                    {innerSubmenuIndex === 0 ? (
                    <FaRegSquareMinus
                     className="absolute top-[10px] right-[15px] cursor-pointer" onClick={() => openInnerSubmenu(0)}
                    />
                  ) : (
              <FaRegPlusSquare
              className="absolute top-[10px] right-[15px] cursor-pointer"
              onClick={() => openInnerSubmenu(0)}
           />
           )}
           {
            innerSubmenuIndex === 0 && (
                      <ul className='inner_submenu  w-full !pl-3 !px-3'>
                        <li className='list-none relative mb-1'>
                          <Link to='/' className='link w-full !text-left !justify-start transition text-[13px]'>
                           Organza
                          </Link>
                        </li>
                        <li className='list-none relative mb-1'>
                          <Link to='/' className='link w-full !text-left !justify-start transition text-[13px]'>
                            Georgette
                          </Link>
                        </li>
                        <li className='list-none relative mb-1'>
                          <Link to='/' className='link w-full !text-left !justify-start transition text-[14px]'>
                           Silk
                          </Link>
                        </li>
                        <li className='list-none relative mb-1'>
                          <Link to='/' className='link w-full !text-left !justify-start transition text-[14px]'>
                            Banarsi
                          </Link>
                        </li>
                        <li className='list-none relative mb-1'>
                          <Link to='/' className='link w-full !text-left !justify-start transition text-[14px]'>
                            Cotton
                          </Link>
                        </li>
                        <li className='list-none relative mb-1'>
                          <Link to='/' className='link w-full !text-left !justify-start transition text-[14px]'>
                            Chinnon
                          </Link>
                        </li>
                        <li className='list-none relative mb-1'>
                          <Link to='/' className='link w-full !text-left !justify-start transition text-[14px]'>
                            Woollen
                          </Link>
                        </li>
                        <li className='list-none relative mb-1'>
                          <Link to='/' className='link w-full !text-left !justify-start transition text-[14px]'>
                            Lucknowi
                          </Link>
                        </li>
                        <li className='list-none relative mb-1'>
                          <Link to='/' className='link w-full !text-left !justify-start transition text-[14px]'>
                            Crepe
                          </Link>
                        </li>
                        <li className='list-none relative mb-1'>
                          <Link to='/' className='link w-full !text-left !justify-start transition text-[14px]'>
                            Net
                          </Link>
                        </li>
                        <li className='list-none relative mb-1'>
                          <Link to='/' className='link w-full !text-left !justify-start transition text-[14px]'>
                            Chiffon
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </li>
            )}
          </li>
        </ul>
        <ul className='w-full'>
          <li className='list-none relative flex-col'>
            <Link to='/' className='w-full'>
              <Button className='w-full !text-left !justify-start !px-3 !text-black'>Electronic</Button>
            </Link>
            {submenuIndex === 1 ? (
             <FaRegSquareMinus
             className="absolute top-[10px] right-[15px] cursor-pointer flex-col"
            onClick={() => openSubmenu(1)}
           />
            ) : (
          <FaRegPlusSquare
          className="absolute top-[10px] right-[15px] cursor-pointer"
         onClick={() => openSubmenu(1)}
         />
           )}
            {submenuIndex === 1 && (
              <li className='list-none relative mb-1'>
                <ul className='submenu w-full pl-3'>
                  <li className='list-none relative mb-1'>
                    <Link to='/'>
                      <Button className='w-full !text-left !justify-start !px-3 !text-black'>Apparel</Button>
                    </Link>
                    {innerSubmenuIndex === 1 ? (
                    <FaRegSquareMinus
                     className="absolute top-[10px] right-[15px] cursor-pointer" onClick={() => openInnerSubmenu(0)}
                    />
                  ) : (
              <FaRegPlusSquare
              className="absolute top-[10px] right-[15px] cursor-pointer"
              onClick={() => openInnerSubmenu(1)}
           />
           )}
           {
            innerSubmenuIndex === 1 && (
                      <ul className='inner_submenu  w-full !pl-3 !px-3'>
                        <li className='list-none relative mb-1'>
                          <Link to='/' className='link w-full !text-left !justify-start transition text-[13px]'>
                            Mobile
                          </Link>
                        </li>
                        <li className='list-none relative mb-1'>
                          <Link to='/' className='link w-full !text-left !justify-start transition text-[13px]'>
                           Laptops
                           </Link>
                        </li>
                        
                      </ul>
                    )}
                  </li>
                </ul>
              </li>
            )}
          </li>
          <li className='list-none relative flex-col'>
            <Link to='/' className='w-full'>
              <Button className='w-full !text-left !justify-start !px-3 !text-black'>Bags</Button>
            </Link>
            {submenuIndex === 2 ? (
             <FaRegSquareMinus
             className="absolute top-[10px] right-[15px] cursor-pointer flex-col"
            onClick={() => openSubmenu(2)}
           />
            ) : (
          <FaRegPlusSquare
          className="absolute top-[10px] right-[15px] cursor-pointer"
         onClick={() => openSubmenu(2)}
         />
           )}
            {submenuIndex === 2 && (
              <li className='list-none relative mb-1'>
                <ul className='submenu w-full pl-3'>
                  <li className='list-none relative mb-1'>
                    <Link to='/'>
                      <Button className='w-full !text-left !justify-start !px-3 !text-black'>Apparel</Button>
                    </Link>
                    {innerSubmenuIndex === 2 ? (
                    <FaRegSquareMinus
                     className="absolute top-[10px] right-[15px] cursor-pointer" onClick={() => openInnerSubmenu(2)}
                    />
                  ) : (
              <FaRegPlusSquare
              className="absolute top-[10px] right-[15px] cursor-pointer"
              onClick={() => openInnerSubmenu(2)}
           />
           )}
           {
            innerSubmenuIndex === 2 && (
                      <ul className='inner_submenu  w-full !pl-3 !px-3'>
                        <li className='list-none relative mb-1'>
                          <Link to='/' className='link w-full !text-left !justify-start transition text-[13px]'>
                            Men Bages
                          </Link>
                        </li>
                        <li className='list-none relative mb-1'>
                          <Link to='/' className='link w-full !text-left !justify-start transition text-[13px]'>
                           Women Bags
                          </Link>
                        </li>
                      
                      </ul>
                    )}
                  </li>
                </ul>
              </li>
            )}
          </li>
          
        </ul>
      </div> 
    </>
  )
}

export default CategoryCollapse;

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import "./style.css";
import Divider from '@mui/material/Divider';
import { IoMdClose } from "react-icons/io";

import CategoryCollapse from '../../CategoryCollapse/index.jsx'
import Button from '@mui/material/Button';
import { MyContext } from '../../../App';

const CategoryPanel = (props) => {


  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
    props.propsSetIsOpenCatPanel(newOpen);
  };
  const context =useContext(MyContext)

 const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className='categoryPanel'>
  
      <h3 className='p-3 text-[20px] font-[500] flex items-center justify-between'>
        Shop By Categories
        <IoMdClose
          onClick={() => props.setIsOpenCatPanel(false)}
          className='cursor-pointer text-[20px]'
        />
      </h3>
      {
        props?.data?.length!==0 &&   <CategoryCollapse data={props?.data} setIsOpenCatPanel={props.setIsOpenCatPanel} />
      }

      <Divider />
 
    </Box>
  );
  return (
    <Drawer open={props.isOpenCatPanel} onClose={() => props.setIsOpenCatPanel(false)}>
      {DrawerList}
    </Drawer>
  );
};
export default CategoryPanel;



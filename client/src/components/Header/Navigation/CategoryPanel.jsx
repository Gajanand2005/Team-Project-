import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import Divider from '@mui/material/Divider';
import { IoMdClose } from "react-icons/io";

import CategoryCollapse from '../../CategoryCollapse'

const CategoryPanel = (props) => {


  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
  };
 
 const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className='categoryPanel'>
      <h3 className='p-3 text-[20px] font-[500] flex items-center justify-between'>
        Shop By Categories 
        <IoMdClose 
          onClick={() => props.openCategoryPanel(false)} 
          className='cursor-pointer text-[20px]' 
        />
      </h3>
      <CategoryCollapse/>
      <Divider />
    </Box>
  );
  return (
    <Drawer open={props.isOpenCatPanel} onClose={() => props.openCategoryPanel(false)}>
      {DrawerList}
    </Drawer>
  );
};
export default CategoryPanel;

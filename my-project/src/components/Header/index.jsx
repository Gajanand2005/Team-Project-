import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
import Search from '../Search'

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { FaLuggageCart } from "react-icons/fa";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header = () => {
  return (
    <>
      <header>
        <div className='top-strip py-2 border-t-[1px] border-gray-300 border-b-[1px] '>
          <div className='container'>
            <div className='flex items-center justify-between'>
              <div className='col1 w-[50%]'>
                <p className='text-[12px] font-[500]'>Get up to 50% off new season styles, limited time </p>
              </div>
              <div className='flex items-center justify-end col2'>
                <ul className='flex items-center gap-4'>
                  <li className='list-none'>
                    <Link to='/help-center' className='text-[12px] link font-[500] transition'>Help Center</Link>
                  </li>
                  <li className='list-none'>
                    <Link to='/order-tracking' className='text-[12px] link font-[500] transition'>Order Tracking</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='header py-3 '>
          <div className='container flex items-center justify-between gap-3 '>
            <div className='col1 w-[25%]'>
              <Link to={'/'}><img src={logo} alt="Logo"/></Link>
            </div>
            <div className='col2 w-[45%] '>
              <Search/>
            </div>
            <div className='col3 w-[30%] flex items-center pl-7'>
                <ul className='flex items-center gap-3'>
                  <li className='list-none'>
                    <Link to='/login' className='link transition text-[15px] font-[500]'>Login</Link> | &nbsp;
                    <Link to='/register' className='link transition text-[15px] font-[500]'>Register</Link>

                  </li>
                  <li>
                      <IconButton aria-label="cart">
                     <StyledBadge badgeContent={4} color="secondary">
                   <FaLuggageCart />
                 </StyledBadge>
                </IconButton>
                  </li>
                </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header

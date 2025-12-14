import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'
import { GiTechnoHeart } from 'react-icons/gi'
import { PiBagFill } from 'react-icons/pi'
import { FaUserAstronaut } from 'react-icons/fa'
import { MdFilterList } from 'react-icons/md'
import { MyContext } from '../../App'

const MobileBottomNav = () => {
  const loc = useLocation();
  const context = useContext(MyContext);
  const isProductListing = loc.pathname === '/productListing';

  const handleFilterClick = (e) => {
    e.preventDefault();
    context?.setSidebarOpen(true);
  };

  const items = [
    { to: '/', label: 'Home', icon: <AiOutlineHome /> },
    isProductListing 
      ? { to: '#', label: 'Filter', icon: <MdFilterList />, onClick: handleFilterClick, isButton: true }
      : { to: '/search', label: 'Search', icon: <AiOutlineSearch /> },
    { to: '/my-list', label: 'Wishlist', icon: <GiTechnoHeart /> },
    { to: '/my-order', label: 'Orders', icon: <PiBagFill /> },
    // { to: '/my-account', label: 'Account', icon: <FaUserAstronaut /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-t z-100 lg:hidden">
      <ul className="flex items-center justify-between px-2">
        {items.map((it, index) => {
          const active = !it.isButton && loc.pathname === it.to;
          const key = it.isButton ? 'filter-button' : it.to;
          
          if (it.isButton) {
            return (
              <li key={key} className="flex-1 text-center py-2">
                <button 
                  onClick={it.onClick}
                  className={`flex flex-col items-center justify-center text-[12px] w-full ${context?.sidebarOpen ? 'text-red-500' : 'text-gray-700'}`}
                >
                  <div className="text-xl">{it.icon}</div>
                  <span className="mt-1 text-[11px]">{it.label}</span>
                </button>
              </li>
            );
          }

          return (
            <li key={key} className="flex-1 text-center py-2">
              <Link to={it.to} className={`flex flex-col items-center justify-center text-[12px] ${active ? 'text-red-500' : 'text-gray-700'}`}>
                <div className="text-xl">{it.icon}</div>
                <span className="mt-1 text-[11px]">{it.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  )
}

export default MobileBottomNav



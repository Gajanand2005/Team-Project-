import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <>
      <header>
      <div className='top-strip py-2 '>

        <div className='container'>
          <div className='flex items-center justify-between'>
            <div className='col1 w-[50%]'>
              <p className='text-[14px] font-[500]'>Get up to 50% off new season styles, limited time </p>
            </div>

            <div className='flex items-center justify-end col2'>
              <ul>
                <li className='list-none'>
                  <Link to='/help-center'>Help Center</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
      </header>
    </>
  )
}

export default Header

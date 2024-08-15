import React from 'react'
import './Layout.css';
import Sidebar from './Sidebar';

const Layout = (props) => {
  return (
    <div className='app-wrap'>
      <div className='wst'></div>
      <div className='app-pg-wrap'>
        <div className='sidebar'>
          <Sidebar/>
        </div>
        <div className='other-pgs'>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Layout
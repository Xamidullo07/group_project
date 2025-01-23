import React from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import "./style.css"

function MainLayout() {
  return (
    <div className='bacraound'>
        <Navbar/>
        <Sidebar/>
    </div>
  )
}

export default MainLayout
import Navbar from '@/pages/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'


function Layouts({children} : any) {
  return (
    <>
        <Navbar />
        {children}
    </>
  )
}

export default Layouts
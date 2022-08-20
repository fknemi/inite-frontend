import React from 'react'
import { Props } from '../@types/types'
import Navbar from './Navbar'
// react props type
const Layout = ({children}: Props ) => {
  return (
    <div className='ml-4'>
    <Navbar />
    {children}
    </div>
  )
}

export default Layout
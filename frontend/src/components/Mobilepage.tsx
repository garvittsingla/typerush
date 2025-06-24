import React from 'react'
import Navbar from './Navbar'
import { FiMonitor } from 'react-icons/fi'

const Mobilepage = () => {
  return (
    <div className='bg-black h-screen w-full p-4'>
      <Navbar/>
      <div className='w-full h-3/4 flex items-center flex-col justify-center text-white gap-2'>
        <FiMonitor color='white' size={50}/>
        <h1 className='text-red-500 text-xl font-semibold font-mono text-center'>Best experience on larger screens</h1>
        <h2 className='max-w-2/3 text-center'>This webiste is optimised for bigger screen. Please open it in a PC/Tablet for best exprience, Thank you.</h2>
      </div>
    </div>
  )
}

export default Mobilepage
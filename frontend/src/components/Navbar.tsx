import React from 'react'
import { MdKeyboardAlt } from "react-icons/md";


const Navbar = () => {
  return (
    <div className='w-4/5 mx-auto h-20 bg-re  -900 font-[oswald] flex flex-col '>
       <div className='h-full w-1/6 bg-gren-900 flex flex-col justify-center gap-2 text-white font-semibold text-3xl '>
          <div className='flex  items-center '><MdKeyboardAlt size={20} />typeRush</div>
       <div className='h-1 w-1/3 bg-[var(--color-secondary)]'></div>
       </div>
    </div>
  )
}

export default Navbar
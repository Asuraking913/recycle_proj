import React from 'react'
import {motion} from "framer-motion"

function Foot() {
  return (
    <div className='flex w-full bg-transparent border-t-[1.5px] border-t-[--nav]  justify-center py-[.5em]' >
        <p className='text-white poppins sm:text-xl'>&copy; Recycle</p>
    </div>
  )
}

export default Foot
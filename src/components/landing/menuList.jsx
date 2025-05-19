import React from 'react'
import { FaExternalLinkAlt } from "react-icons/fa";

function MenuList({img, name, text}) {
  return (
    <div className='sm:py-[1em] p-[20px] rounded-[10px] linear-grad text-[--nav] shadow-lg shadow-gray-400 w-[300px] flex flex-col'>
        <div className='flex justify-center items-center'>
            <img src={img} className='w-[250px] object-cover h-[200px] rounded-[5px]' alt="" />
        </div>

        <div className='flex items-center justify-between mt-[10px] '>
          <p className='poppins font-extrabold'>{name}</p>

          <i className=''>
            <FaExternalLinkAlt />
          </i>
        </div>

        <p className='mt-[10px] text-[0.9rem]'>{text}</p>
    </div>
  )
}

export default MenuList
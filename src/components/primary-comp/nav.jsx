import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered, faSearch } from '@fortawesome/free-solid-svg-icons'
import logo from "../../assets/logo.png"
import { motion } from 'framer-motion'

function Nav({onNav, nav}) {


  return (
    <div className='flex justify-between bg-transparent fixed  w-full z-[200] items-center py-[.5em] bg-[--nav] px-[1em] sm:px-[--pdx]'>
      <div className='flex items-center '>
        <img src={logo} className='w-[40px] h-[40px]' alt="" />
        <a href="#" className='poppins text-xl text-[--nav] font-bold'>Recycle</a>
      </div>

      <div onClick={() => {onNav(!nav)}} className='sm:hidden text-2xl'>
        <FontAwesomeIcon icon={faBarsStaggered}/>
      </div>

      {/*<div className='hidden sm:block'>
        <form action="">
          <motion.p
          initial={{
            x: "90em"
          }}

          animate={{
            x: "0em"
          }}

           className='relative'>
            <input type="text" className='poppins px-[1em] placeholder-black capitalize outline-none border-[1.5px] border-[--gray] p-[.8em] pr-[2.5em] rounded-[2em]' placeholder='Find Food or beverages' />
            <FontAwesomeIcon icon={faSearch} className='absolute text-2xl right-[.5em] top-[.5em] text-[--gray]'/>
          </motion.p>
        </form>
      </div>*/}
    </div>
  )
}

export default Nav
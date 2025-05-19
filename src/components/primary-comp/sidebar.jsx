import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faCartShopping, faGear, faHouse, faPerson} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function SideBar({nav}) {
    const navigate = useNavigate()

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if(nav) {
            setVisible(true)
        }
    }, [nav])

  return (
    <div className='z-[4] fixed h-[90vh] top-[4.5em] bg-transparent shadow-md rounded-[10px] shadow-[--nav]'>
        <div onPointerLeave={() => {
            if(nav) {
                return
            }
            setVisible(!true)
        }} onPointerOverCapture={() => {
            if(nav) {
                return
            }
            setVisible(true)
            }}  className={`${visible ? "w-[300px]" : "w-[70px]"} h-full  sm:flex flex-col justify-center gap-[8em] shadow-md rounded-[10px] shadow-[--nav] px-[1.5em] bg-[--black]`}>

            {
            !visible 
            &&
            <motion.div
            transition={{
                duration: .2
            }}
            initial={{
                x: 0,
                scale: 0 
            }}

            animate={{
                scale: 1
            }}
            className='h-full flex items-center'>
                <ul className=' flex flex-col gap-[5em] text-xl text-[--nav]'>
                    <li>
                        <FontAwesomeIcon icon={faBarsProgress}/>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faCartShopping}/>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faGear}/>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faPerson}/>
                    </li>
                </ul>
            </motion.div>
            }

            {visible && 
            <motion.div 
            initial={{
                x: "-50em"
            }}

            animate={{
                x: "0"
            }}

            transition={{
                duration: 0.5
            }}

            exit={{
                x: "-50em"
            }}
            className={` h-full flex flex-col justify-center gap-[8em] bg-[--black]`}>
                <ul className='flex flex-col z-[1]'>
                    <li onClick={() => navigate("/")} className='poppins font-[semibold] text-[1.2em] text-[--nav] p-[.5em] cursor-pointer hover:bg-[--nav] hover:text-[--white] rounded-[5px]'>
                        <FontAwesomeIcon className='mr-[1em]' icon={faHouse} />
                        <button>Home</button>
                    </li>
                    <li onClick={() => navigate("/dashboard")} className='poppins font-[semibold] text-[1.2em] text-[--nav] p-[.5em] cursor-pointer hover:bg-[--nav] hover:text-[--white] rounded-[5px]'>
                        <FontAwesomeIcon className='mr-[1em]' icon={faBarsProgress}/>
                        <button>DashBoard</button>
                    </li>
                    <li onClick={() => navigate("/menu")}  className='poppins font-[semibold] text-[1.2em] text-[--nav] p-[.5em] cursor-pointer hover:bg-[--nav] hover:text-[--white] rounded-[5px]'>
                        <FontAwesomeIcon className='mr-[1em]' icon={faCartShopping}/>
                        <button>Menu</button>
                    </li>
                </ul>
                <ul className='flex flex-col'>
                    <li className='poppins font-[semibold] text-[1.2em] text-[--nav] p-[.5em] cursor-pointer hover:bg-[--nav] hover:text-[--white] rounded-[5px]'>
                        <FontAwesomeIcon className='mr-[1em]' icon={faGear}/>
                        <button>Settings</button>
                    </li>
                    <li className='poppins font-[semibold] text-[1.2em] text-[--nav] p-[.5em] cursor-pointer hover:bg-[--nav] hover:text-[--white] rounded-[5px]'>
                        <FontAwesomeIcon className='mr-[1em]' icon={faPerson}/>
                        <button>Customer Support</button>
                    </li>
                </ul>
            </motion.div>
            }
        </div>
    </div>
  )
}

export default SideBar
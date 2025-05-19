import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNairaSign } from '@fortawesome/free-solid-svg-icons'
import OrderItems from './orderItems'
import {motion} from "framer-motion"

function Receipts({date, orderId, items}) {

    const totalPrice = items.reduce((value, item) => {

        if (item.quantity > 0) {
            let newValue = value + item.price * item.quantity
            return newValue
        }
        let newValue = value + item.price 
        return newValue
    }, 0)

    const [userName, setUserName] = useState("")

  return (
    <div className='w-[380px]  rounded-[5px] p-[10px]   bg-[--nav] flex flex-col gap-[5px]'>
        <h1 className='text-center poppins font-bold p-[5px]'>Your Receipt</h1>
        <div className='flex justify-between items-center'>
            <p className='font-bold text-[1rem] poppins flex justify-between items-center'>Order id: </p>
            <p className='text-[0.85rem] capitalize poppins'>{orderId}</p>
        </div>
        <p className='text-[0.9rem] capitalize poppins'>Thank you for your order {userName}</p>
        <div className='flex justify-between'>
            <p className='poppins text-[0.9rem] font-bold'>Ordered</p>
            <p className='poppins text-[0.9rem]'>{items.length} Items</p>
        </div>
        <div className=' flex flex-col gap-[10px] max-h-[250px] sm:h-[250px] overflow-scroll py-[1em] hide-scrollbar'>
            {items.map((items, i) => <OrderItems key={i} {...items}/>)}
        </div>
        <div className='  flex flex-col justify-center gap-[5px]'>
            <div className='flex justify-between'>
                <p className='poppins font-bold text-[--black]'>Date:</p>
                <p className='poppins text-[0.9rem] text-[--black]'>{date}</p>
            </div>
            <div className='flex justify-between'>
                <p className='poppins font-bold text-[--black]'>Total:</p>
                <p className='poppins text-[0.9rem] text-[--black]'><FontAwesomeIcon icon={faNairaSign}/>{totalPrice}</p>
            </div>  
            <button className='bg-[--black] poppins text-[--nav] p-[10px] rounded-[5px] sm:hover:text-[--black] border-[1.5px] border-[--black] duration-[0.5s]  sm:hover:bg-[--nav]'>
                Download file
            </button>
        </div>
    </div>
  )
}

export default Receipts
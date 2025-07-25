import React from 'react'
import OrderItems from './orderItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCopy, faNairaSign, faTimes } from '@fortawesome/free-solid-svg-icons'

function Orders({orderId, date, items, orderUsername, orderLocation, orderContact}) {

    const totalPrice = items.reduce((value, item) => {

        if (item.quantity > 0) {
            let newValue = value + item.price * item.quantity
            return newValue
        }
        let newValue = value + item.price 
        return newValue
    }, 0)


  return (
    <div className='w-[350px]  rounded-[10px] p-[10px] linear-grad shadow-md text-[--nav] shadow-white flex flex-col gap-[5px]'>
        <div className='flex justify-between flex-row'>
  
            <p className='text-[0.9rem] capitalize poppins font-bold'>Buyer Name:</p>
            <p className='text-[0.75rem] capitalize poppins'>{orderUsername}</p>
        </div>
        <div className='flex justify-between flex-row'>
  
            <p className='text-[0.9rem] capitalize poppins font-bold'>Buyer Location:</p>
            <p className='text-[0.75rem] text-end capitalize poppins w-[50%] mt-[10px] mb-[10px]'>{orderLocation}</p>
        </div>
        <div className='flex justify-between flex-row'>
  
            <p className='text-[0.9rem] capitalize poppins font-bold'>Buyer Contact:</p>
            <p className='text-[0.75rem] text-end capitalize poppins'>{orderContact}</p>
        </div>
        <p className='text-[0.7rem] capitalize poppins'>{date}</p>

        <div className='flex justify-between'>
            <p className='poppins text-[0.9rem] font-bold'>Ordered</p>
            <p className='poppins text-[0.9rem]'>{items.length} Items</p>
        </div>
        <div className=' flex flex-col gap-[10px] max-h-[250px] sm:h-[250px] overflow-scroll py-[1em] hide-scrollbar'>
            {items.map((items, i) => <OrderItems key={i} {...items}/>)}
        </div>
        <div className='p-[2px] flex justify-between items-center'>
            <div>
                <p className='opacity-80 poppins text-[0.9rem]'>X{items.length} Items</p>
                <p className='poppins text-[0.9rem]'><FontAwesomeIcon icon={faNairaSign}/>{totalPrice}</p>
            </div>
            <div className='flex justify-between gap-[1em]'>
                <button className='border-[1.5px] p-[5px] px-[10px] flex items-center justify-center  bg-red-500 text-[--nav] rounded-[4px]'>
                    <FontAwesomeIcon className='text-2xl ' icon={faTimes} />
                </button>
                <button className='border-[1.5px] p-[5px] px-[10px] flex items-center justify-center bg-green-500 text-[--nav] rounded-[4px]'>
                    <FontAwesomeIcon className='text-2xl' icon={faCheck} />
                </button>
            </div>
        </div>
    </div>
  )
}

export default Orders
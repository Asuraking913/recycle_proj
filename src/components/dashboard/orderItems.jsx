import { faDollar, faNairaSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function OrderItems({img, name, price, quantity, weight}) {
  return (
    <div className='flex items-center border-b-[--blackv] border-b-[1.5px] p-[4px] '>
        <div className='flex flex-col w-[50%]'>
            <img src={img} className='w-[80px] shadow-sm shadow-[--black] object-cover rounded-[50%] h-[80px]' alt="" />
        </div>
        <div className='border-[--black] w-full flex-col flex gap-[5px]'>
            <p className='ubun font-bold'>{name}</p>
            <div className='flex justify-between poppins text-[0.9rem]'>
                <p><FontAwesomeIcon icon={faNairaSign}/>{price.toLocaleString()}</p>
                <p>Weight: {weight}</p>
            </div>
        </div>
    </div>
  )
}

export default OrderItems
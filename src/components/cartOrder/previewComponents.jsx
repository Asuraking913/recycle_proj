import React from 'react'

function PrevComp({img, id, name, price, quantity, total}) {
  return (
    <div className='w-full flex items-center justify-between '>
        <figure>
            <img src={img} className='w-[90px] h-[90px] rounded-[50%] object-cover' alt="" />
        </figure>
        <div className='poppins text-center'>
            <p className='text-[1.1rem] font-bold'>{name}</p>
            <p className='opacity-80'>{price}</p>
        </div>
        <div className='poppins'>
            <p className='poppins text-[--black]'>x{quantity}</p>
        </div>


    </div>
  )
}

export default PrevComp
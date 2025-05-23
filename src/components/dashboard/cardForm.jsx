import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function CardForm() {
  return (
    <div className='sm:w-[55%] '>
        <form action="#" className='flex flex-col gap-[20px] text-[--nav]'>
            <p className='flex flex-col gap-[5px]'>
                <label htmlFor="Car" className='poppins text-[1.1rem] font-bold'>Card Number</label>
                <span className='text-[0.8rem] tex-[--black] opacity-60 poppins font-bold block'>Enter 16-digit card number on the card</span>
                <input className='sm:text-[1.1rem] text-[--black] p-[8px] sm:p-[10px] outline-none rounded-[4px] border-[1.5px] border-[--blackv] ' type="tel" name="cardnumber" max={16} placeholder='5555   -   5555   -   5555   -   5555' pattern='[0-9]{4} - [0-9]{4} - [0-9]{4} - [0-9]{4}' maxLength={16} id="cardnumber" />
            </p>
            <p className='flex sm:flex-row flex-col justify-between gap-[5px]'>
                <span>
                  <label htmlFor="Car" className='poppins text-[1.1rem] font-bold'>CVV Number</label>
                  <span className='text-[0.8rem] tex-[--black] opacity-60 poppins font-bold block'>Enter the 3 or 4 digit number on the card</span>
                </span>
                <input className='sm:text-[1.1rem] text-[--black] p-[8px] sm:p-[10px] outline-none rounded-[4px] border-[1.5px] border-[--blackv] poppins text-center' type="tel" name="CVV" max={16} placeholder='327' pattern='[0-9]{4} - [0-9]{4} - [0-9]{4} - [0-9]{4}' maxLength={16} id="CVV" />
            </p>
            <p className='flex justify-between gap-[5px]'>
                <span className='sm:w-[95%]'>
                  <label htmlFor="Car" className='poppins text-[1.1rem] font-bold'>Expiry Date</label>
                  <span className='text-[0.8rem] tex-[--black] opacity-60 poppins font-bold block'>Enter the expiration of the card</span>
                </span>
                <input className='sm:text-[1.1rem] text-[--black] sm:p-[10px] outline-none rounded-[4px] border-[1.5px] border-[--blackv] sm:w-[50%] px  -[5px] text-center poppins' type="number" name="expiry" max={31} min={0} placeholder='01' pattern='[0-9]{4} - [0-9]{4} - [0-9]{4} - [0-9]{4}' maxLength={16} id="expiry" />
                <span className='flex items-center font-bold poppins mx-[5px]'>/</span>
                <input className='sm:text-[1.1rem] text-[--black] poppins sm:p-[10px] outline-none rounded-[4px] border-[1.5px] border-[--blackv] sm:w-[50%] px  -[5px] text-center' type="number" name="expiry1" max={16} min={0} placeholder='02' pattern='[0-9]{4} - [0-9]{4} - [0-9]{4} - [0-9]{4}' maxLength={16} id="expiry1" />
            </p>
            <p className='flex justify-between gap-[5px]'>
                <span className=''>
                  <label htmlFor="Car" className='poppins text-[1.1rem] font-bold'>Password</label>
                  <span className='text-[0.8rem] tex-[--black] opacity-60 poppins font-bold block'>Enter your dynamic password</span>
                </span>
                <input className='sm:text-[1.1rem] text-[--black] sm:p-[10px] sm:w-[54.5%] w-[20%] outline-none rounded-[4px] border-[1.5px] border-[--blackv] text-center placeholder-black' type="password" name="password" max={16} placeholder='***' pattern='[0-9]{4} - [0-9]{4} - [0-9]{4} - [0-9]{4}' maxLength={16} id="password" />
            </p>
            <button className='poppins linear-grad shadow-sm shadow-white text-[--nav] p-[10px] font-bold rounded-[4px] capitalize'>
              Save as default
            </button>
        </form>
    </div>
  )
}

export default CardForm
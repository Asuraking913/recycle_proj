import React from "react"
import { useState } from "react"

const Truncate = ({text, maxLength, subLength}) => {

  const [full, setFull] = useState(false)


    if (text.length > maxLength & !full) {
      return (
        <i className="poppins not-italic font-bold text-[--black] sm:text-[1rem] text-[0.8rem]">{text.substring(0, subLength) + '...'} <button href="" onClick={() => setFull(true)} className='hover:text-[--accent1] text-[#593f3bbe] underline sm:text-[0.8rem] text-[0.4rem]'>Read more</button></i>
      )
    }

    return (
      <i className="poppins not-italic font-bold text-[--black] sm:text-[1rem] text-[0.8rem]">{text}</i>
    )
    
  }

export default Truncate
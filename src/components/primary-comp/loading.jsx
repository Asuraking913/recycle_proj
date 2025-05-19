import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Loading() {
  return (
    <div className='h-[60vh] w-full flex justify-center items-center flex-col gap-[2em]'>
        <FontAwesomeIcon icon={faSpinner} className='animate-spin text-[2rem]'/>
        <p className='sm:poppins text-2xl'>Loading...</p>
    </div>
  )
}

export default Loading
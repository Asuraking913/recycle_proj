import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faNairaSign, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import {motion, AnimatePresence} from "framer-motion"
import Truncate from '../../utils/truncate'

function OrderCart({name, img, quantity, id, price, onSelect, selected, onError, onDuplicate, change, deleted}) {

  const [available, setAvailable] = useState(quantity)
  const [newQuantity, setNewQuantity] = useState(0)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if(deleted.includes(id)) {
      setAvailable(0)
      setNewQuantity(0)
      setClicked(false)
     
    }
  }, [deleted])

  useEffect(() => {
    if(id == change.id & change.event == true) {
      if (available < quantity & newQuantity > 0 & newQuantity < quantity) {
      setAvailable(t => t- 1)
      setNewQuantity(change.quantity)
    }
    }

    if(id == change.id & change.event == false) {
      if (available < quantity & newQuantity > 0 & newQuantity < quantity) {
      setAvailable(t => t+ 1)
      setNewQuantity(change.quantity)
    }
    }

    if(id == change.id & change.quantity == 0) {
      if (available < quantity & newQuantity > 0 & newQuantity < quantity) {
        setAvailable(quantity)
        setNewQuantity(0)
      }
    }
    
  }, [change])

  const removeOrder = () => {
    let newObj = {name: name, price: price, id: id, img: img, quantity: newQuantity-1, total : quantity}
    if (available < quantity & newQuantity > 0) {
    setNewQuantity(t => t -= 1)

    setAvailable(t => t+1)

    for (let i = 0; i < selected.length; i++) {
      
      if (selected[i].id == newObj.id && available >= 0) {
        onDuplicate({quantity : selected[i].quantity -= 1, id : selected[i].id})
        return
      }
    }
  }

  else {
    setClicked(false)
    onError(name + "not available")
  }
  }

  const handleOrder = () => {
    let newObj = {name: name, price: price, id: id, img: img, quantity: newQuantity+1, total : quantity}
    if (available != 0 & newQuantity < quantity) {
      setClicked(true)
    setNewQuantity(t => t += 1)

    setAvailable(t => t-1)

    for (let i = 0; i < selected.length; i++) {
      if (selected[i].id == newObj.id && available != 0) {
        setClicked(true)

        onDuplicate({quantity : selected[i].quantity += 1, id : selected[i].id})
        return
      }
    }
    onSelect(prev => [newObj,...prev])
    setClicked(!clicked)
  }

    else {
      onError(name + " " + "not available")
    }
  }

  return (
   
      <div className='sm:w-[280px] w-[49%] p-[.5em] bg-[--nav] rounded-[10px] flex gap-[1em] flex-col'>
        <div className='flex flex-col gap-[.5em] relative'>
          <img className='w-full h-[120px] sm:h-[200px] object-cover rounded-[10px]' src={img} alt="Food Image" />
          <p className='ubun font-bold text-[--black] sm:text-[1rem] text-[0.8rem]'><Truncate text={name} maxLength={22} subLength={16}/></p>
          <div className='absolute top-[55%] sm:top-[70%] bg-[#aaa8a89d] backdrop-blur-sm rounded-[2em] p-[.3em] px-[1em] '>
           <p className=' sm:top-[68%]  sm:text-[1rem] text-[.7rem] inline text-[--black] poppins sm:px-[.4em]'>Available: {newQuantity == quantity ? available : available}</p>
  
          </div>
        </div>
        <div className='flex justify-between'>
          <div >
            <p className='sm:text-[0.9rem] text-[0.7rem] poppins opacity-70 text-[--black]'>Price per potion</p>
            <p className='poppins sm:text-[0.9rem] text-[0.8rem] text-[--black]'><FontAwesomeIcon icon={faNairaSign}/>{price.toLocaleString()}</p>
          </div>

          <AnimatePresence >
            {
              !clicked || newQuantity == 0 ?
              <motion.button
              key={name}
              initial={{
                scale: 0
              }}

              animate={{
                scale:1 
              }}

              transition={{
                duration: 0.4
              }}
              exit={{
                scale: 0
              }}
              

               onClick={handleOrder}  className='bg-[--black] z-[2] sm:text-[1rem] text-[.8rem] sm:w-[50%] text-[--nav] rounded-[5px] px-[1em] sm:px-[1.5em] sm:rounded-[2em] sm:py-[.2em]'>
              Order
            </motion.button>
            :
            <motion.div
            key={name}
              initial={{
                scale: 0
              }}

              animate={{
                scale:1 
              }}

              transition={{
                duration: 0.4
              }}
              exit={{
                scale: 0
              }}
            className='flex gap-[1em] items-center'>
                  <motion.button
                  initial={{
                    rotate: 0
                  }}

                  transition={{
                    duration: .2
                  }}
                  
                  whileHover={{
                    rotate: "360deg"
                  }}
                   className='hover:scale-[1.2] hover:duration-[0.5s] text-xl'>
                    <FontAwesomeIcon onClick={removeOrder} icon={faMinus} className='p-[.2em] bg-[--nav] rounded-[50%]'/>
                  </motion.button>
                  <p>{newQuantity}</p>
                  <motion.button
                  initial={{
                    rotate: 0
                  }}
                  transition={{
                    duration: .2
                  }}
                  whileHover={{
                    rotate: "360deg"
                  }}
                   className='hover:scale-[1.2] hover:duration-[0.5s] text-xl'>
                    <FontAwesomeIcon onClick={handleOrder} icon={faPlusCircle}/>
                  </motion.button>
              </motion.div>
            
            }
          </AnimatePresence>

        </div>
      </div>
  )
}

export default OrderCart
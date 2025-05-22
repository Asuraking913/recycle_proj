import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faNairaSign, faPlusCircle, faTrash, } from '@fortawesome/free-solid-svg-icons'
import handleOrders from '../../utils/order/handleOrders'


function CartBar({selectedItems, onChange, onOrder}) {

    // const [visible, setVisible] = useState(false)
    const cartBox = useRef()
    const total = selectedItems.reverse().filter(item => item.quantity != 0).reduce((value, item) => {
        if(item.quantity > 1) {
            let newValue = value + Math.floor(item.price) * item.quantity
            return newValue
        }

        let newValue = value + Math.floor(item.price) 

        return newValue
    }, 0)

    

    const listItems = selectedItems.length > 0 && selectedItems.filter(items => items.quantity != 0).map((items, i) => (
        <AnimatePresence key={i}>
            <motion.div
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
                key={i} className='flex bg-[--nav] p-[.5em] rounded-[10px] justify-between'>
                <div className='flex gap-[.5em] items-center'>
                    <img className='w-[60px] object-cover h-[60px] rounded-[5px]' src={items.img} alt="item-image" />
                    <div className='text-[0.9rem] flex flex-col justify-center gap-[em]'>
                        <h2 className='text-[0.8rem]'>{items.name}</h2>
                        <p><FontAwesomeIcon icon={faNairaSign}/>{items.price} <span className='text-[0.7em] font-bold text-[--gray]'>x {items.quantity}</span></p>
                        <div className='flex gap-[1em] items-center'>
                        <button onClick={() => {
                             items.quantity < items.total && onChange({id : items.id, quantity: items.quantity-=1, event : false})
                            
                            }}  className='hover:scale-[1.2] text-[0.9rem] duration-[0.3s]'>
                            <FontAwesomeIcon icon={faMinus} className='p-[.2em] bg-[--nav] rounded-[50%]'/>
                        </button>
                        <p>{items.quantity}</p>
                        <button onClick={() => {
                             items.quantity < items.total && onChange({id : items.id, quantity: items.quantity+=1, event : true})
                            
                            }} className='hover:scale-[1.2] text-[0.9rem] duration-[0.3s]'>
                            <FontAwesomeIcon icon={faPlusCircle}/>
                        </button>
                        </div>
                    </div>
                </div>
                <div className='flex items-end'>
                    <button onClick={() => {
                        onChange({id : items.id, quantity: items.quantity=0, event : false})
                    }} className='text-[0.8rem] hover:scale-[1.2] duration-[0.3s]'>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </div>
            </motion.div>
        </AnimatePresence> 
    ))

  return (
    <div className=' h-[86vh] overflow-scroll hide-scrollbar z-[2] sm:z-0 shadow-sm shadow-black sm:shadow-white  w-[380px] poppins top-[5em] rounded-[10px] fixed right-0 bg-transparent p-[1em] text-[--nav] flex flex-col gap-[.5em]'>
            <h2 className='text-[--nav] font-bold'>Customer Information</h2>
        <div className='bg-[--nav] p-[.5em] rounded-[8px]'>
            <p className='text-[0.8rem] text-[--black]'>Customer name</p>
            <h3 className='font-bold text-[--black]'>John Doe</h3>
        </div>
        <div className='bg-[--nav] p-[.5em] rounded-[8px] flex justify-between items-center'>
            <div >
                <p className='text-[0.8rem] text-[--black]'>Number of persons</p>
                <h3 className='text-[--black]'>12 persons per table</h3>
            </div>
            <div className='flex gap-[1em] items-center'>
                <button>
                    <FontAwesomeIcon icon={faMinus} className='p-[.2em] bg-[--nav] rounded-[50%]'/>
                </button>
                <p>12</p>
                <button>
                    <FontAwesomeIcon icon={faPlusCircle}/>
                </button>
            </div>
        </div>
        <div className='flex justify-between'>
            <h2 className='text-[--black] font-bold'>Current Order</h2>
            <p className='text-[--black] text-[0.8rem]'>{selectedItems.filter(items => items.quantity != 0).length} Item</p>
        </div>
        <div className='sm:max-h-[300px] max-h-[400px] rounded-[10px] bg-[--bg] p-[.5em] '>
            <div className='flex flex-col gap-[.5em] overflow-scroll h-full' ref={cartBox}>
                {listItems}
            </div>
        </div>
        <h2>Payment Summary</h2>
        <ul className='flex flex-col gap-1'>
            <li className='flex justify-between text-[0.8rem] text-[--nav]'><p>Subtotal</p><p><FontAwesomeIcon icon={faNairaSign}/>{selectedItems.filter(items => items.quantity != 0).length > 0 ? total : "0.00"}</p></li>
            <li className='flex justify-between text-[0.8rem] text-[--nav]'><p>Discount Sales</p><p><FontAwesomeIcon icon={faNairaSign}/>{"0.00"}</p></li>
            {/* <li className='flex justify-between text-[0.8rem] text-[--nav]'><p>Total tax</p><p><FontAwesomeIcon icon={faNairaSign}/>{selectedItems.filter(items => items.quantity != 0).length > 0 ? total : "0.00"}</p></li> */}
            <hr  className='bg-[--black] border-[--nav]'/>
            <li className='flex justify-between text-[0.8rem] text-[--nav]'><p>Total</p><p><FontAwesomeIcon icon={faNairaSign}/>{selectedItems.filter(items => items.quantity != 0).length > 0 ? total : "0.00"}</p></li>
        </ul>
        <button onClick={() => {
            if(selectedItems.filter(items => items.quantity != 0).length > 0) {
                onOrder(true)
            }
        }} className='bg-[--black] p-[.5em] text-[--nav] rounded-[2em]'>Order Now</button>
    </div>
  )
}

export default CartBar
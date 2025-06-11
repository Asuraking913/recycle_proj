import { faCheck, faNairaSign, faShoppingCart, faSpinner, faTimes, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import PrevComp from './previewComponents'
import handleOrders from '../../utils/order/handleOrders'
import { useInterval } from 'react-use'
import { motion, AnimatePresence } from 'framer-motion'
import fetchFoods from '../../utils/order/fetchProducts'

function OrderPrev({items, onOrder, onSelecteItems, onCartBar, onFood, params}) {

    const [error, setError] = useState("")


    const listItems = items.filter(items => items.quantity != 0).map((items, i) => <PrevComp key={i} {...items} />)
    const total = items.reverse().filter(item => item.quantity != 0).reduce((value, item) => {
        if(item.quantity > 1) {
            let newValue = value + Math.floor(item.price) * item.quantity
            return newValue
        }

        let newValue = value + Math.floor(item.price) 

        return newValue
    }, 0)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(false)

    useInterval(() => {
        setError(prev => prev = "")
    }, 5000, [error])

    useEffect(() => {
        if(status) {
            onSelecteItems([])
            if(window.innerWidth < 640) {
            onCartBar(prev => !prev)
        }
            onFood(prev => !prev)
            // fetchFoods(onFood)
        }
    }, [status])


  return (
    <section className='w-full z-[30] h-screen fixed bg-[--blackv] flex items-center justify-center'>

        <AnimatePresence>
            {error && <motion.p
            initial={{
                x: "4em", 
                opacity: 0
            }}

            transition={{
                duration: .5
            }}

            animate={{
                x: 0, 
                opacity: 1
            }}
             className='fixed bg-[--nav] flex items-center justify-between gap-[1em] w-[300px] shadow-sm shadow-[--black] top-[15%] poppins text-[--black] rounded-[10px] right-[2em] p-[1.5em]'>
                {error.msg}
                <FontAwesomeIcon className={`${error.status ? "text-green-500" : "text-red-500" }  text-[--black] text-xl cursor-pointer`} onClick={() => setError("")} icon={error.status ? faCheckCircle : faTimesCircle}/>
            </motion.p>}
        </AnimatePresence>

        <div className='sm:w-[30%] w-[90%] sm:px-0 max-h-[80vh] bg-[--nav] mt-[2em] rounded-[5px] flex flex-col justify-between pb-[10px]'>
            <div className='w-full  p-[1em] items-center border-b-[1.5px] border-[--black] flex justify-between'>
                <FontAwesomeIcon className='text-xl text-[--black]' icon={faShoppingCart}/>
                <button onClick={() => onOrder(false)}>
                    <FontAwesomeIcon className='text-[1.4rem] text-[--black]' icon={faTimes}/>
                </button>   
            </div>
            <div className='flex flex-col gap-[10px] py-[10px] h-[70%] overflow-scroll hide-scrollbar px-[1em]'>
                {   status ?

                    <div className='flex flex-col items-center gap-[10px]'>
                        <h2 className='text-center ubun text-[1.5rem] font-bold'>Your Order is being processed</h2>
                        <p className='text-center text-green-600 text-[1.5rem]'><FontAwesomeIcon icon={faCheckCircle}/></p>
                        <button onClick={() => onOrder(false)} className='p-[10px] sm:hover:w-[95%] duration-[0.5s] bg-[--black] w-full text-[--nav] poppins sm:text-[1.2rem] rounded-[5px]'>
                            Go to Payment Portal
                        </button>
                    </div>

                    :

                    listItems
                }
            </div>
            {
                status ? "" : <div className='px-[1em] flex justify-center'>
                <button onClick={() => handleOrders(items, setLoading, setError, setStatus)} className='p-[10px] sm:hover:w-[95%] duration-[0.5s] bg-[--black] w-full text-[--nav] poppins sm:text-[1.2rem] rounded-[5px]'>{!loading && "Pay"} <span className='text-[1rem]'>{loading ? <FontAwesomeIcon icon={faSpinner} className='text-xl text-[--nav] animate-spin'/>  : <FontAwesomeIcon className='pl-[1em]' icon={faNairaSign}/>} {!loading && total}</span></button>
            </div>
            }
        </div>
    </section>
  )
}

export default OrderPrev
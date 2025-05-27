import React, { useEffect, useRef, useState } from 'react'
import Nav from '../components/primary-comp/nav'
import SideBar from '../components/primary-comp/sidebar'
import OrderCart from '../components/cartOrder/orderCart'
import CartBar from '../components/cartOrder/cartBar'
import cart from "../assets/cart.png"
import times from "../assets/times.png"
import {motion, AnimatePresence, useInView} from "framer-motion"
import Axios from '../utils/Axios'
import fetchFoods from '../utils/order/fetchProducts'
import OrderPrev from '../components/cartOrder/orderPreview'
import { QueryClient, useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useInterval } from 'react-use'
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom'

function OrderPage() {

  const query = useQueryClient()
  const navigate = useNavigate()

  const [selectedItems, setSelectedItems] = useState([
])

const [duplicate, setDuplicate] = useState([])
const [showCart, setShowCart] = useState(false)
const [deleted, setDeleted] = useState([])
const [order, setOrder] = useState(false)
const [error, setError] = useState("")
const [foodChange, setFoodChange] = useState(false)
const loadingRef = useRef(null)
const inView = useInView(loadingRef)
const [fullCount, setFullCount] = useState(0)

// Modified states
const [buying, setBuying] = useState(false);

const [change, setChange] = useState(0)

useEffect(() => {
  selectedItems.forEach(items => {
    if(items.id == change.id) {
      items.quantity = change.quantity
    }
  })
}, [change])

useEffect(() => {
  query.setQueryData(['products'], {pages : [], pageParam : []})
  fetchNextPage()
}, [])

const [nav, setNav] = useState(false)
const [cartBar, setCartBar] = useState(false)

  let { data, fetchNextPage, isFetchingNextPage, error : productError } = useInfiniteQuery({
    queryKey : ['products'], 
    queryFn: async ({pageParam = 1}) => {
      
      if(pageParam && pageParam) {
        try {
          const response = await Axios.get(`api/product/?page=${pageParam}`)
          if(response.status === 200) {
            setFullCount(prev => prev = response.data.count)
            // console.log(response.data.results)
            return response.data.results
          }
          
        } catch (error) {
          setError("An error Occured")
        }

      }
      
    }, 

    getNextPageParam: (lastPage, page) => {
      return Math.round(page.flatMap(pages => pages ).length / 10 + 1)
    }
  })

  const foodList = data?.pages?.flatMap(pages => pages).map((item, i) => (
   item && <OrderCart  onError={setError} key={i} name={item.name} change={change} deleted={deleted} onDelete={setDeleted} quantity={item.available_stock} id={item.id} onDuplicate={setDuplicate} img={item.image} price={item.price} onSelect={setSelectedItems} selected={selectedItems} descrip={item.descrip}/>
))

useEffect(() => {
  query.setQueryData(['products'], { pages : [], pageParam : [] })
  fetchNextPage()
}, [foodChange])

useEffect(() => {
  if(inView && foodList.length < fullCount) {
    fetchNextPage()
  }
}, [inView])

useInterval(() => {
  setError(prev => prev = "")
}, 4000, [error])

  return (
    <>
        {order && <OrderPrev onFood={setFoodChange} onCartBar={setCartBar} onSelecteItems={setSelectedItems} onOrder={setOrder} items={selectedItems.filter(item => !(deleted.includes(item.id)))}/>}

      <div className={`${ order  && "blur"}`}>
        {error && 
        <motion.p
        initial={{
          x: "9em", 
        }}

        animate={{
          x: 0
        }}
         className='fixed bg-[--nav] z-[20] shadow-sm shadow-[--black] top-[4em] rounded-[5px] right-[10px] p-[20px] sm:p-[1.5em] poppins flex items-center gap-[10px]'>
          {error}
          <FontAwesomeIcon icon={faTimesCircle} className='text-red-500 text-xl'/>
          </motion.p>}
        {/* Preview */}
          <Nav onNav={setNav} nav={nav}/>
          <div onClick={() => selectedItems.reverse().filter(item => !(deleted.includes(item.id))).length > 0  && setCartBar(!cartBar)} className={`fixed ${!cartBar ? 'top-[80%]' : 'top-[12%]' } bg-[--bg] p-2 sm:hidden shadow-md shadow-black rounded-[50%] right-[1em] z-[4]`}>
            <div className='relative'>
              <p className='absolute top-[-15px] right-[-5px] bg-red-500 px-[.5em] rounded-[50%] text-white'>{selectedItems.reverse().filter(item => item.quantity != 0).length}</p>
              <img src={!cartBar ? cart : times} className='w-[30px] h-[30px]' alt="" />
            </div>
          </div>
          <section className='flex '>
      
            <div className='hidden sm:block z-[20]'>
              <SideBar />
            </div>
            {nav &&
                <SideBar nav={nav}/>
            }
            <div className='text-[--bdcolor] w-full  sm:block sm:w-[100%]  min-h-[100vh] mt-[4em] sm:mt-[6em] min-[300px]: ml-[.2em] sm:ml-[6em]'>
              <div className='flex items-center justify-between py-[10px] pr-[50px]'>
                <h1 className='sm:text-2xl text-xl sm:text-left text-center font-bold poppins py-[.5em] text-[--nav]'>
                    
                    Inventory Available For Sale
                
                </h1>

                <button onClick={() => {

                  if(selectedItems.filter(item => !(deleted.includes(item.id))).length > 0) {

                    const username = localStorage.getItem('username');
                    if (username === null) {
                      console.log(username)
                      console.log(localStorage)
                      // navigate("/authenticate")
                      return
                    };

                    setShowCart(true)
                    return
                  }

                  setError("Your cart is empty")

                }} className='text-2xl hover:scale-105 duration-[0.5s] p-[10px] bg-[--nav] rounded-full shadow-sm shadow-white'>
                  <MdOutlineShoppingCart />
                </button>
              </div>
              
              <div className='flex sm:w-[100%] flex-wrap gap-[.4em] sm:gap-2' >
                {foodList}
              </div>
              <div ref={loadingRef}  className=' text-center py-[2em]'>
                {isFetchingNextPage && <FontAwesomeIcon icon={faSpinner} className='text-[3rem] sm:mr-[4em] animate-spin'/>}
              </div>
            </div>
            <AnimatePresence>
            {cartBar &&
              <motion.div
              key={cartBar}
              initial={{
                x: "50em",
                backgroundColor: "var(--black)"
              }}
              transition={{
                duration: .9
              }}
              whileInView={{
                backgroundColor: "rgba(0,0,0,0.53)"
              }}
              animate={{
                x:0,
                backgroundColor: "var(--black)"
              }}
              exit={{
                x: "50em",
                backgroundColor: "var(--black)"
              }}
               className='w-full h-full fixed right-0 z-[2] bg-[#00000088]'>
                <CartBar onOrder={setOrder}  selectedItems={selectedItems.reverse().filter(item => !(deleted.includes(item.id)))} onDelete={setDeleted} onChange={setChange} change={change}/>
              </motion.div>
            }
            </AnimatePresence>
            {

              showCart

              && 

              <section className='fixed top-0 left-0 flex justify-center items-center backdrop-blur-sm bg-[--blackv] bg-opacity-50 w-full h-full z-[2]'>
                <div className=''>
                            <CartBar onShowCart={setShowCart} onOrder={setOrder}  selectedItems={selectedItems.reverse().filter(item => !(deleted.includes(item.id)))} onDelete={setDeleted} onChange={setChange} change={change}/>
                          </div>
              </section>
            }
          </section>
      </div>
    </>
  )
}

export default OrderPage
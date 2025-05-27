import React, { useContext, useEffect, useRef } from 'react'
import Nav from '../components/primary-comp/nav'
import SideBar from '../components/primary-comp/sidebar'
import { useState } from 'react'
import { faCartShopping, faDollar, faNairaSign, faSpinner } from '@fortawesome/free-solid-svg-icons'
import TabBlock from '../components/dashboard/tabBlock'
import Orders from '../components/dashboard/order'
import CardForm from '../components/dashboard/cardForm'
import handleUpload from '../utils/tabswitch'
import { handleOrder, handlePayment, handleReceipts } from '../utils/tabswitch'
import Upload from '../components/dashboard/upload'
import Loading from '../components/primary-comp/loading'
import Receipts from '../components/dashboard/receipts'
import AuthContext from '../utils/provider'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useInView, motion } from 'framer-motion'
import { useInfiniteQuery } from '@tanstack/react-query'
import Axios from '../utils/Axios'

function Dashboard() {

    const admin = sessionStorage.getItem('admin')
    const {isAuthenticated, adminUser, setIsAuthenticated} = useContext(AuthContext)
    const [clicked, setClicked] = useState("orders") 
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const value = adminUser ? 9 : 2
    const [complete, setComplete] = useState(false)
    const [fullCount, setFullCount] = useState(0)

    useEffect(() => {
        let admin = sessionStorage.getItem('admin');
        console.log(admin)
        if(!(admin === false)) {
            setClicked(prev => prev = "orders")
            return
        }
        setClicked(prev => prev = "receipts")
        console.log(clicked)
        console.log('e')
    }, [])

    const [nav, setNav] = useState(false)
    const [tabObj, setTabObj] = useState([
        { 
            header : "Balance",
            amount : 62456,
            icon : faNairaSign
        }, 
        
        {
            header : "Purchases",
            amount : 95,
            icon : faDollar
        }, 
        {
            header : "total Orders",
            amount : 100,
            icon : faCartShopping
        }, 
        
    ])

    const { data : data1, error: error1, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey : ['orders'], 
        queryFn : async ({ pageParam = 1   }) => {
            try{
                const response = await Axios.get(`api/order/?page=${pageParam}`)
                if(response.status === 401) {
                    sessionStorage.clear()
                    navigate("/authenticate")
                    setIsAuthenticated(false)
                }
                if(response.status === 200) {
                    if(response.data.data .length <= 0) {
                        setComplete(prev => !prev)
                    }
                    // console.log(response.data.data)
                    const object = response.data.data.map(item => ({
                        orderId : item.orderId, 
                        date : item.date, 
                        items : item.products
                    }))
                    return object
                }

                setError("Error Fetching data")
                
            }
            catch(error) {
                // console.log(error)
                sessionStorage.clear()
                navigate("/authenticate")
                setIsAuthenticated(false)
            }
        }, 
        
        getNextPageParam: (lastpage, pages) => {
            // if(Math.round(pages.flatMap(pages => pages ).leng)
            return Math.round(pages.flatMap(pages => pages ).length / 10 + 1)
        }
    })
   
    const [orders, setOrders] = useState([
    ])
    const [receipts, setReceipts] = useState([
    ])

    
    const receiptList = receipts.map((items, i) => <Receipts key={i} {...items}/>)
    const posts = data1?.pages.flatMap((page) => page)
    const previousPost = useRef(null)
    const lastPost = useRef(null)
    const inView = useInView(lastPost)

    
    useEffect(() => {
        
        if(inView && !complete) {
            fetchNextPage()
        }

    }, [inView])

    const tabList = tabObj.filter(items => items.header).map((item, i) => <TabBlock orders={posts ? posts?.length : ""} key={i} receipts={receipts.length} icon={item.icon} header={item.header} number={item?.amount}/>)


  return (
    <div>
        <Nav onNav={setNav} nav={nav}/>
        {nav && <SideBar nav={nav} />}
        <div className='hidden sm:block z-[20]'>
            <SideBar />
        </div>

        <section className=' sm:pl-[--pdx] py-[.5em] pt-[4em] flex sm:flex-row flex-col gap-[.5em] items-center'>
            <div className={`m-[10px] ${adminUser ? "sm:w-[50%]" :"sm:w-[63%]"}`}>
                <div className='  '>
                    {!adminUser && <h1 className='text-[2rem] text-[--nav] poppins font-bold'>Welcome to Your DashBoard</h1>}
                    {adminUser && <h1 className='text-[2rem] poppins text-[--nav] font-bold capitalize'>Welcome to the Admin panel</h1>}
                    <p className='poppins text-[--nav] text-[0.9rem]'>View your recent transactions and activity</p>
                </div>
            </div>

            {/* Tab Block */}
            {/*<div className={`flex gap-[0em] ml-[1em] sm:pl-0 ${ adminUser ?  "sm:w-[50%]" : "w-auto"} sm:flex-nowrap flex-wrap sm:px-0 px-[1em] bg-[--nav] justify-between mt-[10px] rounded-[5px] mr-[10px]`}>
                {tabList}
            </div>*/}
            
        </section>
        <nav className='sm:px-[--pdx] px-[1em]'>
            <ul className='flex mt-[1em] sm:w-auto w-[90%] sm:justify-normal justify-between ubun flex-wrap'>
                {adminUser && <li ><button onClick={() => handleOrder(setClicked)}  className={`p-[.5em] ${clicked === 'orders' ? " sm:hover:bg-[--black] bg-[--nav] text-[--black] sm:hover:text-[--nav]"  : " sm:hover:bg-[--nav] bg-[--black] text-[--nav] "} duration-[0.2s] px-[1em]  sm:hover:text-[--black] sm:hover:shadow-md shadow-[--black]`}>Pending Orders</button></li>}
                {adminUser && <li ><button onClick={() => handleUpload(setClicked)}  className={`p-[.5em] ${clicked === 'upload' ? " sm:hover:bg-[--black] bg-[--nav] text-[--black] sm:hover:text-[--nav]"  : " sm:hover:bg-[--nav] bg-[--black] text-[--nav] "} duration-[0.2s] px-[1em]  sm:hover:text-[--black] sm:hover:shadow-md shadow-[--black]`}>Upload Item</button></li>}
                {!adminUser && <li ><button onClick={() => handleReceipts(setClicked)}  className={`p-[.5em] ${clicked === 'receipts' ? " sm:hover:bg-[--nav] bg-[--nav] sm:hover:text-[--black] text-[--black]"  : " sm:hover:bg-[--nav] bg-[--black] text-[--nav] "} duration-[0.2s] px-[1em]  sm:hover:text-[--black] sm:hover:shadow-md shadow-[--black]`}>Receipts</button></li>}
                {!adminUser && <li ><button onClick={() => handlePayment(setClicked)}  className={`p-[.5em] ${clicked === 'payments' ? " sm:hover:bg-[--nav] bg-[--nav] sm:hover:text-[--black] text-[--black]"  : " sm:hover:bg-[--nav] bg-[--black] text-[--nav] "} duration-[0.2s] px-[1em]  sm:hover:text-[--black] sm:hover:shadow-md shadow-[--black]`}>Payment methods</button></li>}
            </ul>
        </nav>
        <section className='sm:px-[--pdx] px-[1em]'>
            {
                clicked === "orders" && 
                <div className='flex flex-wrap gap-[1em] py-[1em] relative'>
                    
                    {
                        posts?.map((items, i) =>(
                            <span key={i} ref={i === posts.length - 1 ? lastPost  : previousPost}>
                                {items && <Orders items={items.items} orderId={items.orderId} date={items.date}/>}
                            </span>)
                        )
                    }
                </div>
            }

            {clicked === "payments" &&
                <div className='w-[100%] py-[1em]'>
                    <CardForm />
                </div>
            }
            {
               clicked === "upload" && <Upload />
            }
            {
               clicked === "receipts" && 
            <div className='flex flex-wrap sm:flex-col py-[1em]'>
                <h2 className='poppins text-[1.2rem] font-bold m-[10px]'>Receipts</h2>
                <div className='flex flex-wrap gap-[1em]'>
                    {
                        loading &&

                        receiptList.length  === 0 ? 

                        <Loading /> 

                        : 
                            posts?.map((items, i) =>(
                                <span key={i} ref={i === posts.length - 1 ? lastPost  : previousPost}>
                                    {items && <Receipts items={items.items} orderId={items.orderId} date={items.date}/>}
                                </span>)
                            )
                    }
                </div>
                
            </div>
            }
            <div ref={lastPost} className='p-[1em] text-center relative pb-[2em]'>
                {(isFetchingNextPage && clicked === "orders" || isFetchingNextPage && clicked === "receipts" )  && <FontAwesomeIcon icon={faSpinner} className='text-[--black] absolute top-[-10px] text-[3rem] animate-spin'/>}
            </div>
        </section>
    </div>
  )
}

export default Dashboard
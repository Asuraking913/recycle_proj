import React, { useEffect, useRef } from 'react'
import Nav from '../components/primary-comp/nav'
import { easeInOut, motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import SideBar from '../components/primary-comp/sidebar'
import Foot from '../components/primary-comp/foot'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faSpinner } from '@fortawesome/free-solid-svg-icons'
import img from "../assets/recycle.png"
import img1 from "../assets/recycle1.png"
import img2 from "../assets/recycle-clean.png"
import img3 from "../assets/recycle-invent.png"
import img4 from "../assets/recycle-help.png"
import img5 from "../assets/recycle1.png"

import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Pagination, Autoplay} from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import MenuList from '../components/landing/menuList'
import fetchFoods from '../utils/order/fetchProducts'


function Landing() {

    const navigate = useNavigate()
    const [nav, setNav] = useState(false)
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 640)
    const ref = useRef(null)
    const inView = useInView(ref, {once : true})
    
    const [objList, setObjList] = useState([
      {
        img: img2,
        name: "Veggies goodness", 
        text: "Hotdog cardboard paranoid computer wristwatch decay geodesic corrupted kanji refrigerator tattoo receding dead. "
      },
      {
        img: img3,
        name: "Veggies goodness", 
        text: "Hotdog cardboard paranoid computer wristwatch decay geodesic corrupted kanji refrigerator tattoo receding dead. "
      },
      {
        img: img4,
        name: "Veggies goodness", 
        text: "Hotdog cardboard paranoid computer wristwatch decay geodesic corrupted kanji refrigerator tattoo receding dead. "
      },
      {
        img: img5,
        name: "Veggies goodness", 
        text: "Hotdog cardboard paranoid computer wristwatch decay geodesic corrupted kanji refrigerator tattoo receding dead. "
      },
    ]) 

    const menuSlide = objList.slice(0, 4).map((items, i) => <MenuList text={items.text} name={items.name} img={items.img}/>)

    useEffect(() => {

      const handleResize = () => {
        setIsMobileView(window.innerWidth < 640);
      };
  
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <div>
        <Nav onNav={setNav} nav={nav}/>
        {nav && <SideBar nav={nav} />}
        <div className='hidden sm:block z-[20]'>
            <SideBar />
        </div>
        

        <section className='h-screen linear-grad flex items-center px-[1em] sm:px-[6em] justify-between'>
          <div className='sm:w-[90%] flex flex-col gap-[4em]'>
            <motion.div
            initial={{
              x: "-40px",
              opacity: 0
            }}

            transition={{
              duration: 1
            }}

            animate={{
              x: 0,
              opacity: [0, 0.1, 0.3, 0.5, 0.7, 1]
            }}

             className='flex flex-col'>
              <h1 className='sm:text-[3.4rem] text-[2.4em] text-[--nav] capitalize ubun'>Fast & Reliable Waste Disposal <span className='poppins font-bold '>Service You Can Trust </span></h1>
              <p className='poppins text-[1.2rem] text-[--nav]'>
                Take the hassle out of waste, experience clean, efficient, and eco-friendly management with us!
              </p>
            </motion.div>

            <motion.button
              initial={{
                x: "-300px",
                opacity: 0
              }}

              transition={{
                duration: .5
              }}

              whileHover={{
                x: "2em"
              }}

              animate={{
                x: 0,
                opacity: [0, 0.1, 0.3, 0.5, 0.7, 1]
              }}

              onClick={() => navigate("/menu")}
             className='flex'>
              <div className='linear-grad rounded-l-[5px] shadow-md shadow-white flex items-center justify-center w-[40px] h-[40px]  text-2xl text-[--nav]'>
                <FontAwesomeIcon icon={faAngleRight}/>
              </div>
              <div className='bg-[--nav] rounded-r-[5px] shadow-md shadow-black capitalize text-[1.1rem] poppins h-[40px] flex items-center justify-center px-[.5em]'>
                Go to Inventory
              </div>
            </motion.button>

          </div>
          <div className='w-[50%] h-auto hidden sm:flex items-center justify-end  relative'>
              <div className=' h-[500px] w-[500px] absolute top-[4em] z-[-2] bg-[--blackv] rounded-[50%] blur-[90px] bg-opacity-10'>

              </div>
              <img className='' src={img} alt="" />
          </div>
        </section>
        <section className='sm:px-[6em] px-[1em] sm:py-[2em] flex flex-col gap-[50px]  flex flex-col justify-center'>

          <div className='flex justify-between'>
            <h2 className='uppercase text-[--nav] poppins font-bold text-[1.5rem] sm:text-[2rem] text-start'>Our Services
            </h2>

            <p className='w-[20%] text-[--nav] poppins'>
              We collect, sort, clean, recycle, protect, care.
            </p>
          </div>
          <div className='menu  sm:px-[2em]'>
              {
                menuSlide.length <= 0 ?

                <div className='w-full text-center text-[--nav] py-[2em] animate-spin'>
                  <FontAwesomeIcon icon={faSpinner} className='text-[4rem]'/>
                </div>

                :

              //   <Swiper
              // modules={[Pagination, Navigation, Autoplay]}
              // spaceBetween={1}
              // loop={true}
              // autoplay={{delay : 3000}}
              // slidesPerView={isMobileView ? 3 : 7}
              // navigation = {true}
              // pagination = {{clickable: true}}
              // >
              //   {menuSlide}
              // </Swiper>

                <div className='flex w-[100%] justify-between gap-[10px] p-[10px]'>

                 {

                  menuSlide

                }

                </div>

              }
          </div>
        </section>
        <section className='sm:px'>
          <div ref={ref} className='flex sm:flex-row justify-between gap-[2em] items-center'>
            <motion.div
              style={{
                y: !inView ? "4em" : "0",
                transition: "1s"
              }}
  
             className='sm:w-[100%] flex justify-center  h-[450px] rounded-[5px] p-[.5em]'>
              <img src={img} alt="" className='w-[400px] h-[400px]'/>
            </motion.div>

              <div className='w-[100%]'>
                  <h2 className='sm:text-[2rem] text-[1.5rem] font-bold py-[1em] text-[--nav] text-start poppins uppercase'>Who We are?
                  </h2>

                  <p className='text-[--nav] poppins w-[85%]'>
                    Recycle market frontline clean-tech engine circular shrine zero-waste. We buy waste, process materials, decode trash into value—recycled, reshaped, reborn. Solar-forged plastics, eco-alloy scrap, glass reimagined in carbon-light hubs. Urban renewal crews, clean grid artisans, waste hackers neutralizing decay in green zones. City cores detoxed, communities upgraded, landfill futures denied. Circular economy frontline—every can, cord, crate re-looped. Reclaim street debris, elevate waste into market-grade goods. Zero leakage, full cycle, decentralized collection arrays—clean streets, clean skies, clean tomorrow. Recycled goods to new owners, every unit a story of rebirth. Powered by ethics, scaled by necessity, driven by planet-first logic.                  </p>

                </div>
          </div>
        </section>
        <section className='px-[1em] sm:px-[--pdx] py-[2em]'>
          <div className='flex justify-center'>
            <form action="" className='flex flex-col w-[70%] px-[8em] gap-[20px] items-center'>
                
                <h2 className='sm:text-[2rem] text-[1.5rem] text-[--nav] poppins text-center'>Request Quote</h2>

                <p className='poppins text-[--nav] text-center'>Ablative semiotics tank-traps jeans convenience store city wonton soup singularity car knife chrome sub-orbital Legba.
                </p>

                <div className='flex justify-between gap-[50px]'>
                  <div className='flex items-center w-full gap-[10px] justify-between text-[--nav] poppins'>
                    <label htmlFor="" className='text-nowrap'>First Name</label>
                    <input type="text"className='text-[--black] p-[10px] w-[100%] rounded-[5px]'/>
                  </div>
                  <div className='flex items-center gap-[10px] w-full justify-between text-[--nav] poppins'>
                    <label htmlFor="" className='text-nowrap'>Second Name</label>
                    <input type="text"className='text-[--black] w-[100%] p-[10px] rounded-[5px]'/>
                  </div>

                </div>

                <div className='flex flex-col  w-full items-start text-[--nav] poppins'>
                  <label htmlFor="email">Email</label>
                  <input type="email" className='text-[--black] p-[10px] rounded-[5px] w-full'/>
                </div>
                <div className='flex flex-col  w-full items-start text-[--nav] poppins'>
                  <label htmlFor="email">Phone Number</label>
                  <input type="tel" className='text-[--black] p-[10px] rounded-[5px] w-full'/>
                </div>
                <div className='flex flex-col  w-full items-start text-[--nav] poppins'>
                  <label htmlFor="email">Phone Number</label>
                  <textarea name="message" id="message" className='w-full rounded-[5px]'  rows={8}></textarea>
                </div>

                <button className='p-[10px] linear-grad shadow-md shadow-white sm:hover:scale-105 duration-[0.5s]  text-[--nav] capitalize font-semibold poppins w-full rounded-[5px]' type='submit'>
                  submit
                </button>
            </form>
          </div>
        </section>
        <section ref={ref} className=' sm:gap-0 gap-[4em]  flex sm:flex-row flex-col-reverse justify-between px-[1em] sm:px-[--pdx] items-center py-[2em]'>
          <motion.div
          style={{
            x: !inView ? "-9em" : "0", 
            transition: "1s"
            // opacity: !inView ? [0, 0.1, 0.3, 0.5, 0.7, 1] : 0
          }}

           className='w-[50%] flex  items-center justify-center relative'>
              <div className=' sm:h-[500px] h-[240px] w-[240px] sm:w-[500px] absolute top-[2em] z-[-2] bg-[--blackv] rounded-[50%] blur-[90px] bg-opacity-10'>

              </div>
              <img src={img1} className='sm:h-[500px]' alt="" />
          </motion.div>
          <motion.div
          initial={{
            x: "2em",
            opacity: 0
          }}

          transition={{
            duration: .9
          }}

          whileInView={{
            x: 0,
            opacity: 1
          }}
           className='sm:w-[50%] w-[90%] flex flex-col sm:h-auto h-full gap-[20px]'>
            <h3 className='sm:text-[2rem] text-[1.5rem] poppins font-bold poppins text-[--nav]  uppercase'>Our Location</h3>
              <p className='poppins text-[0.9rem] text-[--nav]'>
                Prince Abubakar Audu University, Kogi State—core ops zone. Embedded in a green-academic cradle, logistics optimized, access seamless. Clean energy grids hum beside lecture halls, knowledge flows with waste streams. Eco-hub synergy: where minds meet matter, where waste finds rebirth. Local waste channels feed our reclaim systems—zero-mile sourcing, real-time sorting. Conducive terrain, campus innovation, youth-driven cycles. Trees watch our bins; students walk our mission. Engineered silence, clean air corridors, lab-born sustainability. Strategic positioning amplifies impact—education meets execution. One location, infinite renewals. Our base isn't just where we operate—it’s where the future gets processed.</p>
              <motion.button
                whileHover={{
                  x: '2em'
                }}
                
                transition={{
                  duration: .5
                }}
               className='flex'>
                <div className='bg-[--black] flex items-center justify-center w-[40px] h-[40px]  text-2xl text-[--nav] shadow-md shadow-white rounded-l-[5px]'>
                  <FontAwesomeIcon icon={faAngleRight}/>
                </div>
                <div onClick={() => navigate("/authenticate")} className='bg-[--nav] capitalize text-[1.1rem] poppins h-[40px] flex items-center justify-center px-[.5em] rounded-r-[5px]'>
                   Log in
                </div>
            </motion.button>
          </motion.div>
        </section>
        <Foot />
        
    </div>
  )
}

export default Landing
import React, { useState } from 'react'
import logo1 from "../../assets/logo1.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useInterval } from 'react-use'
import { useNavigate } from 'react-router-dom'
import handleSumbit from '../../utils/authenticate'
import { motion } from 'framer-motion'

function SignUp({onLogin}) {

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password1, setPassword1] = useState("")
  const [toggle, setToggle] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  

  useInterval(() => {
    setError(prev => prev ="")
  }, 3000, [error])

  return (
    <div>
        <form action="#" onSubmit={(e) => handleSumbit(e, setError, onLogin, {email : email, password : password, password1 : password1, username : username}, setLoading)} className='w-full  flex flex-col gap-[10px] py-[1em] text-[--nav]'>

            <h2 className='text-xl poppins text-center font-bold text-[--nav]'>Create An Account</h2>

            {error && 
              <motion.p 
              initial={{
                x: "4em"
              }}
            
              animate={{
                x: 0
              }}

              exit={{
                x: "4em"
              }}
              className='poppins flex items-center gap-[1em] fixed top-[1em] bg-[--nav] p-[15px] rounded-[5px] poppins right-[10px] text-center'>
                {error}
                <FontAwesomeIcon icon={faTimesCircle} className='text-red-500'/>
              </motion.p>
              }

            <div className='flex gap-[10px]'>
                          <p className='poppins'>
                            <label htmlFor="email">Email Address</label>
                            <input className='block text-[--black] w-full p-[8px] rounded-[5px] shadow-sm border-[1.5px] border-[--blackv]' type="email" required onChange={(e) => setEmail(e.target.value)} name="email" id="email" />
                          </p>
                          <p className='poppins'>
                            <label htmlFor="email">Username</label>
                            <input className='block text-[--black] w-full p-[8px] rounded-[5px] shadow-sm border-[1.5px] border-[--blackv]' type="text" required onChange={(e) => setUsername(e.target.value)} name="email" id="email" />
                          </p>
            </div>
            <p className='relative'>
              <label htmlFor="password">Password</label>
              {password !== "" && <FontAwesomeIcon onClick={() => setToggle(!toggle)} icon={faEye} className='absolute top-[2.2em] right-[10px] cursor-pointer'/>}
              <input className='block text-[--black] w-full p-[8px] rounded-[5px] shadow-sm border-[1.5px] border-[--blackv]' type={toggle ? "password" : "text"} required onChange={(e) => setPassword(e.target.value)} name="password" id="password" />
            </p>
            <p className='relative'>
              <label htmlFor="password">Confirm Password</label>
              {password !== "" && <FontAwesomeIcon onClick={() => setToggle(!toggle)} icon={faEye} className='absolute top-[2.2em] right-[10px] cursor-pointer'/>}
              <input className='block text-[--black] w-full p-[8px] rounded-[5px] shadow-sm border-[1.5px] border-[--blackv]' type={toggle ? "password" : "text"} required onChange={(e) => setPassword1(e.target.value)} name="password1" id="password1" />
            </p>

            <button className='p-[10px] bg-[--black] rounded-[5px] shadow-sm shadow-[--blackv] text-[--nav] poppins font-bold' type="submit">{loading ? <FontAwesomeIcon className='text-2xl animate-spin' icon={faSpinner}/> : "Sign UP"}</button>

            <div className='flex justify-center border-b-[1px] border-[--black] relative mt-[2em]'>
              <p className='backdrop-blur-md  absolute top-[-8px] poppins border-transparent border-[0px] w-[100px] flex items-center justify-center'>or</p>
            </div>

            <span className='p-[10px] bg-[--nav] justify-center flex items-center rounded-[5px] shadow-sm shadow-[--blackv] text-[--black] poppins  mt-[1em]'>
              <div className='flex gap-[1em] capitalize'>
                <img src={logo1} className='w-[20px] h-[20px]' alt="" />
                <span>Continue with google</span>
              </div>
            </span>

            <span onClick={() => onLogin(true)} className='text-center text-[0.9rem] cursor-pointer poppins underline hover:opacity-80'>Log In?</span>

          </form>
    </div>
  )
}

export default SignUp
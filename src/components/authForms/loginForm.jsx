import React, { useEffect, useState } from 'react'
import logo1 from "../../assets/logo1.svg"
import { motion, AnimatePresence } from 'framer-motion'
import { handleLogin } from '../../utils/authenticate'
import { useNavigate } from 'react-router-dom'
import { useInterval } from 'react-use'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import AuthContext from '../../utils/provider'

function LoginForm({onLogin}) {

  const {
    userName, 
    setUserName, 
    setAdminUser, 
    setIsAuthenticated, 
    isAuthenticated,  
    adminUser
  } = useContext(AuthContext)

  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(false)

  useEffect(() => {
    result && navigate("/menu")
  }, [result])

  useInterval(() => {
    setError(prev => prev ="")
  }, 8000,[error])


  return (
    <form action="#" onSubmit={(e) => handleLogin({
        e : e,
        onError : setError, 
        onResult : setResult,
        data : {
          email : email, 
          password : password , 
        }, 

        onAdmin : setAdminUser,
        onAuth: setIsAuthenticated,

        onLoading : setLoading
      })} className='w-full flex flex-col gap-[1em] text-[--black]'>

        <h2 className='text-2xl poppins text-center font-bold text-[--nav]'>Login</h2>
        {error && 
        <motion.p 
        initial={{
          x: "4em"
        }}

        animate={{
          x: 0
        }}
        className='poppins flex items-center gap-[1em] fixed top-[1em] bg-[--nav] p-[15px] rounded-[5px] poppins right-[10px] text-center'>
          {error}
          <FontAwesomeIcon icon={faTimesCircle} className='text-red-500'/>
        </motion.p>
        }


            <p className='poppins'>
              <label htmlFor="email">Email Address</label>
              <input className='text-[--black] block border-[--blackv] border-[1.5px] w-full p-[8px] rounded-[5px]' type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" />
            </p>
            <p>
              <label htmlFor="password">Password</label>
              <input className='text-[--black] block border-[--blackv] border-[1.5px] w-full p-[8px] rounded-[5px]' type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" />
            </p>

            <div className='flex justify-end'>
              <span className='poppins text-[0.9rem] underline hover:opacity-80'>
                Forgotten Password?
              </span>
            </div>

            <button className='p-[10px] bg-[--black] rounded-[5px] shadow-sm shadow-[--blackv] text-[--nav] poppins font-bold' type="submit">{loading ? <FontAwesomeIcon icon={faSpinner} className='text-[1.4rem] text-[--nav] animate-spin'/> : "Log In"}</button>

            <div className='flex justify-center border-b-[1px] border-[--black] relative mt-[2em]'>
              <p className='backdrop-blur-md  absolute top-[-8px] poppins border-transparent border-[0px] w-[100px] flex items-center justify-center'>or</p>
            </div>

            <span onClick={() => window.location.href = ""} className='p-[10px] cursor-pointer bg-[--nav] justify-center flex items-center rounded-[5px] shadow-sm shadow-[--blackv] text-[--black] poppins  mt-[1em]'>
              <div className='flex gap-[1em] capitalize'>
                <img src={logo1} className='w-[20px] h-[20px]' alt="" />
                <span>Continue with google</span>
              </div>
            </span>
            <span onClick={() => onLogin(false)} className='text-center text-[0.9rem] poppins underline hover:opacity-80 cursor-pointer'>Sign Up?</span>
          </form>
  )
}

export default LoginForm
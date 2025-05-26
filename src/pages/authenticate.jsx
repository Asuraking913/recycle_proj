import React from 'react'
import logo from "../assets/logo.png"
import { useState } from 'react'  
import LoginForm from '../components/authForms/loginForm'
import SignUp from '../components/authForms/signupform'
import Nav from '../components/primary-comp/nav'

function Authenticate() {

  const [login, setLogin] = useState(true)


  return (
    <div className='h-screen w-full flex items-center justify-center flex-col gap-[10px]'>
      {/* <div className='absolute w-full h-full backdrop-blur-sm z-[-1] bg-[--blackv] blur-[90px] rounded-[50%]x'>
      </div>   */}
      <div className='flex gap-[5px] items-center '>
        <img src={logo} className='w-[40px] h-[40px]' alt="" />
        <h1 className='ubun text-[2rem] text-[--nav]'>Resto Kans</h1>
      </div>
      
      <div className='w-[400px]  min-h-[70vh] border-[1px] border-[--blackv] rounded-[5px] flex flex-col  items-center shadow-sm shadow-[--blackv]'>
        
          {
            login ?
            <div className='w-full px-[1em] py-[1em]'>
              <LoginForm onLogin={setLogin}/>
            </div>

          :

            <div className='w-full  py-[1em] h-full px-[1em]'>
              <SignUp onLogin={setLogin}/>
            </div>
          }
      </div>
    </div>
  )
}

export default Authenticate
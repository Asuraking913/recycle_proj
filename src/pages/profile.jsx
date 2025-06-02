import React, { useState, useEffect } from 'react';
import { User, Facebook, Twitter, Instagram, Plus, BarChart3, HelpCircle, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios';
import { faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    username: localStorage.getItem('username'),
    email: "example@gmail.com",
    password: 'bigbigworld23',
    contact : 'testcontact',
    aboutMe: 'I am Asen Krekmanov and I am dedicated UI/UX Designer from Sofia, Bulgaria.'
  });

  const [username, setUsername] = useState('asura')
  const [contact, setContact] = useState('234234234234')
  const [email, setEmail] = useState('example@gmail.com')
  const  [loading, setLoading] = useState(false)
  const [location, setLocation] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

   const navigate = useNavigate()

  const handleInputChange = (e) => {

    if(e.target) {}
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileDetails = async () => {
    let user_id = localStorage.getItem('user_id')
            setLoading(prev => true)

    let data = { 'user_id' : user_id, "location" : location }

    if(user_id) {
      const response = await Axios.post("/api/profile/", data)

      console.log(response.data)

      setUsername(prev => response.data.data.username)
      setEmail(prev => response.data.data.email)
      setContact(prev => response.data.data.contact)
      setSuccess(prev => "Updated)")

      return

    }

      setLoading(prev => false)
      setError('An Error occurred')

  }

  const fetchProfileDetails = async () => {

    let user_id = localStorage.getItem('user_id')

    const response = await Axios.get(`/api/profile?id=${user_id}`)

    if(response.status == 200) {
      setUsername(prev => response.data.data.username)
      setEmail(prev => response.data.data.email)
      setContact(prev => response.data.data.contact)
      setLocation(prev => response.data.data.location)
    }

  }

  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('username') === null)


	   useEffect(() =>{

        fetchProfileDetails()
        if (isLoggedIn) {
            navigate("/authenticate")
        }

    }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background cityscape effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-900 to-transparent"></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl flex overflow-hidden">
          {/* Left Panel - Profile Section */}
          <div className="w-1/3 bg-gray-50 p-8 border-r border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-8 ubun">PROFILE</h2>
            
            {/* Avatar Section */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-gray-500" />
                </div>
               {/* <button className="text-sm text-blue-600 hover:text-blue-800 font-medium poppins">
                  Upload Picture
                </button>*/}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="space-y-4">
              <button className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors w-full text-left">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Facebook className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm poppins">Add Facebook</span>
              </button>
              
              <button className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors w-full text-left">
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                  <Twitter className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm poppins">Add Twitter</span>
              </button>
              
              <button className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors w-full text-left">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm poppins">Add Instagram</span>
              </button>
              
              <button className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors w-full text-left">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm poppins">Add Google+</span>
              </button>
            </div>
          </div>

          {/* Right Panel - Form Section */}
          <div className="flex-1 flex">
            {/* Form Content */}
            <div className="flex-1 p-8">
              <div className="space-y-6">
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 poppins">
                    Username:
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full px-4 capitalize py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 poppins">
                    E-mail:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 poppins">
                    Contact:
                  </label>
                  <input
                    type="text"
                    name="contact"
                    onChange={e => setContact(e.target.value)}
                    value={contact}
                    placeholder='e.g 09123456734'
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />
                </div>

                {/* Repeat Password */}
                {/*<div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Repeat Password:
                  </label>
                  <input
                    type="password"
                    name="repeatPassword"
                    value={formData.repeatPassword}
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />
                </div>*/}

                {/* About Me */}
                <div>
                  <label className="block text-sm font-medium poppins text-gray-700 mb-2 poppins">
                    Location:
                  </label>
                  <textarea
                    name="aboutMe"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 resize-none"
                  />
                </div>

                {/* Update Button */}
                <div className="pt-4">
                  <button onClick={() => handleProfileDetails()} className="w-full poppins linear-grad hover:sm:scale-105 duration-[0.3s] text-white font-medium py-3 px-6 rounded-md transition-colors">

                    

                    {

                    loading 

                      ?

                      <i>
                          <FontAwesomeIcon icon={faSpinner} className='text-[1.4rem] text-[--nav] animate-spin'/>
                      </i>

                      :

                      <span>
                        Update Information
                      </span>
                    }

                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-16 linear-grad flex flex-col items-center py-8 space-y-6">
              <button className="p-2 text-white hover:bg-gray-800 rounded-md transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors">
                <BarChart3 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors mt-auto">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
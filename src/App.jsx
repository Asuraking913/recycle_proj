import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import OrderPage from './pages/order'
import Landing from './pages/landing'
import Dashboard from './pages/dashboard'
import Authenticate from './pages/authenticate'
import AuthContext, { AuthProvider } from './utils/provider'
import PrivateRoute from './utils/protectedRoutes'
import verifyToken from './utils/handleVerify'
import TestData from './components/text'
// import SideBar from './components/primary-comp/sidebar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Profile from "./pages/profile"

const queryClient = new QueryClient()

function App() {

  const {setAdminUser, setIsAuthenticated, adminUser} = useContext(AuthContext)

  useEffect(() => {
    document.title = "Recycle"
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className=''>
          <Router>
              <Routes>
                <Route path={"/"} element = {<Landing />}/>
                <Route path={"/menu"} element = {<OrderPage />}/>
                <Route path={"/authenticate"} element={<Authenticate />}/>
                <Route path={"/test"} element={<TestData />}/>
                <Route element={<PrivateRoute />}>
                  <Route path={"/dashboard"} element = {<Dashboard />}/>
                  <Route path={"/profile"} element = {<Profile />}/>
                </Route>
              </Routes>
          </Router>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./provider";
import { useEffect } from "react";
import verifyToken from "./handleVerify";

const PrivateRoute = () => {

    const {setAdminUser, setIsAuthenticated, adminUser, isAuthenticated} = useContext(AuthContext)

    let data = {
      onAdmin : setAdminUser, 
      onAuth : setIsAuthenticated, 
    }

    useEffect(() => {
      if(!adminUser) {
        verifyToken(data)
      }
    
    }, [])
    const authSession = sessionStorage.getItem('auth')

    // const auth = localStorage.getItem('access') ? true : false 


    return (
        
        isAuthenticated || authSession ? <Outlet /> : <Navigate to={"/authenticate"}/>
    )

}

export default PrivateRoute
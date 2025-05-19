import React, { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext({
    adminUser : null, 
    setAdminUser : () => {}, 
    userName : null, 
    setUserName : () => {}, 
    isAuthenticated : null, 
    setIsAuthenticated : () => {}
})

export const AuthProvider = ({children}) => {

    const [adminUser, setAdminUser] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userName, setUserName] = useState("")

    return <AuthContext.Provider value={{adminUser, setAdminUser, isAuthenticated, setIsAuthenticated, userName, setUserName}}>
        {children}
    </AuthContext.Provider>
    

}


export default AuthContext
import Axios from "./Axios"

const verifyToken = async (data) => {
    try {
        const response = await Axios.get("/api/auth/verify/user")
        if(response.status === 200) {
            data.onAdmin(response.data.is_admin)
            data.onAuth(t => t = true)
            
        }
    }
    catch(error) {
        if(error.response.status === 401) {
            data.OnAuth(t => t = false)
        }
    }
}

export default verifyToken
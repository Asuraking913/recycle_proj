import Axios from "../Axios"

const fetchreceipts = async (onLoading, onReceipts, onError) => {
    onLoading(true)
    try {
        const response = await Axios.get("/api/order/")
        if(response.status == 200) {
            const object = response.data.data.map(item => ({
                orderId : item.orderId, 
                date : item.date, 
                items : item.products
            }))
           onReceipts([...object])
        }
        onLoading(false)

    }
    catch(error) {
        onLoading(false)
        onError(401)
    }

}

export default fetchreceipts
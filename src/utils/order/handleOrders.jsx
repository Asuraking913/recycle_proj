import Axios from "../Axios"

const handleOrders = async (itemsList, onLoading, onError, onStatus) => {
        onLoading(true)
        const new_data = itemsList.filter(items => items.quantity != 0)
        const productIds = new_data.map(item => ({
            product : item.id, 
            quantity : item.quantity
        }))
        
    try{
            const response = await Axios.post("api/order/", {"order" : productIds})
            
            if(response.status == 201) {
                onLoading(false)
                onError({status : true, msg: "Order completed successfully"})
                onStatus(true)
                // receipts func
            }


        } catch(error) {
            console.log(error)
            onError({status : false, msg : "Some went wrong, contact the developer"})
            onLoading(false)
    }
}


export default handleOrders
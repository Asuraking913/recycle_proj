import Axios from "../Axios"

const fetchOrder = async (onOrder, onLoading, onError, data) => {
    onLoading(true)
    try{
        const response = await Axios.get(`api/order/?page=${data.page}`)
        // console.log(page)
        // console.log(response.data)
        if(response.status === 200) {
            const object = response.data.data.map(item => ({
                orderId : item.orderId, 
                date : item.date, 
                items : item.products
            }))

            if(object.length  <= 0) {
                onLoading(false)
                data.onComplete(true)
                return
            }

            onOrder(prev => [...prev, ...object])
            onLoading(false)
        }
    }

    catch(error) {
        onLoading(false)
        onError(401)
    }
}

export default fetchOrder
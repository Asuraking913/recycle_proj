import Axios from "../Axios"

const fetchFoods = async (onProduct) => {
    const response = await Axios.get("/api/product/").then(response => {
        const new_data = response.data.results.map((items) => ({
            name: items.name,
            price: items.price, 
            available: items.available_stock,
            id : items.id,
            img : items.image
        }))
        onProduct(prev => [...new_data.reverse(), ...prev])

    })
}

export default fetchFoods
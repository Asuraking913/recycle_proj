import Axios from "../utils/Axios"

const handlePicture = (e, fileInput) => {
    fileInput.current.click()
}

export const handleSubmit = async (e, data) => {
    e.preventDefault()

    data.onLoading(true)
    if(data.img == "") {
        data.onLoading(false)
        data.onError("Please select an image")
        return
    }

    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('price', data.price)
    formData.append('available_stock',  data.stock)
    formData.append('category', data.category)
    formData.append('image', data.img)

    // for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]);
    //     }

    try{
        const response = await Axios.post("/api/product/", formData).then(response => {
            if (response.status == 201) {
                data.nameRef.current.value = ""
                data.catRef.current.value = ""
                data.priceRef.current.value = ""
                data.stockRef.current.value = ""
                data.onImage("")
                data.onImageData("")
                data.onLoading(false)
            }
        })
    }

    catch(error) {
        data.onLoading(false)
        data.onError("An Error Occured")
    }

}

export default handlePicture
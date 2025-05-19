export const handleOrder = (array, name) => {
    array.forEach(items => {
        if(items.name == name) {
            items.available += 1
            console.log(items)
        }
    })
}
import React from 'react'
import OrderPrev from '../components/cartOrder/orderPreview'

function CheckOut() {
  return (
    <div className=''>
         <OrderPrev onOrder={setOrder} items={selectedItems.filter(item => !(deleted.includes(item.id)))}/>
    </div>
  )
}

export default CheckOut
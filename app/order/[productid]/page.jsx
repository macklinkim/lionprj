import React from 'react'

function Order({params}) {
  const {productid} = params;
  console.log('[page Order] productid:',productid);
  return (
    <div>Order</div>
  )
}

export default Order
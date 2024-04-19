import React from 'react'
import PropTypes from 'prop-types'
CartItem.propType = {
  cartProductList: PropTypes.object,
}
function CartItem({cartProductList}) {
  console.log("[CartItem] cartProductList:", cartProductList);
  return (
    <div>CartItem</div>
  )
}

export default CartItem
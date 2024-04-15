import ProductDetail from '@components/ProductDetail';
import React from 'react'

function Product(context) {

  return (
    <ProductDetail id={context.params.id} />
  )
}

export default Product
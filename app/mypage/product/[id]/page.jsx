import MyProductForm from '@components/MyProductForm'
import React from 'react'
import PropTypes from "prop-types";
function MyProduct({params}) {
  const {id} = params;
  console.log('MyProduct userId:', id);
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <MyProductForm userId={id} ></MyProductForm>
    </div>
  )
}

export default MyProduct
'use client'
import { saveCart } from '@utils/atom.mjs';
import { useSession } from 'next-auth/react';
import React from 'react'
import { useRecoilValue } from 'recoil';
// import { }
function OrderFinish({ params }) {
  const a =  useRecoilValue(saveCart);
  console.log('[OrderFinish] productid:', a);
  const {data:session}  =  useSession();
  console.log('[OrderFinish] session:', session);
  try {
    const res = fetch(process.env.NEXT_PUBLIC_URL + `/api/order/${session.userId}`, {
      method: "POST",
      body: JSON.stringify({ productId: a.productId, quantity: a.quantity }),
    })
  } catch (error) {
    
  }
  return (
    <div className='flex items-center justify-center' >
      <div className='text-4xl' >OrderFinish</div>
      
      </div>
  )
}

export default OrderFinish
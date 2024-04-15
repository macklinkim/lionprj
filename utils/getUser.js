import React from 'react'

async function getUser() {
  try {
    const res = fetch(process.env.NEXT_PUBLIC_URL + "/api/user", {
      
    })
  } catch (error) {
    
  }
  return (
    <div>getUser</div>
  )
}

export default getUser
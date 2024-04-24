import CartForm from '@components/CartForm'
import React from 'react'
import { getServerSession } from "next-auth/next";
async function page() {
  const session = await getServerSession();
  let result = null;
  try {
		const res = await fetch(`/api/user`, {
			method: "POST",
			body: JSON.stringify({ email: session.user.email }),
		});
		result = await res.json();
		// console.log("[Cart] result:", result);
	} catch (error) {
		console.log("[Cart] error:", error);
	}
  return (
    <div>
			<div className="flex flex-col items-center justify-center">
				<div className="text-6xl">장바구니</div>
				<CartForm result={result}></CartForm>
			</div>
		</div>
  )
}

export default page


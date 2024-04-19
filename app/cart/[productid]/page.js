import React from "react";
import { getServerSession } from "next-auth/next";
import CartForm from "@components/CartForm";

async function Cart({ params }) {
	//orderState 상관없음
	//구매하기 버튼 누르면 해당 product cart collection에 POST해버리고 거기서 주문하도록 만들것
	//여기서 product post, userId setting 다해서 던질것
	const session = await getServerSession();
	const { productid } = params;
	// console.log("[ProductDetail] session:", session);
	// console.log("[Cart] id:", id);
	// console.log("[Cart] session:", session);
  let result = null;
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/user`, {
      method:"POST",
      body: JSON.stringify({email:session.user.email}),
    })
    result = await res.json();
    // console.log("[Cart] result:", result);
  } catch (error) {
    console.log("[Cart] error:", error);
  }
	return (
		<div>
			<div className="flex flex-col items-center justify-center">
				<div className="text-6xl">장바구니</div>
        <CartForm result = {result} productid = {productid}></CartForm>
			</div>
		</div>
	);
}

export default Cart;

"use client";
import React from "react";
import CartForm from "@components/CartForm";

function Cart({ params }) {
	const { productid } = params;
	console.log("[Cart] productid:", productid);
	let result = null;
	const getCart = async () => {
		try {
			const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/cart`, {
				method: "POST",
				body: JSON.stringify({ productid: productid }),
			});
			result = await res.json();
			console.log("[Cart] result:", result);
		} catch (error) {
			console.log("[Cart] error:", error);
		}
	};
	return (
		<div>
			<div className="flex flex-col items-center justify-center">
				<div className="text-6xl">장바구니</div>
				<CartForm result={result} productid={productid}></CartForm>
			</div>
		</div>
	);
}

export default Cart;

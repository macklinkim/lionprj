"use client";
import React, { useEffect, useState } from "react";
import CartForm from "@components/CartForm";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { userId } from "@utils/atom";
function Cart({ params }) {
	const { productid } = params;
	const [cartProducts, setCartProducts] = useState("");
	const { data: session } = useSession();
	let sessionUserId = session?.user?.userId;
	const [userId2, setUserId] = useRecoilState(userId);
	setUserId(session?.user?.userId);
	// console.log("[Cart] productid, userid:", productid, sessionUserId);
	//일단 카트에 담고
	//유저 번호 기준으로 카트 필터링
	const addCart = async () => {
		if (!sessionUserId) {
			sessionUserId = userId2;
		}
		try {
			// console.log('[CartForm] addCart userId:', sessionUserId);
			const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/cart/`, {
				method: "POST",
				body: JSON.stringify({ product_id: productid, user_id: sessionUserId }),
			});
			const result = await res.json();
			// console.log("[CartForm] result:", result);
		} catch (error) {
			console.log("[CartForm] error:", error);
		}
	};
	const getCart = async () => {
		if (!sessionUserId) {
			sessionUserId = userId2;
		}
		try {
			console.log("[CartForm] getCart userId:", sessionUserId);
			console.log(process.env.NEXT_PUBLIC_URL + `/api/cart/${sessionUserId}`);
			const res2 = await fetch(process.env.NEXT_PUBLIC_URL + `/api/cart/${sessionUserId}`, {
				method: "GET",
				next: { revalidate: 300 },
			});
			const data = await res2.json();
			// console.log("[CartForm] data:", data);
			setCartProducts(data);
			return data;
		} catch (error) {
			console.log("[CartForm] error:", error);
		}
	};
	useEffect(() => {
		addCart();
		getCart();
	}, []);

	return (
		<div>
			<div className="flex flex-col items-center justify-center">
				<div className="text-6xl">장바구니</div>
				{cartProducts && <CartForm result={cartProducts} productid={productid}></CartForm>}
			</div>
		</div>
	);
}

export default Cart;

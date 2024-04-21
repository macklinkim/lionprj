"use client";
import Button from "@components/Button";
import { saveCart } from "@utils/atom.mjs";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
// import { }
function OrderFinish({ params }) {
	const a = useRecoilValue(saveCart);
	console.log("[OrderFinish] productid:", a);
	const { data: session } = useSession();
	console.log("[OrderFinish] session:", session);
	const order = async () => {
		try {
			const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/order/${session.userId}`, {
				method: "POST",
				body: JSON.stringify({ productId: a.itemId, quantity: a.quantity }),
			});
			const result = await res.json();
		} catch (error) {}
		console.log("[OrderFinish] error:", error);
	};
	useEffect(() => {
		order();
	}, []);

	return (
		<div className="flex items-center justify-center">
			<div className="text-4xl">주문 완료</div>
			<br></br>
			<Button size="xs" type="button" onClick={() => (window.location.href = "/")}>
				홈으로
			</Button>
		</div>
	);
}

export default OrderFinish;

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

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="my-12 text-4xl">주문 완료</div>
			<br></br>

			<div>
				<Button size="lg" type="button" onClick={() => (window.location.href = "/")}>
					홈으로
				</Button>
			</div>
		</div>
	);
}

export default OrderFinish;

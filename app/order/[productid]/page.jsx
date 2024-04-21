"use client";
import OrderForm from "@components/OrderForm";
import React from "react";
function Order({ params }) {
	const { productid } = params;
	return (
		//갯수, 주소,
		<div>
			<OrderForm productid={productid}></OrderForm>
		</div>
	);
}

export default Order;

import OrderForm from "@components/OrderForm";
import React from "react";

function Order({ params }) {
	const { productid } = params;
	console.log("[page Order] productid:", productid);
	const orderProduct = async orderDetail => {
    console.log("orderDetail:", orderDetail);
  };
	return (
		//갯수, 주소,
		<div>
      <OrderForm orderProduct={orderProduct}></OrderForm>
    </div>
	);
}

export default Order;

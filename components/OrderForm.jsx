"use client";
import React from "react";
import { useForm } from "react-hook-form";
import PropType from "prop-types";
OrderForm.propType = {
	orderProduct: PropType.func,
};
function OrderForm({ orderProduct }) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setError,
	} = useForm();
	const onSubmit = async (formData) => {
    console.log("[OrderForm] formData:", formData);
    orderProduct(formData);
  };
	return (
		<div>
			<div className="text-3xl">상품 주문하기</div>
			<form onSubmit={handleSubmit(onSubmit)}></form>
		</div>
	);
}

export default OrderForm;

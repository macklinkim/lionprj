"use client";
import React from "react";
import Button from "./Button";
import PropType from "prop-types";
import { useRouter } from 'next/navigation'
ProductBuyForm.propType = {
  productId: PropType.number,
}
function ProductBuyForm({productId}) {
  const router = useRouter();
	return (
		<div>
			<form >
				<div className="grid grid-cols-3 self-center">
					<label className="self-center" htmlFor="quantity">구매수량</label>
					<div className="flex justify-center w-fit">
						<input className="w-10 text-right" type="number" id="quantity" name="quantity" placeholder="0" />개
					</div>
					<Button type="button" onClick={() =>router.push(`/order/${productId}`)}>
						구매하기
					</Button>
				</div>
			</form>
		</div>
	);
}

export default ProductBuyForm;

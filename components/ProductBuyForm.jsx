"use client";
import React from "react";
function ProductBuyForm() {
	return (
		<div>
			<form >
				<div className="grid grid-cols-3 self-center">
					<label className="self-center" htmlFor="quantity">구매수량</label>
					<div className="flex justify-center w-fit">
						<input className="w-10 text-right" type="number" id="quantity" name="quantity" placeholder="0" />개
					</div>
				</div>
			</form>
		</div>
	);
}

export default ProductBuyForm;

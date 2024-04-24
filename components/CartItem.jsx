"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Button from "@components/Button";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { saveCart } from "@utils/atom";
CartItem.propType = {
	item: PropTypes.object,
	refreshCart: PropTypes.func,
};

//총액 계산
//order 화면으로 가도록
function CartItem({ item, refreshCart }) {
	const [cart, setCart] = useRecoilState(saveCart);
	const [quantity, setQuantity] = useState(0);
	const [fileName, setFileName] = useState();
	const [product, setProduct] = useState("");
	const [totalPrice, setTotalPrice] = useState(0);
	const router = useRouter();
	if (isNaN(totalPrice)) {
		console.log("[CartItem] val nan:", totalPrice);
		setTotalPrice(0);
	}
	console.log("[CartItem] item:", item);
	const getProduct = async () => {
		try {
			const res = await fetch(`/api/product/${item.product_id}`, {
				method: "GET",
				next: { revalidate: 300 },
			});
			const data = await res.json();
			setProduct(data.product);
			setFileName("/assets/images/" + data.product.mainImages[0]?.fileName);
			console.log("[CartItem] product:", data.product.mainImages[0]);
			return data.product;
		} catch (error) {
			console.log("[CartItem] error:", error);
		}
	};
	const deleteCartItem = async () => {
		try {
			const res = await fetch(`/api/cart/${item._id}`, {
				method: "DELETE",
			});
			const result = await res.json();
			console.log("[CartItem] result:", result);
			router.push(`/cart/0`);
		} catch (error) {
			console.log("[CartItem] error:", error);
		}
	};
	useEffect(() => {
		if (isNaN(totalPrice)) {
			console.log("[CartItem] val nan:", totalPrice);
			setTotalPrice(0);
		}
		setTotalPrice(quantity === 0 ? 0 : product.price * quantity + product.shippingFees);
		getProduct(item.product_id);
		setCart({ itemId: item._id, quantity: quantity });
	}, [quantity]);
	// const fileName = product?.mainImages[0]?.fileName;
	const handleQuantity = e => {
		let val = parseInt(e.target.value, 10);
		if (isNaN(val)) {
			console.log("[CartItem] val nan:", val);
			setTotalPrice(product?.price);
		} else {
			setQuantity(e.target.value);
		}
	};

	return (
		<tr className="border-solid border-2  text-center self-center">
			<td className="self-center"> {!fileName ? <div>로딩중</div> : <Image src={fileName} alt="image" width={100} height={100} />}</td>
			<td className="self-center">{product?.name}</td>
			<td className="self-center">{product?.price}</td>
			<td className="self-center">{product?.shippingFees}</td>
			<td className="self-center">
				<input
					className="w-10 border-solid border-2"
					type="number"
					name="quantity"
					id="quantity"
					min="0"
					value={quantity}
					onChange={e => {
						handleQuantity(e);
					}}
				/>
			</td>
			<td className=" self-center">
				<input className="w-20 border-solid border-2 " type="text" name="total" id="total" min="0" readOnly={true} value={totalPrice} />
			</td>
			<td>
				<Button size="xs" type="button" onClick={() => router.push(`/order/i${item.product_id}q${quantity}`)}>
					주문
				</Button>
			</td>
			<td>
				<Button size="xs" type="button" onClick={() => deleteCartItem()}>
					삭제
				</Button>
			</td>
		</tr>
	);
}

export default CartItem;

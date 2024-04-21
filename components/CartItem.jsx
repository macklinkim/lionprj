"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import {saveCart} from "@utils/atom";
CartItem.propType = {
	item: PropTypes.object,
	myFun: PropTypes.func,
};

//총액 계산
//order 화면으로 가도록
function CartItem({ item, myFun }) {
	const [cart, setCart] = useRecoilState(saveCart);
	const [quantity, setQuantity] = useState(0);
	const [product, setProduct] = useState("");
	const [totalPrice, setTotalPrice] = useState(item.price * 1 + item.shippingFees * 1);
	console.log("[CartItem] item:", item);
	const getProduct = async () => {
		try {
			const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/product/${item.product_id}`, {
				method: "GET",
				next: { revalidate: 300 },
			});
			const data = await res.json();
			setProduct(data.product);
      console.log('[CartItem] product:', data.product.mainImages[0]);
			return data.product;
		} catch (error) {
			console.log("[CartItem] error:", error);
		}
	};

	useEffect(() => {
		setTotalPrice(product.price * quantity + product.shippingFees * 1);
		getProduct(item.product_id);
    setCart({itemId: item._id, quantity: quantity} );
	}, [quantity]);
	const router = useRouter();
  // const fileName = product?.mainImages[0]?.fileName;
  
  const fileName = '/a';
  // console.log('[CartItem] fileName:', product?.mainImages[0]?.fileName);
	return (
		<tr className="border-solid border-2 border-sky-500 text-center self-center">
			<td className="self-center">{product.name}</td>
			<td className="self-center">{product.price}</td>
			<td className="self-center">{product.shippingFees}</td>
			<td className="self-center">
				<input className="w-10 border-solid border-2 border-sky-500" type="number" name="quantity" id="quantity" onChange={e => setQuantity(e.target.value)} />
			</td>
			<td className=" self-center">
				<input className="w-20 border-solid border-2 border-sky-500" type="text" name="total" id="total" readOnly={true} value={totalPrice} />
			</td>
			<td>
				<Button size="xs" type="button" onClick={() => router.push(`/order/i${item._id}q${quantity}`)}>
					주문
				</Button>
			</td>
		</tr>
	);
}

export default CartItem;

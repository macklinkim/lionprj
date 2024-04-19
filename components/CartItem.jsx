"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Button from "./Button";
import { useRecoilState } from "recoil";
import { saveCart } from "@utils/atom";
import { useRouter } from "next/navigation";
CartItem.propType = {
	item: PropTypes.object,
  myFun: PropTypes.func,
};

//총액 계산
//order 화면으로 가도록
function CartItem({ item, myFun }) {
  const [cart, setCart] = useRecoilState(saveCart);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(item.price * 1 + item.shippingFees * 1);
  useEffect(() => {
    setTotalPrice(item.price * quantity + item.shippingFees * 1);
    setCart({productId: item._id, quantity: quantity});
  }, [quantity])
  const router = useRouter();
	// console.log("[CartItem] item:", item);
	const filename = process.env.NEXT_PUBLIC_IMG_URL + item.mainImages[0].fileName;
	// console.log("[CartItem] filename:", filename);
	return (
		<div className="grid grid-cols-12 border-solid border-2 border-sky-500 text-center self-center">
			<Image className="col-span-2 self-center" src={filename} width={100} height={100} alt="hello" />
			<div className="col-span-4  self-center">{item.name}</div>
			<div className="col-span-2 self-center">{item.price}</div>
			<div className="col-span-1 self-center">{item.shippingFees}</div>
			<div className="col-span-1 self-center">
				<input className="w-10 border-solid border-2 border-sky-500" type="number" name="quantity" id="quantity" onChange={(e) => setQuantity(e.target.value) }/>
			</div>
			<div className="col-span-1 self-center">
				<input className="w-20 border-solid border-2 border-sky-500" type="text" name="total" id="total" 
        readOnly={true} value={totalPrice}/>
			</div>
      <Button className="col-span-1 self-center" type ="button" onClick={async () =>{
        router.push(`/order/i${item._id}q${quantity}`);
      }}>주문</Button>
		</div>
	);
}

export default CartItem;

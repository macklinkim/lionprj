import PropTypes from "prop-types";
import CartItem from "@/components/CartItem";
import getProducts from "@utils/getProduct";
import Link from "next/link";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
CartForm.propType = {
	result: PropTypes.object,
	productid: PropTypes.number,
};
let totalOrder = [];
async function CartForm({ result, productid }) {
	// console.log("[CartForm] result:", result);
	// console.log("[CartForm] productid:", productid);
	const user = result?.user;
	let message = "";
	const addCart = async () => {
		try {
			const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/cart`, {
				method: "POST",
				body: JSON.stringify({ product_id: productid, user_id: user._id }),
			});
			const result = await res.json();
			// console.log("[CartForm] result:", result);
			return result;
		} catch (error) {
			console.log("[CartForm] error:", error);
		}
	};
	const getCart = async () => {
		try {
			// console.log(process.env.NEXT_PUBLIC_URL + `/api/cart/${user._id}`);
			const res2 = await fetch(process.env.NEXT_PUBLIC_URL + `/api/cart/${user._id}`, {
				method: "GET",
				next: { revalidate: 300 },
			});
			const data = await res2.json();
			// console.log("[CartForm] data:", data);
			return data;
		} catch (error) {}
	};
	//제품 정보 받아오기 이미지 조립
	try {
	} catch (error) {}

	if (productid) {
		message = await addCart();
	}
	// console.log("[CartForm] message:", message);
	const cartProductList = await getCart();
	// console.log("[CartForm] cartProductList:", cartProductList);
	//카트 리스트를 가져오고 상품 리스트로 변경
	const aList = [];
	if (cartProductList) {
		for (let aProduct of cartProductList) {
			const product = await getProducts(aProduct.product_id);
			const file = aList.push({ ...product });
		}
	}
	const myfun = async ({ productId, quantity }) => {
		"use server";
		console.log("myfun", productId, quantity);
		totalOrder = { productId, quantity };
		console.log("totalOrder", totalOrder);
	};
	const cartItemList = aList.map(item => <CartItem key={item._id} item={item} myFun={myfun}></CartItem>);
	return (
		<div className="w-full">
			{/* {message && <div> {message.message} </div>} */}
			<div className="grid grid-cols-12">
				<div className="col-span-2 text-center">사진</div>
				<div className="col-span-4 text-center">상품명</div>
				<div className="col-span-2 text-center">가격</div>
				<div className="col-span-2 text-center">배송비</div>
				<div className="col-span-1 text-center">갯수</div>
				<div className="col-span-1 text-center">총액</div>
			</div>
			{cartItemList}

      
		</div>
	);
}

export default CartForm;

"use client";
import PropTypes from "prop-types";
import CartItem from "@/components/CartItem";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
CartForm.propType = {
	result: PropTypes.object,
	productid: PropTypes.number,
};
let totalOrder = [];
function CartForm({ result, refreshCart }) {
	console.log("[CartForm] result:", result);
	const { data: session } = useSession();
	console.log("[CartForm] session:", session);
  const [itemList, setItemList] = useState();
	const getCart = async sessionUserId => {
		try {
			const res2 = await fetch(`/api/cart/${sessionUserId}`, {
				method: "GET",
				next: { revalidate: 300 },
			});
			const data = await res2.json();
			console.log("[CartForm] data:", data);
      setItemList(data);
			return data;
		} catch (error) {
      console.log("[CartForm] error:", error);
		}
	};
	useEffect(() => {
    getCart(session?.user.userId);
	}, []);
	console.log("[CartForm] result:", result);
  const List  = itemList?.map(item => <CartItem key={item._id} item={item} refreshCart={refreshCart}></CartItem>);
	return (
		<section className=" p-4 ">
			<table className="w-full border-collapse table-fixed">
				<colgroup>
					<col className="w-[10%] sm:w-[10%]" />
					<col className="w-[40%] sm:w-[25%]" />
					<col className="w-[20%] sm:w-[10%]" />
					<col className="w-[20%] sm:w-[12%]" />
					<col className="w-0 sm:w-[10%]" />
					<col className="w-0 sm:w-[15%]" />
					<col className="w-[5%] sm:w-[10%]" />
					<col className="w-[5%] sm:w-[8%]" />
				</colgroup>
				<thead>
					<tr className="border-b text-sm text-center border-solid border-gray-200">
						<th className="p-2 text-center ">상품사진</th>
						<th className="p-2 text-center ">상품명</th>
						<th className="p-2 text-center ">상품가격</th>
						<th className="p-2 text-center ">배송비</th>
						<th className="p-2 text-center hidden sm:table-cell">갯수</th>
						<th className="p-2 text-center hidden sm:table-cell">총액</th>
						<th className="p-2 text-center hidden sm:table-cell">주문</th>
						<th className="p-2 text-center hidden sm:table-cell">삭제</th>
					</tr>
				</thead>
				<tbody className="w-full">{List}</tbody>
			</table>
		</section>
	);
}

export default CartForm;

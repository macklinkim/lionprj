"use client";
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
function CartForm({ result, productid }) {
	console.log("[CartForm] result:", result);
  const itemList = result?.map(item => <CartItem key={item._id} item={item}></CartItem>)
	return (
		<section className="p-4 ">
			<table className="border-collapse table-fixed">
				<colgroup>
        <col className="w-[50%] sm:w-[30%]" />
            <col className="w-[25%] sm:w-[15%]" />
            <col className="w-[25%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[20%]" />
            <col className="w-0 sm:w-[10%]" />
				</colgroup>
				<thead>
					<tr className="border-b text-center border-solid border-gray-200">
						<th className="p-2 text-center ">상품명</th>
						<th className="p-2 text-center ">상품가격</th>
						<th className="p-2 text-center ">배송비</th>
						<th className="p-2 text-center hidden sm:table-cell">갯수</th>
						<th className="p-2 text-center hidden sm:table-cell">총액</th>
						<th className="p-2 text-center hidden sm:table-cell">삭제</th>
					</tr>
				</thead>
				<tbody className="w-full">
          {itemList}
          </tbody>
			</table>
		</section>
	);
}

export default CartForm;

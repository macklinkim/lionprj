import Link from "next/link";
import Button from "./Button";
import ProductCard from "./ProductCard";
import PropTypes from "prop-types";
MyProductForm.propType = {
	userId: PropTypes.number,
};

async function getMyProducts(userId) {
	try {
		console.log(process.env.NEXT_PUBLIC_URL + `/api/user/${userId}/product`);
		const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/user/${userId}/product`, {
			cache: "force-cache",
		});
		const product = await res.json();
		// console.log("product:", product.products.length);
		return product.products;
	} catch (error) {
		console.log(error);
	}
}
async function MyProductForm({ userId }) {
	const res = await getMyProducts(userId);
	const itemList = res?.map(item => <ProductCard key={item._id} item={item} isMyProduct={true} />);

	return (
		<div>
			<br></br>
			<div className="flex justify-between items-center">
				<div className="text-3xl text-center">내 상품 목록</div>
				<Link className="border-solid border-2 border-blue-200 rounded-md p-1 bg-blue-200" href={{ pathname: "/product/new" }}>상품 추가하기</Link>
			</div>
			<br></br>
			<div className="grid grid-cols-5 gap-4">
				<div className="col-span-4">상품명</div>
				<div className="col-span-1">가격</div>
			</div>
			<div className="grid grid-cols-1 w-fit">{itemList}</div>
		</div>
	);
}

export default MyProductForm;

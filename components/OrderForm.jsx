import PropType from "prop-types";
import getProducts from "@utils/getProduct";
import Image from "next/image";
import Button from "./Button";
OrderForm.propType = {
	productid: PropType.number,
};
async function OrderForm({ productid }) {
	const productId = productid;
	const str = productId + "";
	const a = str.indexOf("q");
	const i = str.substring(1, a);
	const q = str.substring(a + 1, str.length);
	console.log("[OrderForm] i, q", i, "|", q);
	console.log("[OrderForm] productId:", i);
	const product = await getProducts(i);
	console.log("[OrderForm] product:", product);
	const totalPrice = product.price * q + product.shippingFees;
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="text-3xl">상품 주문하기</div>

			<div className="flex flex-col">
				<div className="flex items-center justify-center gap-10">
					<Image src={"/assets/images/" + product.mainImages[0].fileName} width={100} height={100} alt="hello" />
					<div>상품명 : {product?.name}</div>
					<div>상품가격 : {product?.price}</div>
					<div>수량 : {q}</div>
					<div>배송비 : {product?.shippingFees}</div>
					<div>총액 : {totalPrice}</div>
				</div>
				<div>
					<div>
						주소:
						<input type="text" />
					</div>
				</div>
				<div>
					<Button type="button">주문하기</Button>
				</div>
			</div>
		</div>
	);
}

export default OrderForm;

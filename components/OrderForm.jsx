"use cilent";
import PropType from "prop-types";
import getProducts from "@utils/getProduct";
import Image from "next/image";
import { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useRouter } from "next/navigation";
import Button from "@components/Button";
import { useSession } from "next-auth/react";

OrderForm.propType = {
	productid: PropType.number,
};
function OrderForm({ productid }) {
	const productId = productid;
	const str = productId + "";
	const a = str.indexOf("q");
	const i = str.substring(1, a);
	const q = str.substring(a + 1, str.length);
	console.log("[OrderForm] i:", i, "q:", q);
	const [product, setProduct] = useState();
	const [fileName, setFileName] = useState();
	const [address, setAddress] = useState("");
	const [address2, setAddress2] = useState("");
	const router = useRouter();
	const { data: session } = useSession();
	const getP = async () => {
		const product = await getProducts(i);
		setProduct(product);
	};

	const getImage = async () => {
		try {
			console.log("[OrderForm] productid:", i);
			const res = await fetch(`/api/product/${i}`);
			const data = await res.json();
			console.log("[OrderForm] product data:", data.product);
			setFileName(data?.product?.mainImages[0].fileName);
		} catch (error) {
			console.log("[OrderForm] error:", error);
		}
	};
	const order = async () => {
		try {
			const res = await fetch(`/api/order/${session.user.userId}`, {
				method: "POST",
				body: JSON.stringify({ productId: i, quantity: q, address: address + " " + address2 }),
			});
			const result = await res.json();
			console.log("[OrderFinish] result:", result);
			router.push("/order/finish");
		} catch (error) {
			console.log("[OrderFinish] error:", error);
		}
	};
	useEffect(() => {
		getP();
		getImage();
	}, []);
	const handleComplete = data => {
		console.log("[OrderForm] handleComplete data:", data);
		setAddress(data.address);
	};
	const totalPrice = product?.price * q + product?.shippingFees;
	return (
		<div className="my-5 flex flex-col items-center justify-center">
			<div className="text-3xl">상품 주문하기</div>

			<div className="flex flex-col p-3 shadow-md">
				<div className="flex items-center justify-center gap-10 border-solid border-2 border-gray-300 p-2 ">
					{!fileName ? <div>로딩중</div> : <Image src={"/assets/images/" + fileName} width={100} height={100} alt="hello" />}
					<div>
						<div>상품명</div> {product?.name}
					</div>
					<div>
						<div>상품가격</div> {product?.price.toLocaleString("ko-KR")}원
					</div>
					<div>
						<div>수량</div> {q}개
					</div>
					<div>
						<div>배송비</div> {product?.shippingFees.toLocaleString("ko-KR")}원
					</div>
					<div>
						<div>총액</div> {totalPrice.toLocaleString("ko-KR")}원
					</div>
				</div>
				<br></br>

				<div className="flex flex-col items-center justify-center">
					<div className="w-[70%] text-xl flex flex-col justify-center items-start">
						<label htmlFor="address">배송주소</label>
						<input className="w-full border-solid border-2 border-gray-300" type="text" name="address" id="address" value={address} readOnly={true}></input>
						<DaumPostcode onComplete={handleComplete} />
					</div>
					<div className="w-[70%]">
						<label htmlFor="address">나머지 주소</label>
						<input className="w-full border-solid border-2 border-gray-300" type="text" name="address2" id="address2" value={address2} onChange={e => setAddress2(e.target.value)}></input>
					</div>
				</div>
				<div className="flex flex-col items-center justify-center p-4">
					<Button onClick={order}> 주문 완료</Button>
				</div>
			</div>
		</div>
	);
}

export default OrderForm;

"use cilent";
import PropType from "prop-types";
import getProducts from "@utils/getProduct";
import Image from "next/image";
import { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useRouter } from "next/navigation";
import Button from "./Button";
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
  const {data: session}= useSession();
	const getP = async () => {
		const product = await getProducts(i);
		setProduct(product);
	};
  
	const getImage = async () => {
		try {
			const res = await fetch(`/api/product/${productId}`);
			
		} catch (error) {
			console.log("[OrderForm] error:", error);
		}
	};
	const order = async () => {
    
		try {
			const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/order/${session.user.userId}`, {
				method: "POST",
				body: JSON.stringify({ productId: i, quantity:q , address: (address+' '+address2) }),
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
		setFileName(product?.mainImages[0]?.fileName);
	}, []);
	const handleComplete = data => {
		console.log("[OrderForm] handleComplete data:", data);
		setAddress(data.address);
	};
	const totalPrice = product?.price * q + product?.shippingFees;
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="text-3xl">상품 주문하기</div>

			<div className="flex flex-col">
				<div className="flex items-center justify-center gap-10">
					{!fileName ? <div>로딩중</div> : <Image src={"/assets/images/" + fileName} width={100} height={100} alt="hello" />}
					<div>상품명 : {product?.name}</div>
					<div>상품가격 : {product?.price}</div>
					<div>수량 : {q}</div>
					<div>배송비 : {product?.shippingFees}</div>
					<div>총액 : {totalPrice}</div>
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
            <input className="w-full border-solid border-2 border-gray-300" type="text" name="address2" id="address2" value={address2} onChange={e => setAddress2(e.target.value)} ></input>
          </div>
        </div>
				<div className="flex flex-col items-center justify-center p-4">
          <Button onClick={order} > 주문 완료</Button>
				</div>
			</div>
		</div>
	);
}

export default OrderForm;

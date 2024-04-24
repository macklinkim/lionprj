/* eslint-disable @next/next/no-async-client-component */
import parse from "html-react-parser";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import getImages from "@utils/getImages";
import getProducts from "@utils/getProduct";
import getReply from "@utils/getReply";
import AddReply from "@components/AddReply";
import Button from "@components/Button";
import ProductBuyForm from "@components/ProductBuyForm";
import Link from "next/link";
import ReplyItem from "@components/ReplyItem";
ProductDetail.propType = {
	id: String,
};
async function ProductDetail({ id }) {
	const product = await getProducts(id);
	const newContent = product?.content.replace(/<img src="\/api\/download/g, `<img src=\"${process.env.NEXT_PUBLIC_BASE_URL}assets/images/`);
	const reactElements = parse(newContent);
	const images = [];
	const session = await getServerSession();
	// console.log("[ProductDetail] session:", session);
	product.mainImages.forEach(async element => {
		images.push(element.fileName);
	});

	const imagesBinaryList = [];
	for (let a of images) {
		imagesBinaryList.push(await getImages(a));
	}
	const imageList = images.map((element, index) => <Image key={index} src={imagesBinaryList[index]} width={300} height={300} alt={element} />);

	const reply = await getReply(id);
	// console.log('reply:',reply);
	const replyList = reply.map((element, index) => <ReplyItem key={index} replyItem={element}></ReplyItem>);
	return (
		<div className="flex my-5 items-center justify-center border-solid border-3 border-gray-900">
			<div className="flex flex-col">
				<div className="sm:grid sm:grid-cols-2 gap-4">
					<div className="flex flex-col items-center justify-center">{imageList}</div>
					<div className="flex flex-col items-left justify-between my-3">
						<div className="font-size-lg">상품 상세 정보</div>
						<div>상품명 : {product.name > 20 ? product.name.substring(0, 20) + "..." : product.name} </div>
						<div>상품 재고 : {product.quantity}개</div>
						<div>상품 가격 : {product.price.toLocaleString("ko-KR")}원</div>
						<div>배송비: {product.shippingFees}</div>
						<div>판매자: {product.seller_id}</div>
						<ProductBuyForm></ProductBuyForm>
						{session?.user ? (
							<Link href={{ pathname: `/cart/${id}` }}>
								<Button>구매하기</Button>
							</Link>
						) : (
							<div> </div>
						)}
					</div>
				</div>
				<div className=" w-[2px] bg-dark-200"> </div>
				<div>
					상품 소개
					<br></br>
					<div className="grid grid-cols-1 items-center justify-center">{reactElements}</div>
				</div>
				<br></br>
				<br></br>
				<div>
					<table className="border-collapse table-fixed">
						<colgroup>
							<col className="w-[30%] sm:w-[20%]" />
							<col className="w-[70%] sm:w-[50%]" />
							<col className="w-0 sm:w-[30%]" />
						</colgroup>
						<thead>
							<tr className="border-b text-sm text-center border-solid border-gray-200">
								<th className="p-2 text-center ">글쓴이</th>
								<th className="p-2 text-center ">내용</th>
								<th className="p-2 text-center hidden sm:table-cell">작성일</th>
							</tr>
						</thead>
						<tbody className="w-full">{replyList}</tbody>
					</table>
					{session && <AddReply productId={id}></AddReply>}
				</div>
			</div>
		</div>
	);
}

export default ProductDetail;

/* eslint-disable @next/next/no-async-client-component */
import parse from "html-react-parser";
import getImages from "@utils/getImages";
import Image from "next/image";
import getProducts from "@utils/getProduct";
import getReply from "@utils/getReply";
import ReplyForm from "@components/ReplyForm";
import AddReply from "@components/AddReply";
ProductDetail.propType = {
	id: String,
};
async function ProductDetail({ id }) {
	const product = await getProducts(id);
	const reactElements = parse(product?.content);
	const images = [];
	product.mainImages.forEach(async element => {
		images.push(element.fileName);
	});
	const test = [];
	for (let a of images) {
		test.push(await getImages(a));
	}
	const imageList = images.map((element, index) => <Image key={index} src={test[index]} width={300} height={300} alt={element} />);
  const reply = await	getReply(id);
  // console.log('reply:',reply);
  const replyList = reply.map((element, index) => <ReplyForm key={index} reply={element}></ReplyForm>);
	return (
		<div className="flex items-center justify-center">
			<div className="flex flex-col">
				<div className="sm:grid sm:grid-cols-2">
					<div className="flex flex-col items-center justify-center">{imageList}</div>
					<div className="flex flex-col items-center justify-center">
            <div className="font-size-lg">
              상품 상세 정보
            </div>
						<div>
							<p>상품명 : {product.name}</p>{" "}
						</div>
						<div>
							<p>상품 재고 : {product.quantity}</p>
						</div>
						<div>
							<p>상품 가격 : {product.price}</p>
						</div>
						<div>
							<p>배송비: {product.shippingFees}</p>
						</div>
						<div>
							<p>판매자: {product.seller_id}</p>
						</div>
					</div>
				</div>

				<div>
					<p>상품 소개</p>
					<div className="grid grid-cols-1 items-center justify-center">{reactElements}</div>
				</div>
        <div>
          {replyList}
        </div>
        {/* {session&&} */}
        <AddReply productId={id}></AddReply>
			</div>
		</div>
	);
}

export default ProductDetail;

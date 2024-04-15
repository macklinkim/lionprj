/* eslint-disable @next/next/no-async-client-component */
import parse from "html-react-parser";
ProductDetail.propType = {
	id: String,
};
const getProduct = async id => {
	try {
		const res = await fetch(process.env.NEXT_PUBLIC_LOCAL_URL + `/api/product/${id}`, {
			next: { revalidate: process.env.NEXT_PUBLIC_REVALDATE },
		});
		const product = await res.json();
		return product;
	} catch (error) {
		console.log(error);
	}
};
async function ProductDetail({ id }) {
	console.log("_id: ", id);
	const product = (await getProduct(id)).product;
	console.log("product: ", product);
	return (
		<div>
			<div className="flex flex-col">
				<div>{product.name}</div>
				<div>{product.quantity}</div>
				<div>{product.price}</div>
				<div>{product.shippingFees}</div>
				<div>{product.seller_id}</div>
				<div>{parse(product.content)}</div>
			</div>
		</div>
	);
}

export default ProductDetail;

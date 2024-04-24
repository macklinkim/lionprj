/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable react/jsx-no-undef */
import getProducts from "@utils/getProduct";
import ProductCard from "@components/ProductCard";

async function ShoppingForm() {
	const res = await getProducts();
	const itemList = res?.product.map(item => <ProductCard key={item._id} item={item} />);
	return <div className="overflow-x-auto grid grid-cols-3 gap-2 py-2 my-2 sm:grid-cols-4 lg:grid-cols-5 md:gap-6 md:px-6">{itemList}</div>;
}
export default ShoppingForm;

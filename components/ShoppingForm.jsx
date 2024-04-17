/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable react/jsx-no-undef */
import getProducts from "@utils/getProduct";
import ShoppingCard from "./ShoppingCard";

async function ShoppingForm() {
	const res = await getProducts();
	const itemList = res?.product.map(item => <ShoppingCard key={item._id} item={item} />);
	return <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-3">{itemList}</div>;
}
export default ShoppingForm;

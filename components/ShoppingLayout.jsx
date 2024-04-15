/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable react/jsx-no-undef */
import ShoppingCard from "./ShoppingCard";

async function ShoppingLayout() {
	const getProducts = async () => {
		//local로 변경
		try {
			const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/product", {
				next: { revalidate: Number(process.env.NEXT_PUBLIC_REVALDATE) },
			});
			if (!res) {
				throw new Error("Failed to fetch products");
			}
			return res.json();
		} catch (error) {
			console.log("Error loading products: ", error);
		}
	};
	const res = await getProducts();
	const itemList = res?.product.map(item => <ShoppingCard key={item._id} item={item} />);
	// const itemList = res?.product.map((item, index) => (index === 1 ? <ShoppingCard key={item._id} item={item} /> : null));
	return <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-3">{itemList}</div>;
}
export default ShoppingLayout;

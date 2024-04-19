
import PropTypes from "prop-types";
import CartItem from "./CartItem";

CartForm.propType = {
	result: PropTypes.object,
	productid: PropTypes.number,
};
async function CartForm({ result, productid }) {
	// console.log("[CartForm] result:", result);
	// console.log("[CartForm] productid:", productid);
	const user = result.user;
	const addCart = async () => {
		try {
			const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/cart`, {
				method: "POST",
				body: JSON.stringify({ product_id: productid, user_id: user._id }),
			});
		} catch (error) {
			console.log("[CartForm] error:", error);
		}
	};
	const getCart = async () => {
		try {
			console.log(process.env.NEXT_PUBLIC_URL + `/api/cart/${user._id}`);
			const res2 = await fetch(process.env.NEXT_PUBLIC_URL + `/api/cart/${user._id}`, {
				method: "GET",
				next: { revalidate: 300 },
			});
			const data = await res2.json();

			console.log("[CartForm] data:", data);
			console.log("[CartForm] res2:", res2);
			await makeItemList();
			return data;
		} catch (error) {}
	};
	addCart();
	const cartProductList = getCart();
  
	return (
		<div>
			<div className="flex items-center justify-center text-3xl"></div>
			{/* {cartProductList && <CartItem cartProductList={cartProductList}></CartItem>} */}
		</div>
	);
}

export default CartForm;

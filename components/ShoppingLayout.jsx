/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable react/jsx-no-undef */
"use client"
import { Link } from "react-router-dom";
// import ShoppingCard from "./ShoppingCard";
// import axios from "axios";
const getProducts = async () => {
  //local로 변경
	try {
		const res = await fetch(process.env.NEXT_PUBLIC_LOCAL_URL+"/api/products", {
			cache: "no-store",
		});
		if (!res) {
			throw new Error("Failed to fetch products");
		}
		return res.json();
	} catch (error) {
		console.log("Error loading products: ", error);
	}
};

export default async function ShoppingLayout() {
	const res = await getProducts();
	console.log('res',res);
	return (
		<div className="overflow-x-auto">
		</div>
	);
}

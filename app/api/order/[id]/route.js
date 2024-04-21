import { connectToDB } from "@utils/database";
import Order from "@models/Order";
import { NextResponse } from "next/server";
import Seq from "@models/Seq";
import User from "@models/User";
import ProductModel from "@models/ProductModel";

export async function POST(req, { params }) {
	const { id } = params;
	const userId = id;
  console.log("[API ORDER POST] userId:", userId);
	const { productId, quantity } = await req.json();
	console.log("[API ORDER POST]req:", productId, quantity);
	try {
		await connectToDB();
		const { _id, no } = await Seq.findOne({ _id: "order" });
		const product = await ProductModel.findOne({ _id: productId });
		console.log("[API ORDER POST] _id:", no);
		console.log("[API ORDER POST] product:", product);
		const total = product.price * quantity;
		const totalOrd = total + product.shippingFees;
		// console.log(total, totalOrd);
		// console.log(product._id, product.name,  total,  product.mainImages[0],  quantity);
		const aProduct = { _id: product._id, name: product.name, price: total, image: product.mainImages[0], quantity: quantity };

		console.log("[API ORDER POST] aProduct:", aProduct);
		const cost = { products: total, shippingFees: aProduct.shippingFees, total: totalOrd };
		console.log("[API ORDER POST] cost:", cost);
		const user = await User.findOne({ _id: userId });
    const userAddress = user.address;
		const address = { name: "집", value: userAddress };
    const rand = Math.floor(Math.random() * 1000000000);
		const delivery = { company: "CJ대한통운", trackingNumber: rand, url: "https://trace.cjlogistics.com/next/tracking.html?wblNo=" };
		console.log({ _id: no + 1, user_id: Number(id), state: "OS020", products: aProduct, address: address, cost: cost, delivery: delivery });
		const res = await Order.create({ _id: no + 1, user_id: id, state: "OS020", products: aProduct, address: address, cost: cost, delivery: delivery });
		if (res) await Seq.updateOne({ _id: "order" }, { $inc: { no: 1 } });
		console.log("[API ORDER POST]responsive:", res);
		return NextResponse.json({ res }, { status: 200 });
	} catch (error) {
		console.log("[API ORDER POST]error:", error);
		return NextResponse.json({ error }, { status: 500 });
	}
}

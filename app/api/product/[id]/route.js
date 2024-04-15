import { connectToDB } from "@utils/database";
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
	const { id } = params;
	const { newName: name, newImage: image, newPrice: price, newCategory: category } = await request.json();
	await connectToDB();
	await Product.findByIdAndUpdate(id, { name, image, price, category });
	return NextResponse.json({ message: "Product updated" }, { status: 200 });
}

export async function GET(request, { params }) {
	const { id } = params;
	await connectToDB();
  console.log("db id: ", id);
	const product = await Product.findOne({ _id: id });
  console.log("db product: ", product);
	return NextResponse.json({ product }, { status: 200 });
}
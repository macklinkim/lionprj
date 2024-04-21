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
  try {
    await connectToDB();
    const product = await Product.findOne({ _id: id });

    return NextResponse.json({ product }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function HEAD(req) {}

export async function POST(req) {}

export async function DELETE(req) {}

export async function PATCH(req) {}

export async function OPTIONS(req) {}

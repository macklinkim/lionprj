import { connectToDB } from "@utils/database";
import Reply from "@/models/Reply";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
	const { productid } = params;
	await connectToDB();
	const replies = await Reply.find({ product_id: productid });
	return NextResponse.json({ replies }, { status: 200 });
}
export async function HEAD(req) {}

export async function POST(req) {}

export async function DELETE(req) {}

export async function PATCH(req) {}

export async function OPTIONS(req) {}

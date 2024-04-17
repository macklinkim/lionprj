import { connectToDB } from "@utils/database";
import Reply from "@/models/Reply";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
	await connectToDB();
	const replies = await Reply.find();
	return NextResponse.json({ replies }, { status: 200 });
}

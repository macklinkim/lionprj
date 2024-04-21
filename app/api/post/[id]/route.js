import Post from "@/models/Post";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
export async function GET(request, { params }) {
	const { id } = params;
	try {
		await connectToDB();
		const res = await Post.findOne({ _id: id });
		console.log("[api/post/[id]/route] res :", res);
		return NextResponse.json({ res }, { status: 200 });
	} catch (error) {
		console.log("[api/post/[id]/route] error :", error);
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function PATCH(request, { params }) {
  const { id } = params;
  const body = await request.json();
  try {
    await connectToDB();
    const res = await Post.updateOne({ _id: id }, body);
    console.log("[api/post/[id]/route] res :", res);
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
export async function DELETE(request, { params }) {
	const { id } = params;
	try {
		await connectToDB();
		const res = await Post.deleteOne({ _id: id });
		console.log("[api/post/[id]/route] res :", res);
		return NextResponse.json({ res }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

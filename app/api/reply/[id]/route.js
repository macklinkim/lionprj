import { connectToDB } from "@utils/database";
import Reply from "@/models/Reply";
import { NextResponse } from "next/server";
import getTimestamp from "@utils/getTimestamp";
export async function GET(req, { params }) {
	/* product ID기준으로 reply 가져옵니다. */
	const { id } = params;
	await connectToDB();
	const replies = await Reply.find({ product_id: id });
	return NextResponse.json({ replies }, { status: 200 });
}
export async function HEAD(req) {}

export async function POST(req, { params }) {
	/* product ID기준으로 post */
	const { content } = await req.json();
	const { id } = params;
	console.log("[API REPLY POST] comment and productId:", content, id);
	if (!content) {
		return NextResponse.json({ error: "Missing content" }, { status: 400 });
	}
	try {
		await connectToDB();
		const count = await Reply.find();
		const max = Math.max.apply(
			null,
			count.map(r => r._id)
		);
		const rating = content.rating ?? 0;
		const createdAt = await getTimestamp(new Date());
		const replies = await Reply.create({ _id: max + 1, product_id: id, content: content.comment, user_id: content.userId, rating: content.rating || rating, createdAt: createdAt });
		return NextResponse.json({ Message: "success" }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function DELETE(req, { params }) {
	const { id } = params;
	console.log("[API REPLY DELETE] replyId:", id);
	try {
		await connectToDB();
		const res = await Reply.deleteOne({ _id: id } );
    console.log("deleteReply in api reply delete:", res);
		return NextResponse.json({ res }, { status: 200 });
	} catch (error) {
		console.log("fetch at deleteReply in api reply delete:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function PATCH(req) {}

export async function OPTIONS(req) {}

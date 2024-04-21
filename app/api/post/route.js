import Post from "@/models/Post";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Seq from "@models/Seq";
export async function GET(request) {
	try {
		await connectToDB();
		const res = await Post.find();
		return NextResponse.json({ res }, { status: 200 });
	} catch (error) {
		console.log("[api/post/[id]/route] error :", error);
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function POST(req) {
	const {title, content, name, userId} = await req.json();
	console.log("[api/post/route] body:", title, content, name, userId);
	try {
		await connectToDB();
		//seq id 가져오기,
		//post object 말기
		//seq id++ 하기
		const { no } = await Seq.findOne({ _id: "post" });
		console.log("[api/post/route] id:", no);
		const post = {
			_id: no,
			type: "free",
			title: title,
			user: {_id:userId, name: name},
			content: content,
      replies: [],
		};
		console.log("[api/post/route] post:", post);
		const res = await Post.create({
      ...post
		})
    console.log("[api/post/route] res:", res);
    await Seq.updateOne({ _id: "post" }, { $inc: { no: 1 } });
		return NextResponse.json({ res }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import ImageDetail from "@models/ImageDetail";

export async function POST(req,{ params }) {
  const {base64, filename} = await req.json();
  console.log("filename: ", filename);
  console.log("base64: ", base64.length);
  try {
    await connectToDB();
    const res = await ImageDetail.create({image:base64, filename:filename});
    // console.log('[api/upload/route]res:',res);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
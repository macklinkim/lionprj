import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import ImageDetail from "@models/ImageDetail";

export async function POST(req) {
  // const {base64} = await req.body;
  const {base64} = await req.json();
  console.log("base64: ",base64);
  try {
    await connectToDB();
    const imageFiles = await ImageDetail.create({image:base64});
    return NextResponse.json('ok', { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

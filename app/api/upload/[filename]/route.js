import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import ImageDetail from "@models/ImageDetail";

export async function POST(req,{ params }) {
  console.log("filename: ",params.filename);
  const {base64} = await req.json();
  const {filename} = params;
  try {
    await connectToDB();
    const imageFiles = await ImageDetail.create({image:base64, filename:filename});
    return NextResponse.json('ok', { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req, {params}){
  try {
    await connectToDB();
    const imageFiles = await ImageDetail.find({filename:params.filename});
    return NextResponse.json(imageFiles, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

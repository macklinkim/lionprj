import { connectToDB } from "@utils/database";
import Product from "@models/ProductModel";
import { NextResponse } from "next/server";
import ImageDetail from "@models/ImageDetail";

export async function POST(req, res) {
  const {base64} = await req.body;
  try {
    await connectToDB();
    const imageFiles = await ImageDetail.create({})
    return NextResponse.json({imageFiles});
  } catch (error) {
    console.log(error);
  }
}

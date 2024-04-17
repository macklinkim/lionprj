import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import ProductModel from "@models/ProductModel";

export async function GET(req, {params}) {
  const {id} = params;
  console.log('id:',id);
  try {
    await connectToDB();
    const products = await ProductModel.find({seller_id:id});
    console.log('products:',products.length);
    return NextResponse.json({products}, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
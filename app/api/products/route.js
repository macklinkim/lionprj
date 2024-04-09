import { connectToDB } from "@utils/database";
import Product from "@models/ProductModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const product = await Product.find();
    console.log('try to get in Products data',product);
    return NextResponse.json({product});
  } catch (error) {
    console.log(error);
  }
}

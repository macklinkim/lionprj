import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import Cart from "@models/Cart";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    await connectToDB();
    const res = await Cart.find({user_id:id});
    // console.log('[api/cart/[id]/] res:', res);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({error}, { status: 500 });
  }
}
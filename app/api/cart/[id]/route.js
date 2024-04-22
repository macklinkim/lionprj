import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import Cart from "@models/Cart";

export async function GET(req, { params }) {
  // console.log('params', params);
  const { id } = params;
  // console.log('[api/cart/[id]/] GET userid:', id);
  try {
    await connectToDB();
    // console.log("[api/cart/[id]/] connectToDB ok");
    const res = await Cart.find({user_id: id});
    // console.log('[api/cart/[id]/] res:', res);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({error}, { status: 500 });
  }
}
export async function DELETE(req, { params }) {
  console.log('params', params);
  const { id } = params;
  console.log('[api/cart/[id]/] GET cart id :', id);
  try {
    await connectToDB();
    const res = await Cart.deleteOne({_id: id});
    console.log('[api/cart/[id]/] res:', res);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({error}, { status: 500 });
  }
}
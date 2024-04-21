import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import Cart from "@models/Cart";
import Seq from "@models/Seq";

export async function POST(req) {
  const {product_id, user_id} = await req.json();
  // console.log('[api/cart] body:', product_id, user_id);
  try {
    await connectToDB();
    const {_id, no }= await Seq.findOne({_id:"cart"});
    const productId = Number(product_id)
    // console.log('[api/cart] id:', _id, no);
    const check = await Cart.findOne({product_id:productId, user_id:user_id});
    if(check) {
      return NextResponse.json({message: "같은 상품이 이미 장바구니에 존재합니다."}, { status: 200 });
    }
    const checkDup = await Cart.findOne({_id:no});
    if(checkDup) {
      return NextResponse.json({error: "_id already exists added"}, { status: 400 });
    }
    const res = await Cart.create({_id:no, product_id: productId, user_id:user_id, quantity: 1});
    // await Seq.updateOne({_id:"cart"}, {no: no+1});
    // console.log('[api/cart] res:', res);
    return NextResponse.json({res}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({error}, { status: 500 });
  }
}
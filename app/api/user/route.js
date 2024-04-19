import { connectToDB } from "@utils/database";
import User from "@models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  // console.log('[api/user] body:', body);
  try {
    await connectToDB();
    const user = await User.findOne(body);
    // console.log('user:',user);
    return NextResponse.json({user});
  } catch (error) {
    console.log(error);
  }
}
import { connectToDB } from "@utils/database";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const {email} = await req.json();
    const user = await User.findOne({_id});
    console.log(user);
    return NextResponse.json({user});
  } catch (error) {
    console.log(error);
  }
}
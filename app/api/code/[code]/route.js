import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import Code from "@models/Code";

export async function GET(req, {params}) {
  const {code} = params;
  // console.log('code:',code);
  try {
    await connectToDB();
    const value = await Code.findOne({_id:code});
    // console.log('value:',value);
    return NextResponse.json(value);
  } catch (error) {
    console.log(error);
  }
}
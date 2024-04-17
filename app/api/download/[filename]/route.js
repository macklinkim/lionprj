import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import ImageDetail from "@models/ImageDetail";

export async function GET(req, {params}){
  try {
    await connectToDB();
    const imageFile = await ImageDetail.findOne({filename:params.filename});
    return NextResponse.json({image:imageFile.image}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

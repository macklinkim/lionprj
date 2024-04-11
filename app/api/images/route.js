import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import FileModel from "@models/FileModel";
import { GridFSBucket } from "mongodb";
export async function GET(req, res) {
  await connectToDB();
  const files = await FileModel.find();
  console.log('myfile', files);
  return NextResponse.json({files});
}

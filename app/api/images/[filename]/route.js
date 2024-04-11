import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import FileModel from "@models/FileModel";
import { GridFSBucket } from "mongodb";
export async function GET(req, res) {
	console.log(req, res);
  return NextResponse.json({ hello:'hello'});
}

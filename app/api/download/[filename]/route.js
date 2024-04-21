import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import ImageDetail from "@models/ImageDetail";
import base64toFile from "@utils/base64toFile";
import path from "path";
import { writeFile, access } from "fs/promises";
import { log } from "console";
export async function GET(req, { params }) {
	const filename = params.filename;
	try {
		await connectToDB();
		const imageFile = await ImageDetail.findOne({ filename: filename });
    
		// log('[api/download] imageFile:', imageFile);
		const file = base64toFile(imageFile.image, filename);
		try {
			const buffer = Buffer.from(imageFile.image.replace('data:image/jpeg;base64', ""), "base64");
			const result = access(path.join(process.cwd(), "/public/assets/images/" + filename));
      await writeFile(path.join(process.cwd(), "/public/assets/images/" + filename), buffer);
		} catch (error) {
			console.log(error);
		}
		return NextResponse.json({ image: imageFile.image }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error }, { status: 500 });
	}
}

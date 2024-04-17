import { connectToDB } from "@utils/database";
import Product from "@models/ProductModel";
import { NextResponse } from "next/server";
import MaxValue from "@models/MaxValue";

export async function GET() {
	try {
		await connectToDB();
		const product = await Product.find();
		return NextResponse.json({ product });
	} catch (error) {
		console.log(error);
	}
}
export async function POST(req) {
	const body = await req.json();
	// console.log("[API PRODUCT POST]req:", body);
	try {
		await connectToDB();
    let max = 0;
		let data = await MaxValue.findOne({collectionName: "Product"});
    if(!data){
      const count = await Product.find();
      max = await Math.max.apply(
        null,
        count.map(r => r._id)
      );
      await MaxValue.create({collectionName: "Product", maxValue: max});
    }else{
      console.log(data);
      max = data.maxValue;
    }
    await MaxValue.findOneAndUpdate({collectionName: "Product"}, {maxValue: max+1});
		console.log("[API PRODUCT POST] create value:", max, body.name, body.description, body.price, body.show, body.active, body.seller_id);
		const res = await Product.create({
			_id: max+1,
			name: body.name,
			content: body.content,
			price: body.price,
			show: body.show,
			active: body.active,
			seller_id: body.seller_id,
      mainImages :[body.filename]
		});
		// console.log("[API PRODUCT POST]responsive:", res);
		return NextResponse.json({ res }, { status: 200 });
	} catch (error) {
		console.log("[API PRODUCT POST]error:", error);
		return NextResponse.json({ error }, { status: 500 });
	}
}

import { connectToDB } from "@utils/database";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
	try {
		const { name, email, password, address1, address2, phone, type } = await req.json();
		const hashedPassword = await bcrypt.hash(password, 10);
		console.log(name, " | ", email, " | ", password, " | ", address1, " | ", phone, " | ", type, "]", address2, " | ");
		await connectToDB();
		const res2 = await User.estimatedDocumentCount();
		const res = await User.create({ _id: res2 + 1, name: name, email: email, password: hashedPassword, address: address1 + " " + address2, phone: phone, type: type, extra: { membershipClass: "MC03" } });

		console.log(res);
		return NextResponse.json({ message: "User registered." }, { status: 201 });
	} catch (error) {
		return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
	}
}

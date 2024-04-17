import { connectToDB } from "@utils/database";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, address, phone, type } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(name," | ", email," | ", password," | ", address," | ", phone," | ", type);
    await connectToDB();
    const res2 = await User.estimatedDocumentCount();
    const res = await User.create({ _id: res2 + 1, name, email, password: hashedPassword, address, phone, type, extra:{membershipClass:'MC03'} });
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
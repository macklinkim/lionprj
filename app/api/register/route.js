import { connectToDB } from "@utils/database";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  console.log('got at register');
  try {
    const { name, email, password, address, phone, type } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(name," | ", email," | ", password," | ", address," | ", phone," | ", type);
    await connectToDB();
    await User.create({ name, email, password: hashedPassword, address, phone, type });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
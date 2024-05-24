import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import User from "@/models/UserModel";

import { connectDB } from "@/utils/db";

export const POST = async (req: NextRequest) => {
  try {

    await connectDB();


    const { name, email, password } = await req.json();

    const isDuplicateEmail = await User.findOne({ email });

    if (isDuplicateEmail) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 403 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ name, email, password: hashedPassword });
    return NextResponse.json(
      { user, message: "User created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.log("User error: ", error);
    return NextResponse.json(
      { message: "Failed to create a new user" },
      { status: 500 }
    );
  }
};

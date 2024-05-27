import { connectDB } from "@/utils/db";

import User from "@/models/UserModel";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { email: string } }
) => {
  try {
    await connectDB();

    const { movieId } = await req.json();
    const { email } = params;

    const user = await User.findOne({ email });

    if (!user) {
      throw NextResponse.json("No user found.", { status: 400 });
    }
    const isFavorite = user.favorites.includes(movieId);

    if (isFavorite) {
      user.favorites = user.favorites.filter((id: number) => id !== movieId);
    } else {
      user.favorites.push(movieId);
    }

    await user.save();

    return NextResponse.json("Movie added to the favorites.", { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error adding to the favorites.", { status: 500 });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { email: string } }
) => {
  try {
    await connectDB();

    const { email } = params;

    const user = await User.findOne({ email });

    if (!user) {
      throw NextResponse.json("No user found.", { status: 404 });
    }

    return NextResponse.json(user.favorites, { status: 200 });
  } catch (error) {
    return NextResponse.json("Failed to fetch the favorites.", { status: 401 });
  }
};

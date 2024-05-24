import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { connectDB } from "@/utils/db";
import bcrypt from "bcrypt";

import User from "@/models/UserModel";

export const options: NextAuthOptions = {
  providers: [
    Credentials({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }
        await connectDB();

        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("Email is not registered. User not found.");
        }

        const isMatchedPassword = await bcrypt.compare(
          credentials?.password,
          user.password
        );

        if (!isMatchedPassword) {
          throw new Error("Invalid password.");
        }

        return user;
      },
    }),
  ],
  pages:{
    signIn:"/authentication"
  },
  secret: process.env.NEXTAUTH_SECRET,
};

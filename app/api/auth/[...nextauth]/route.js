import { User } from "@/app/libs/models";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectDb } from "@/app/libs/mongoDb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

 const login = async (credentials) => {
  try {
    connectDb();
    const user = await User.findOne({ email:credentials.email });
    if (!user ) {
      return NextResponse.json({ message: "El usuario no existe"},{status:501});
    }
    const passwordcorrect = await bcrypt.compare(credentials.password,user.password, );

    if (!passwordcorrect) {
      throw new Error("Credenciales invalidas");
    }
    return user;
  } catch (error) {
    throw new Error("Error al hacer el login");
  }
};

export const authoptions = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",

      credentials: {},
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.username = token.username;
        session.email = token.email;
        session.id = token.id;
      }
      return session;
    },
  },
});

export { authoptions as GET, authoptions as POST };

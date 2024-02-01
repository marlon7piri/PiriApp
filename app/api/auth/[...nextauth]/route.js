import { User } from "@/app/libs/models/usuarios";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectDb } from "@/app/libs/mongoDb";
import bcrypt from "bcrypt";

const login = async (credentials) => {
    connectDb();
    const user = await User.findOne({ email: credentials.email });
    if (!user)  throw new Error("Usuario no encontrado")
      
   
    const passwordcorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!passwordcorrect)   throw new Error("Credenciales invalidas");
   

    return user;
  
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
        
          const user = await login(credentials);

          return user;
       
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }

      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.username = token.username;
        session.email = token.email;
        session.id = token.id;
        session.isAdmin = token.isAdmin;
      }

      return session;
    },
  },
});

export { authoptions as GET, authoptions as POST };

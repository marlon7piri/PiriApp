import { User } from "@/app/libs/models/usuarios";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectDb } from "@/app/libs/mongoDb";
import bcrypt from "bcrypt";

const login = async (credentials) => {
  connectDb();

  const user = await User.findOne({ email: credentials.email });

  if (!user) throw new Error("Usuario no encontrado");

  const passwordcorrect = await bcrypt.compare(
    credentials.password,
    user.password
  );
  if (!passwordcorrect) throw new Error("Credenciales invalidas");


  return user;
};
export const authoptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60 //30 minutos
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
        token.userId = user.userId

      }
      return token;
    },
    async session({ session, token }) {

      if (session.user) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.id = token.id || token.sub; // Usa token.sub como respaldo
        session.user.isAdmin = token.isAdmin;
        session.user.userId = token.userId
      } else {
        session.user = {
          username: token.username,
          email: token.email,
          id: token.id || token.sub, // Usa token.sub si no hay id
          isAdmin: token.isAdmin,
          userId: token.userId
        };
      }

      return session;
    }

  },
}
const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };

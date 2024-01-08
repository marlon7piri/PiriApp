import { User } from "@/app/libs/models";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }), CredentialsProvider({
          name: 'Credentials',
          id: 'credentials',
          credentials: {
            username: { label: "Email", type: "email", placeholder: "test@example.com" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials, req) {
            const email = credentials?.email;
            const password = credentials?.password;
    
            mongoose.connect(process.env.MONGO_URL);
            const user = await User.findOne({email});
            const passwordOk = user && bcrypt.compareSync(password, user.password);
    
            if (passwordOk) {
              return user;
            }
    
            return null
          }
        })
      ]
})

export {handler as GET , handler as POST}
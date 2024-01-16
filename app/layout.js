import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import NextAuthProvider from "./components/NextAuthProvider";
import { ClientProvider } from "./home/context/ClientProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});

export const metadata = {
  title: "Al-Alma Inventario",
  description: "Una aplicacion para tener control de inventario",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <ClientProvider>
          <body className={poppins.className}>
            {children}

            <Toaster />
          </body>
        </ClientProvider>
      </NextAuthProvider>
    </html>
  );
}

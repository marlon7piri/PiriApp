import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { ClientProvider } from "./context/ClientProvider";
import Footer from "./components/Footer";
import { FollowSession } from "./libs/FollowSession";

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
      <ClientProvider>

        <body className={poppins.className}>
          <FollowSession>
            {children}

            </FollowSession>
            <Footer />
            <Toaster />
        
        </body>

      </ClientProvider>
    </html>
  );
}

import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClientProvider } from "./context/ClientProvider";
import Footer from "./components/Footer";
import { FollowSession } from "./libs/FollowSession";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});

export const metadata = {
  title: "PiriApp",
  description: "Gestiona tu inventario",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClientProvider>

        <body className={poppins.className}>
          <FollowSession/>
            {children}

            
            <Footer />
            <Toaster />
        
        </body>

      </ClientProvider>
    </html>
  );
}

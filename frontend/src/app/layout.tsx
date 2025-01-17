"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar"; // Adjust path accordingly
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "../context/UserContext";
import FiltersProvider from "@src/context/FiltersContext";
import Footer from "@src/components/Footer";

const CLIENT_ID =
  "683055403263-8nk173ne786mjmhicqmuod2ufmcdnnec.apps.googleusercontent.com";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <FiltersProvider>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <html lang="en">
            <head>
              <link rel="icon" href="/favicon.ico" />
            </head>
            <body className={inter.className}>
              <NavBar />
              <div className="mb-10"></div>
              {children}
              <Footer />
            </body>
          </html>
        </GoogleOAuthProvider>
      </FiltersProvider>
    </UserProvider>
  );
}

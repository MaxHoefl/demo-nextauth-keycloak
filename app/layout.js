import localFont from "next/font/local";
import "./globals.css";
import { Inter } from 'next/font/google'
import Nav from "@/components/nav";
import AuthStatus from "@/components/authStatus";
import SessionProviderWrapper from "@/utils/sessionProviderWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Demo nextauth keycloak",
  description: "Demo application that showcases the use of nextauth with keycloak",
};

export default function RootLayout({ children }) {
  return (
      <SessionProviderWrapper>
            <html lang="en">
                <body className={inter.className}>
                <div className="flex flex-row">
                    <div className="w-4/5 p-3 h-screen bg-black">{children}</div>
                    <div className="w-1/5 p-3 h-screen bg-gray-700">
                        <h2 className="text-3xl">Demo - frontend</h2>
                        <AuthStatus />
                        <hr />
                        <Nav/>
                    </div>
                </div>
                </body>
            </html>
      </SessionProviderWrapper>
  );
}

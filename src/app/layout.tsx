import "@/styles/globals.css";
import type { Metadata } from "next";
import Provider from "@/providers/Provider";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Fun Learn",
  description: "Tutly",
  icons: {
    icon: "/images/logo2.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider
      refetchInterval={5 * 60} // 5 minutes
      session={session}
    >
      <html lang="en" className="bg-background text-foreground">
        <body className={inter.className}>
          <Toaster />
          <Provider>{children}</Provider>
        </body>
      </html>
    </SessionProvider>
  );
}

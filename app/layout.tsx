import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";

const ibmPlexSans = localFont({
  src: [
    { path: "fonts/ibmplexsans-regular.ttf", weight: "400", style: "normal" },
    { path: "fonts/ibmplexsans-medium.ttf", weight: "500", style: "normal" },
    { path: "fonts/ibmplexsans-semibold.ttf", weight: "600", style: "normal" },
    { path: "fonts/ibmplexsans-bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "fonts/bebasneue-regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "BookWise",
  description:
    "BookWise is a book borrowing university library management system.",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;

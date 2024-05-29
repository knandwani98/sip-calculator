import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/providers/StoreProvider";
import { cn } from "@/lib/utils";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={cn(sora.className, "text-xs sm:text-sm")}>
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}

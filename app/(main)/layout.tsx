import { HeroUIProvider } from "@heroui/react";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frame Game",
  description: "Guess which move wins!",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen bg-zinc-800">
        <HeroUIProvider>{children}</HeroUIProvider>
      </body>
    </html>
  );
}

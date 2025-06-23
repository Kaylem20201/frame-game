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
    <html lang="en" className="ggst">
      <body>
        <HeroUIProvider>
          <main>{children}</main>
        </HeroUIProvider>
      </body>
    </html>
  );
}

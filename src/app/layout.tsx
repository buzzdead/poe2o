import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Toaster2 } from "@/components/ui/sonner"
import "./globals.css";
import { GemsProvider } from "./context/GemsContext";
import Header from "./Header";
import { CharacterProvider } from "./context/CharContext";

export const metadata: Metadata = {
  title: "Poe Overlords",
  description: "Path of Exile 2 fan site - find your class, ascendancy, skills and more - Create your build.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased dark bg-gradient-to-b from-background to-background/95 min-h-screen text-foreground`}
      >
        <GemsProvider>
        <CharacterProvider>
          <Header />
        {children}
        <footer className="mt-16 text-center text-muted-foreground">
        <p>© 2024 Path of Exile 2 - Unofficial Fan Site</p>
      </footer>
      </CharacterProvider>
        </GemsProvider>
        <Toaster />
        <Toaster2 />
      </body>
    </html>
  );
}

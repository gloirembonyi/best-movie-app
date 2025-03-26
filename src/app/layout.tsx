import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreamLoom - Your Movie Destination",
  description: "Discover the latest movies, trending titles, and classic films",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-gray-900 py-4">
            <div className="container mx-auto px-4">
              <h1 className="text-2xl font-bold">StreamLoom</h1>
            </div>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="bg-gray-900 py-4 mt-8">
            <div className="container mx-auto px-4 text-center">
              <p>© {new Date().getFullYear()} StreamLoom</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

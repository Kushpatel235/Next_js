import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Library",
  description: "Manage your book collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <nav className="bg-blue-600 p-4 text-white">
          <div className="container mx-auto flex gap-6">
            <Link href="/" className="text-xl font-bold">
              Book Library
            </Link>
            <Link href="/books" className="hover:underline">
              Books
            </Link>
            <Link href="/add-book" className="hover:underline">
              Add Book
            </Link>
            <Link href="/login" className="ml-auto hover:underline">
              Login
            </Link>
          </div>
        </nav>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}

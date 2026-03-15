import "./globals.css";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        {/* HEADER */}
        <header className="border-b border-gray-100 py-4 px-10 flex justify-between items-center max-w-[1184px] mx-auto w-full">
          <Link href="/" className="text-2xl font-bold flex items-center">
            Rental<span className="text-[#3470FF]">Car</span>
          </Link>
          <nav className="flex gap-8 font-medium">
            <Link href="/" className="hover:text-[#3470FF] transition-colors">
              Home
            </Link>
            <Link
              href="/catalog"
              className="hover:text-[#3470FF] transition-colors"
            >
              Catalog
            </Link>
          </nav>
        </header>

        {/* ОСНОВНИЙ КОНТЕНТ */}
        {children}

        <Toaster position="top-right" />
      </body>
    </html>
  );
}

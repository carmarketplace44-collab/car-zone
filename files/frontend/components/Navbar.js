import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-800 text-white shadow sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-2xl tracking-tight hover:text-blue-200 transition">
          CarZone
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/" className="hover:text-blue-200 focus:text-blue-200 px-2 py-1 rounded transition">Home</Link>
          <Link href="/browse" className="hover:text-blue-200 focus:text-blue-200 px-2 py-1 rounded transition">Browse Cars</Link>
          <Link href="/dealer-dashboard" className="hover:text-blue-200 focus:text-blue-200 px-2 py-1 rounded transition">Dealer Dashboard</Link>
          <Link href="/dealer-login" className="bg-white text-blue-800 px-3 py-1 rounded font-semibold shadow hover:bg-blue-100 focus:bg-blue-100 transition">Dealer Login</Link>
        </div>
      </div>
    </nav>
  );
}
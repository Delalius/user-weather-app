import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUsers, FaSave } from "react-icons/fa";

/**
 * Header component with app title and navigation links.
 * Highlights active route.
 */
export default function Header() {
  // Get current path to highlight active navigation link
  const pathname = usePathname();

  return (
    <header className="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-md p-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* App title */}
        <h1 className="text-2xl font-semibold text-white tracking-wide text-center sm:text-left">
          User Weather App
        </h1>

        {/* Navigation menu */}
        <nav className="flex gap-8">
          {/* Users page link */}
          <Link
            href="/"
            className={`flex items-center gap-2 text-sm sm:text-base transition-colors ${
              pathname === "/"
                ? "text-cyan-400"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <FaUsers />
            Users
          </Link>

          {/* Saved page link */}
          <Link
            href="/saved"
            className={`flex items-center gap-2 text-sm sm:text-base transition-colors ${
              pathname === "/saved"
                ? "text-cyan-400"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <FaSave />
            Saved
          </Link>
        </nav>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Breadcrumbs component to show the current page hierarchy
 * based on the URL path segments.
 */
export default function Breadcrumbs() {
  // Get the current path from Next.js router
  const pathname = usePathname();

  // Split pathname into segments, ignoring empty strings
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm breadcrumbs my-4" aria-label="Breadcrumb">
      <ul className="flex flex-wrap items-center space-x-1 text-gray-600">
        {/* Root link */}
        <li>
          <Link href="/" className="hover:underline text-white">
            Users
          </Link>
        </li>

        {/* Map over segments to build the breadcrumb trail */}
        {segments.map((segment, index) => {
          // Build the href path up to current segment
          const href = "/" + segments.slice(0, index + 1).join("/");

          // Decode URI and replace dashes with spaces for display
          const label = decodeURIComponent(segment).replace(/-/g, " ");

          // Check if this is the last segment (current page)
          const isLast = index === segments.length - 1;

          return (
            <li key={href} className="flex items-center space-x-1">
              {/* Separator */}
              <span className="mx-1 text-gray-400" aria-hidden="true">
                /
              </span>

              {/* Last segment is plain text with underline, others are links */}
              {isLast ? (
                <span className="text-white underline" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link href={href} className="hover:underline text-white">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

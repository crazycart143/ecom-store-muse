"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  if (paths.length === 0) return null;

  return (
    <nav className="flex mb-8 text-xs font-bold uppercase tracking-widest text-gray-400" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
        </li>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === paths.length - 1;
          const label = path.replace(/-/g, " ");

          return (
            <li key={path} className="flex items-center space-x-2">
              <span className="text-gray-300">/</span>
              {isLast ? (
                <span className="text-black">{label}</span>
              ) : (
                <Link href={href} className="hover:text-black transition-colors">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

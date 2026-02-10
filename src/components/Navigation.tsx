"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/lib/types";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-neutral-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-1 overflow-x-auto no-scrollbar">
          <Link
            href="/"
            className={`px-4 py-3 text-xs tracking-widest uppercase font-medium transition-colors shrink-0 ${
              pathname === "/"
                ? "text-signal-red border-b-2 border-signal-red"
                : "text-neutral-600 hover:text-signal-black"
            }`}
          >
            Home
          </Link>
          {CATEGORIES.map((cat) => {
            const href = `/category/${cat.slug}`;
            const isActive = pathname === href;
            return (
              <Link
                key={cat.slug}
                href={href}
                className={`px-4 py-3 text-xs tracking-widest uppercase font-medium transition-colors shrink-0 ${
                  isActive
                    ? "text-signal-red border-b-2 border-signal-red"
                    : "text-neutral-600 hover:text-signal-black"
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

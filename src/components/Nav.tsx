"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

export function Nav() {
  const { theme, toggle } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="OpenAgent" className="w-8 h-8" />
          <span className="font-bold text-lg text-gray-900 dark:text-white">OpenAgent</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/agents" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
            Agents
          </Link>
          <a href="https://github.com/openagent-spec/spec" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition" target="_blank">
            Spec
          </a>
          <a href="https://github.com/openagent-spec" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition" target="_blank">
            GitHub
          </a>
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

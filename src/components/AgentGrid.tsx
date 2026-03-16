"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import type { Agent } from "@/lib/registry";

const PAGE_SIZE = 24;

export function AgentGrid({
  agents,
  categories,
  total,
}: {
  agents: Agent[];
  categories: string[];
  total: number;
}) {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return agents.filter((a) => {
      if (selectedCategories.size > 0 && !selectedCategories.has(a.category)) return false;
      if (q && !a.name.toLowerCase().includes(q) && !a.description.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [agents, search, selectedCategories]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset page when filters change
  useMemo(() => { setPage(1); }, [search, selectedCategories]);

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  return (
    <>
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search agents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`px-3 py-1.5 text-sm rounded-full border transition ${
              selectedCategories.has(cat)
                ? "bg-blue-500/20 border-blue-500/40 text-blue-600 dark:text-blue-400"
                : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count + pagination info */}
      <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 text-sm mb-6">
        <span>
          {filtered.length === total
            ? `${total} Agents`
            : `${filtered.length} of ${total} Agents`}
        </span>
        {totalPages > 1 && (
          <span>Page {page} of {totalPages}</span>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paged.map((agent) => (
          <Link
            key={agent.id}
            href={`/agents/${agent.id}`}
            className="p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm dark:shadow-none transition group"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl shrink-0">{agent.emoji}</span>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition truncate">
                  {agent.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">{agent.description}</p>
                <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300">
                  {agent.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-500 py-20">No agents found.</div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-sm transition disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/10"
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm transition ${
                p === page
                  ? "bg-blue-500/20 border border-blue-500/40 text-blue-600 dark:text-blue-400"
                  : "border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-sm transition disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/10"
          >
            Next →
          </button>
        </div>
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import type { Agent } from "@/lib/registry";

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

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return agents.filter((a) => {
      if (selectedCategories.size > 0 && !selectedCategories.has(a.category)) return false;
      if (q && !a.name.toLowerCase().includes(q) && !a.description.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [agents, search, selectedCategories]);

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
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
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
                ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="text-gray-400 text-sm mb-6">
        {filtered.length === total
          ? `${total} Agents`
          : `${filtered.length} of ${total} Agents`}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((agent) => (
          <Link
            key={agent.id}
            href={`/agents/${agent.id}`}
            className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition group"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl shrink-0">{agent.emoji}</span>
              <div className="min-w-0">
                <h3 className="font-semibold text-white group-hover:text-blue-400 transition truncate">
                  {agent.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{agent.description}</p>
                <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-white/10 text-gray-300">
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
    </>
  );
}

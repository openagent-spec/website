"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

const tabs = ["Overview", "Persona", "Manifest"] as const;
type Tab = (typeof tabs)[number];

export function AgentTabs({
  readme,
  soul,
  yaml,
}: {
  readme: string;
  soul: string;
  yaml: string;
}) {
  const [active, setActive] = useState<Tab>("Overview");

  return (
    <div>
      <div className="flex gap-1 border-b border-gray-200 dark:border-white/10 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition border-b-2 -mb-px ${
              active === tab
                ? "border-blue-500 dark:border-blue-400 text-gray-900 dark:text-white"
                : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {active === "Overview" && (
        <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-blue-600 dark:prose-code:text-blue-300 prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-white/10">
          {readme ? (
            <ReactMarkdown>{readme}</ReactMarkdown>
          ) : (
            <p className="text-gray-500">No README available.</p>
          )}
        </div>
      )}

      {active === "Persona" && (
        <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-blue-600 dark:prose-code:text-blue-300 prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-white/10">
          {soul ? (
            <ReactMarkdown>{soul}</ReactMarkdown>
          ) : (
            <p className="text-gray-500">No SOUL.md available.</p>
          )}
        </div>
      )}

      {active === "Manifest" && (
        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-900/50 overflow-hidden shadow-sm dark:shadow-none min-w-0">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-gray-900/80">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-sm text-gray-500">agent.yaml</span>
          </div>
          <pre className="p-6 text-sm leading-relaxed overflow-x-auto max-w-full">
            <code className="text-gray-700 dark:text-gray-300 break-words whitespace-pre-wrap">{yaml || "No agent.yaml available."}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

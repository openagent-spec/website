import { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { AgentGrid } from "@/components/AgentGrid";
import { fetchRegistry } from "@/lib/registry";

export const metadata: Metadata = {
  title: "Agent Market — OpenAgent",
  description: "Browse the OpenAgent registry — discover AI agents across categories.",
};

export default async function AgentsPage() {
  const registry = await fetchRegistry();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white">
      <Nav />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Agent Market</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Discover AI agents built on the OpenAgent spec.
          </p>
          <AgentGrid
            agents={registry.agents}
            categories={registry.categories}
            total={registry.total}
          />
        </div>
      </main>
    </div>
  );
}

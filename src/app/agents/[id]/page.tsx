import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { AgentTabs } from "@/components/AgentTabs";
import { AgentSidebar } from "@/components/AgentSidebar";
import {
  fetchRegistry,
  fetchAgentYaml,
  fetchAgentReadme,
  fetchAgentSoul,
  parseAgentYaml,
} from "@/lib/registry";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const registry = await fetchRegistry();
  const agent = registry.agents.find((a) => a.id === id);
  if (!agent) return { title: "Agent Not Found — OpenAgent" };
  return {
    title: `${agent.emoji} ${agent.name} — OpenAgent`,
    description: agent.description,
  };
}

export default async function AgentDetailPage({ params }: Props) {
  const { id } = await params;
  const registry = await fetchRegistry();
  const agent = registry.agents.find((a) => a.id === id);

  if (!agent) notFound();

  const [yaml, readme, soul] = await Promise.all([
    fetchAgentYaml(agent.path),
    fetchAgentReadme(agent.path),
    fetchAgentSoul(agent.path),
  ]);

  const manifest = parseAgentYaml(yaml);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white">
      <Nav />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/agents"
            className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition mb-8"
          >
            ← Back to Agents
          </Link>

          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <span className="text-6xl">{agent.emoji}</span>
            <div>
              <h1 className="text-3xl font-bold">{agent.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{agent.description}</p>
              <span className="inline-block mt-2 px-2.5 py-1 text-xs rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-600 dark:text-blue-400">
                {agent.category}
              </span>
            </div>
          </div>

          {/* Content + Sidebar */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <AgentTabs readme={readme} soul={soul} yaml={yaml} />

            {manifest && (
              <div className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
                <AgentSidebar manifest={manifest} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

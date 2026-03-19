import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { AgentTabs } from "@/components/AgentTabs";
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

function SidebarRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">{label}</span>
      <span>{children}</span>
    </div>
  );
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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <AgentTabs readme={readme} soul={soul} yaml={yaml} manifest={manifest} />

            {/* Slim sidebar — meta info only */}
            {manifest && (
              <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
                <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none p-5">
                  <div className="space-y-3">
                    {manifest.version && (
                      <SidebarRow label="Version">
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                          v{manifest.version}
                        </span>
                      </SidebarRow>
                    )}
                    {manifest.author && (
                      <SidebarRow label="Author">
                        {manifest.repository ? (
                          <a href={manifest.repository} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                            {manifest.author}
                          </a>
                        ) : (
                          <span className="text-sm">{manifest.author}</span>
                        )}
                      </SidebarRow>
                    )}
                    {manifest.license && (
                      <SidebarRow label="License">
                        <span className="text-sm">{manifest.license}</span>
                      </SidebarRow>
                    )}
                    {manifest.homepage && (
                      <SidebarRow label="Homepage">
                        <a href={manifest.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm truncate max-w-[140px] inline-block">
                          {manifest.homepage.replace(/^https?:\/\//, "")}
                        </a>
                      </SidebarRow>
                    )}
                    {manifest.repository && (
                      <SidebarRow label="Repository">
                        <a href={manifest.repository} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm truncate max-w-[140px] inline-block">
                          {manifest.repository.replace(/^https?:\/\//, "")}
                        </a>
                      </SidebarRow>
                    )}
                    {manifest.marketplace?.category && (
                      <SidebarRow label="Category">
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                          {manifest.marketplace.category}
                        </span>
                      </SidebarRow>
                    )}
                  </div>
                </div>

                {/* Tags */}
                {manifest.marketplace?.tags && manifest.marketplace.tags.length > 0 && (
                  <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none p-5">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Tags</div>
                    <div className="flex flex-wrap gap-1.5">
                      {manifest.marketplace.tags.map((tag) => (
                        <span key={tag} className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing */}
                {manifest.marketplace?.pricing && (manifest.marketplace.pricing.model || manifest.marketplace.pricing.base || manifest.marketplace.pricing.trial != null) && (
                  <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none p-5">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Pricing</div>
                    <div className="space-y-2">
                      {manifest.marketplace.pricing.model && (
                        <SidebarRow label="Model"><span className="text-sm">{manifest.marketplace.pricing.model}</span></SidebarRow>
                      )}
                      {manifest.marketplace.pricing.base && (
                        <SidebarRow label="Base"><span className="text-sm">{manifest.marketplace.pricing.base}</span></SidebarRow>
                      )}
                      {manifest.marketplace.pricing.trial != null && (
                        <SidebarRow label="Trial"><span className="text-sm">{manifest.marketplace.pricing.trial} days</span></SidebarRow>
                      )}
                    </div>
                  </div>
                )}
              </aside>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

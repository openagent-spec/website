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

  // Parse some info from yaml for sidebar
  const yamlLines = yaml.split("\n");
  const getField = (key: string) => {
    const line = yamlLines.find((l) => l.startsWith(`${key}:`));
    if (!line) return null;
    return line.slice(key.length + 1).trim().replace(/^["']|["']$/g, "");
  };

  const author = getField("author") || getField("  name");
  const license = getField("license");

  // Extract marketplace pricing
  const pricingIdx = yamlLines.findIndex((l) => l.trim().startsWith("pricing:"));
  let pricing: Record<string, string> = {};
  if (pricingIdx !== -1) {
    for (let i = pricingIdx + 1; i < yamlLines.length; i++) {
      const line = yamlLines[i];
      if (line.trim() === "" || (!line.startsWith("    ") && !line.startsWith("\t\t"))) break;
      const match = line.trim().match(/^(\w+):\s*(.+)/);
      if (match) pricing[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }

  // Extract tags
  const tagsIdx = yamlLines.findIndex((l) => l.trim() === "tags:");
  let tags: string[] = [];
  if (tagsIdx !== -1) {
    for (let i = tagsIdx + 1; i < yamlLines.length; i++) {
      const line = yamlLines[i].trim();
      if (line.startsWith("- ")) tags.push(line.slice(2).replace(/^["']|["']$/g, ""));
      else break;
    }
  }

  // Extract frameworks
  const frameworkIdx = yamlLines.findIndex((l) => l.trim() === "frameworks:");
  let frameworks: string[] = [];
  if (frameworkIdx !== -1) {
    for (let i = frameworkIdx + 1; i < yamlLines.length; i++) {
      const line = yamlLines[i].trim();
      if (line.startsWith("- ")) frameworks.push(line.slice(2).replace(/^["']|["']$/g, ""));
      else break;
    }
  }

  const hasSidebar = author || license || Object.keys(pricing).length > 0 || tags.length > 0 || frameworks.length > 0;

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
          <div className={`grid gap-8 ${hasSidebar ? "lg:grid-cols-[1fr_280px]" : ""}`}>
            <AgentTabs readme={readme} soul={soul} yaml={yaml} />

            {hasSidebar && (
              <aside className="space-y-6">
                {/* Info card */}
                <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none p-5 space-y-4">
                  {author && (
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Author</div>
                      <div className="text-sm">{author}</div>
                    </div>
                  )}
                  {license && (
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">License</div>
                      <div className="text-sm">{license}</div>
                    </div>
                  )}
                  {Object.keys(pricing).length > 0 && (
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pricing</div>
                      <div className="text-sm space-y-1">
                        {Object.entries(pricing).map(([k, v]) => (
                          <div key={k}>
                            <span className="text-gray-600 dark:text-gray-400">{k}:</span> {v}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none p-5">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Frameworks */}
                {frameworks.length > 0 && (
                  <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none p-5">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                      Frameworks
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {frameworks.map((fw) => (
                        <span
                          key={fw}
                          className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30"
                        >
                          {fw}
                        </span>
                      ))}
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

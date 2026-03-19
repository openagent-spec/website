"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { AgentManifest } from "@/lib/registry";

const tabs = ["Overview", "Persona", "Capabilities", "Experience", "Manifest"] as const;
type Tab = (typeof tabs)[number];

const LEVEL_EMOJI: Record<string, string> = {
  junior: "🌱",
  mid: "🌿",
  senior: "🌳",
  expert: "⭐",
};

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none p-5">
      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Badge({ children, color = "gray" }: { children: React.ReactNode; color?: "gray" | "green" | "blue" | "purple" | "red" }) {
  const colors = {
    gray: "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300",
    green: "bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/30",
    blue: "bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30",
    purple: "bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30",
    red: "bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30",
  };
  return <span className={`inline-block px-2 py-1 text-xs rounded-full ${colors[color]}`}>{children}</span>;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">{label}</span>
      <span>{children}</span>
    </div>
  );
}

const proseClasses = "prose prose-sm dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-blue-600 dark:prose-code:text-blue-300 prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-white/10";

function CapabilitiesTab({ manifest }: { manifest: AgentManifest }) {
  const { persona, skills, adapters, model, collaboration, runtime } = manifest;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* Persona Card */}
      {persona && (
        <Card title="Persona">
          <div className="space-y-3">
            {persona.style && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Style</div>
                <div className="text-sm italic text-gray-700 dark:text-gray-300">{persona.style}</div>
              </div>
            )}
            {persona.tone && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Tone</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{persona.tone}</div>
              </div>
            )}
            {persona.language && persona.language.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Languages</div>
                <div className="flex flex-wrap gap-1.5">
                  {persona.language.map((lang) => <Badge key={lang} color="blue">{lang}</Badge>)}
                </div>
              </div>
            )}
            {persona.principles && persona.principles.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Principles</div>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                  {persona.principles.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Model Requirements Card */}
      {model && (model.minimum || model.recommended || model.context_window) && (
        <Card title="Model Requirements">
          <div className="space-y-2">
            {model.minimum && <Row label="Minimum"><Badge color="blue">{model.minimum}</Badge></Row>}
            {model.recommended && <Row label="Recommended"><Badge color="green">{model.recommended}</Badge></Row>}
            {model.context_window && <Row label="Context Window"><span className="text-sm">{model.context_window}</span></Row>}
          </div>
        </Card>
      )}

      {/* Skills Card */}
      {skills && skills.length > 0 && (
        <Card title="Skills">
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <Badge key={s.name} color="blue">
                {s.name}{s.version ? ` v${s.version}` : ""}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Collaboration Card */}
      {collaboration && (collaboration.can_delegate != null || collaboration.can_receive != null || collaboration.protocols?.length) && (
        <Card title="Collaboration">
          <div className="space-y-2">
            {collaboration.can_delegate != null && (
              <Row label="Can Delegate">
                <Badge color={collaboration.can_delegate ? "green" : "gray"}>{collaboration.can_delegate ? "Yes" : "No"}</Badge>
              </Row>
            )}
            {collaboration.can_receive != null && (
              <Row label="Can Receive">
                <Badge color={collaboration.can_receive ? "green" : "gray"}>{collaboration.can_receive ? "Yes" : "No"}</Badge>
              </Row>
            )}
            {collaboration.protocols && collaboration.protocols.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Protocols</div>
                <div className="flex flex-wrap gap-1.5">
                  {collaboration.protocols.map((p) => <Badge key={p}>{p}</Badge>)}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Frameworks Card */}
      {adapters?.frameworks && adapters.frameworks.length > 0 && (
        <Card title="Frameworks">
          <div className="flex flex-wrap gap-1.5">
            {adapters.frameworks.map((fw) => (
              <Badge key={fw.name} color={fw.native ? "green" : "purple"}>
                {fw.name}{fw.version ? ` v${fw.version}` : ""}{fw.native ? " (native)" : ""}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Runtime Card */}
      {runtime && (runtime.platform?.length || runtime.dependencies?.length || runtime.sandbox) && (
        <Card title="Runtime">
          <div className="space-y-3">
            {runtime.platform && runtime.platform.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Platform</div>
                <div className="flex flex-wrap gap-1.5">
                  {runtime.platform.map((p) => <Badge key={p} color="blue">{p}</Badge>)}
                </div>
              </div>
            )}
            {runtime.dependencies && runtime.dependencies.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Dependencies</div>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-0.5 list-disc list-inside">
                  {runtime.dependencies.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </div>
            )}
            {runtime.sandbox && <Row label="Sandbox"><Badge>{runtime.sandbox}</Badge></Row>}
          </div>
        </Card>
      )}

      {/* Tools Card */}
      {adapters?.tools && (adapters.tools.required?.length || adapters.tools.recommended?.length || adapters.tools.optional?.length) && (
        <Card title="Tools">
          <div className="space-y-3">
            {(["required", "recommended", "optional"] as const).map((tier) => {
              const items = adapters.tools?.[tier];
              if (!items || items.length === 0) return null;
              const tierColors = { required: "red" as const, recommended: "blue" as const, optional: "gray" as const };
              return (
                <div key={tier}>
                  <div className="text-xs text-gray-500 mb-1 capitalize">{tier}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((t) => (
                      <span key={t.name} title={t.reason || undefined}>
                        <Badge color={tierColors[tier]}>{t.name}</Badge>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Services Card */}
      {adapters?.services && adapters.services.length > 0 && (
        <Card title="Services">
          <div className="flex flex-wrap gap-1.5">
            {adapters.services.map((s) => (
              <Badge key={s.name} color="blue">
                {s.name} <span className="opacity-60">({s.type})</span>
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Agent Apps Card */}
      {adapters?.agent_apps && adapters.agent_apps.length > 0 && (
        <Card title="Agent Apps">
          <div className="space-y-1.5">
            {adapters.agent_apps.map((app) => (
              <div key={app.name} className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">{app.name}</span>
                <span className="text-gray-500 ml-1">({app.role})</span>
                {app.alternatives && app.alternatives.length > 0 && (
                  <span className="text-xs text-gray-400 ml-1">alt: {app.alternatives.join(", ")}</span>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function ExperienceTab({ manifest }: { manifest: AgentManifest }) {
  const { experience } = manifest;

  if (!experience || (!experience.level && !experience.packs && !experience.domains?.length && !experience.highlights?.length)) {
    return <p className="text-gray-500 text-center py-12">No experience data yet.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Level badge */}
      {experience.level && (
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm">
            <span className="text-4xl">{LEVEL_EMOJI[experience.level] || ""}</span>
            <div className="text-left">
              <div className="text-xs text-gray-500 uppercase tracking-wider">Experience Level</div>
              <div className="text-xl font-semibold capitalize text-gray-900 dark:text-white">{experience.level}</div>
            </div>
          </div>
        </div>
      )}

      {/* Pack count */}
      {experience.packs != null && (
        <div className="text-center text-sm text-gray-500">
          <span className="font-medium text-gray-900 dark:text-white">{experience.packs}</span> packs completed
        </div>
      )}

      {/* Domains */}
      {experience.domains && experience.domains.length > 0 && (
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Domains</div>
          <div className="flex flex-wrap gap-2">
            {experience.domains.map((d) => (
              <span key={d} className="px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300">
                {d}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Highlights */}
      {experience.highlights && experience.highlights.length > 0 && (
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Highlights</div>
          <div className="space-y-2">
            {experience.highlights.map((h) => (
              <details key={h.id} className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  {h.id}
                  {h.difficulty && <Badge color="purple">{h.difficulty}</Badge>}
                </summary>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{h.summary}</p>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function AgentTabs({
  readme,
  soul,
  yaml,
  manifest,
}: {
  readme: string;
  soul: string;
  yaml: string;
  manifest: AgentManifest | null;
}) {
  const [active, setActive] = useState<Tab>("Overview");

  return (
    <div>
      <div className="flex gap-1 border-b border-gray-200 dark:border-white/10 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition border-b-2 -mb-px whitespace-nowrap ${
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
        <div className={proseClasses}>
          {readme ? (
            <ReactMarkdown>{readme}</ReactMarkdown>
          ) : (
            <p className="text-gray-500">No README available.</p>
          )}
        </div>
      )}

      {active === "Persona" && (
        <div className={proseClasses}>
          {soul ? (
            <ReactMarkdown>{soul}</ReactMarkdown>
          ) : (
            <p className="text-gray-500">No SOUL.md available.</p>
          )}
        </div>
      )}

      {active === "Capabilities" && (
        manifest ? (
          <CapabilitiesTab manifest={manifest} />
        ) : (
          <p className="text-gray-500">No manifest data available.</p>
        )
      )}

      {active === "Experience" && (
        manifest ? (
          <ExperienceTab manifest={manifest} />
        ) : (
          <p className="text-gray-500">No manifest data available.</p>
        )
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

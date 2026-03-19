import type { AgentManifest } from "@/lib/registry";

const LEVEL_EMOJI: Record<string, string> = {
  junior: "🌱",
  mid: "🌿",
  senior: "🌳",
  expert: "⭐",
};

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none p-5">
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">{title}</div>
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

export function AgentSidebar({ manifest }: { manifest: AgentManifest }) {
  const { persona, skills, adapters, model, experience, collaboration, runtime, marketplace } = manifest;

  return (
    <aside className="space-y-4">
      {/* Agent Info */}
      <Card title="Agent Info">
        <div className="space-y-3">
          {manifest.version && <Row label="Version"><Badge color="blue">v{manifest.version}</Badge></Row>}
          {manifest.author && (
            <Row label="Author">
              {manifest.repository ? (
                <a href={manifest.repository} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">{manifest.author}</a>
              ) : (
                <span className="text-sm">{manifest.author}</span>
              )}
            </Row>
          )}
          {manifest.license && <Row label="License"><span className="text-sm">{manifest.license}</span></Row>}
          {manifest.homepage && (
            <Row label="Homepage">
              <a href={manifest.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm truncate max-w-[160px] inline-block">
                {manifest.homepage.replace(/^https?:\/\//, "")}
              </a>
            </Row>
          )}
          {manifest.repository && (
            <Row label="Repository">
              <a href={manifest.repository} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm truncate max-w-[160px] inline-block">
                {manifest.repository.replace(/^https?:\/\//, "")}
              </a>
            </Row>
          )}
        </div>
      </Card>

      {/* Persona */}
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

      {/* Model Requirements */}
      {model && (model.minimum || model.recommended || model.context_window) && (
        <Card title="Model Requirements">
          <div className="space-y-2">
            {model.minimum && <Row label="Minimum"><Badge color="blue">{model.minimum}</Badge></Row>}
            {model.recommended && <Row label="Recommended"><Badge color="green">{model.recommended}</Badge></Row>}
            {model.context_window && <Row label="Context Window"><span className="text-sm">{model.context_window}</span></Row>}
          </div>
        </Card>
      )}

      {/* Experience */}
      {experience && (experience.level || experience.packs || experience.domains?.length || experience.highlights?.length) && (
        <Card title="Experience">
          <div className="space-y-3">
            {experience.level && (
              <Row label="Level">
                <span className="text-sm">{LEVEL_EMOJI[experience.level] || ""} {experience.level}</span>
              </Row>
            )}
            {experience.packs != null && <Row label="Packs"><span className="text-sm">{experience.packs}</span></Row>}
            {experience.domains && experience.domains.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Domains</div>
                <div className="flex flex-wrap gap-1.5">
                  {experience.domains.map((d) => <Badge key={d}>{d}</Badge>)}
                </div>
              </div>
            )}
            {experience.highlights && experience.highlights.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Highlights</div>
                <div className="space-y-2">
                  {experience.highlights.map((h) => (
                    <details key={h.id} className="text-sm">
                      <summary className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                        {h.id}
                        {h.difficulty && <Badge color="purple">{h.difficulty}</Badge>}
                      </summary>
                      <p className="mt-1 text-gray-600 dark:text-gray-400 pl-3">{h.summary}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Skills */}
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

      {/* Adapters */}
      {adapters && (adapters.frameworks?.length || adapters.tools || adapters.agent_apps?.length || adapters.services?.length) && (
        <Card title="Adapters">
          <div className="space-y-3">
            {adapters.frameworks && adapters.frameworks.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Frameworks</div>
                <div className="flex flex-wrap gap-1.5">
                  {adapters.frameworks.map((fw) => (
                    <Badge key={fw.name} color={fw.native ? "green" : "purple"}>
                      {fw.name}{fw.version ? ` v${fw.version}` : ""}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {adapters.tools && (
              <>
                {(["required", "recommended", "optional"] as const).map((tier) => {
                  const items = adapters.tools?.[tier];
                  if (!items || items.length === 0) return null;
                  const tierColors = { required: "red" as const, recommended: "blue" as const, optional: "gray" as const };
                  return (
                    <div key={tier}>
                      <div className="text-xs text-gray-500 mb-1 capitalize">{tier} Tools</div>
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
              </>
            )}
            {adapters.agent_apps && adapters.agent_apps.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Agent Apps</div>
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
              </div>
            )}
            {adapters.services && adapters.services.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Services</div>
                <div className="flex flex-wrap gap-1.5">
                  {adapters.services.map((s) => (
                    <Badge key={s.name} color="blue">
                      {s.name} <span className="opacity-60">({s.type})</span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Collaboration */}
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

      {/* Runtime */}
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

      {/* Tags */}
      {marketplace?.tags && marketplace.tags.length > 0 && (
        <Card title="Tags">
          <div className="flex flex-wrap gap-1.5">
            {marketplace.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Pricing */}
      {marketplace?.pricing && (marketplace.pricing.model || marketplace.pricing.base || marketplace.pricing.trial != null) && (
        <Card title="Pricing">
          <div className="space-y-2">
            {marketplace.pricing.model && <Row label="Model"><span className="text-sm">{marketplace.pricing.model}</span></Row>}
            {marketplace.pricing.base && <Row label="Base"><span className="text-sm">{marketplace.pricing.base}</span></Row>}
            {marketplace.pricing.trial != null && <Row label="Trial"><span className="text-sm">{marketplace.pricing.trial} days</span></Row>}
          </div>
        </Card>
      )}
    </aside>
  );
}

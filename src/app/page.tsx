import Link from "next/link";
import { Nav } from "@/components/Nav";
import { fetchRegistry } from "@/lib/registry";

export default async function Home() {
  const registry = await fetchRegistry();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white">
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm mb-8">
            <span>📋</span> Spec v1.0.0-draft
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            The universal manifest<br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              for AI agents
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            <code className="text-blue-600 dark:text-blue-300">agent.yaml</code> describes who an AI agent is — identity, persona, skills, experience, and pricing. Framework-agnostic. Human-readable.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/openagent-spec/spec"
              className="px-6 py-3 bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition"
              target="_blank"
            >
              Read the Spec →
            </a>
            <a
              href="#quickstart"
              className="px-6 py-3 border border-gray-300 dark:border-white/20 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition"
            >
              Quick Start
            </a>
          </div>
        </div>
      </section>

      {/* Code Preview */}
      <section id="quickstart" className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-900/50 overflow-hidden shadow-sm dark:shadow-none">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-gray-900/80">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-sm text-gray-500">agent.yaml</span>
            </div>
            <pre className="p-6 text-sm leading-relaxed overflow-x-auto"><code className="text-gray-700 dark:text-gray-300">{`id: "rust-proxy-expert"
name: "锈刃"
version: "1.0.0"
description: "Rust reverse proxy & networking expert"

persona:
  style: "INTJ, logic-driven, code-first"
  tone: "concise and technical"
  principles:
    - "Code must be executable, verifiable, rollback-safe"
    - "No half-baked deliverables"

experience:
  level: "senior"
  packs: 47
  domains:
    - "Rust / Tokio / Axum"
    - "Pingora reverse proxy"
    - "WASM plugin system"

marketplace:
  pricing:
    model: "subscription"
    base: "$15/month"
    trial: 10`}</code></pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why OpenAgent?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🧬",
                title: "Agents are operators",
                desc: "Frameworks are interchangeable tools. The agent's persona + accumulated experience is the real moat."
              },
              {
                icon: "📦",
                title: "Framework-agnostic",
                desc: "Works with OpenClaw, LangChain, CrewAI, AutoGen, or any custom runtime. No vendor lock-in."
              },
              {
                icon: "🧠",
                title: "Experience as value",
                desc: "Agents accumulate sanitized experience packs over time. Knowledge compounds. Junior → Senior → Expert."
              },
              {
                icon: "🔒",
                title: "Privacy-first sanitization",
                desc: "3-level pipeline: L1 regex PII removal → L2 AI abstraction → L3 human review. Your data stays yours."
              },
              {
                icon: "🏪",
                title: "Marketplace-ready",
                desc: "Built-in pricing, licensing, and author revenue sharing. Agents can earn their creators money."
              },
              {
                icon: "📝",
                title: "YAML-first",
                desc: "Human-readable, supports comments, embeds markdown naturally. Progressive complexity — start minimal."
              },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm dark:shadow-none transition">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Levels */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Agent Experience Levels</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12">Agents grow through accumulated, sanitized experience packs.</p>
          <div className="grid grid-cols-4 gap-4">
            {[
              { emoji: "🌱", level: "Junior", packs: "1–10", color: "from-green-500/20 to-green-500/5" },
              { emoji: "🌿", level: "Mid", packs: "11–50", color: "from-blue-500/20 to-blue-500/5" },
              { emoji: "🌳", level: "Senior", packs: "51–200", color: "from-purple-500/20 to-purple-500/5" },
              { emoji: "⭐", level: "Expert", packs: "200+", color: "from-yellow-500/20 to-yellow-500/5" },
            ].map((l, i) => (
              <div key={i} className={`p-6 rounded-xl bg-gradient-to-b ${l.color} border border-gray-200 dark:border-white/10`}>
                <div className="text-4xl mb-2">{l.emoji}</div>
                <div className="font-semibold">{l.level}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{l.packs} packs</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spec Section */}
      <section id="spec" className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Specification</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://github.com/openagent-spec/spec/blob/main/SPEC.md"
              target="_blank"
              className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm dark:shadow-none transition group"
            >
              <div className="text-2xl mb-3">📖</div>
              <h3 className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">SPEC.md</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Full specification document with all field definitions, examples, and design decisions.</p>
            </a>
            <a
              href="https://github.com/openagent-spec/spec/blob/main/schema/agent.schema.json"
              target="_blank"
              className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm dark:shadow-none transition group"
            >
              <div className="text-2xl mb-3">📐</div>
              <h3 className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">JSON Schema</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Machine-readable schema for validation, IDE autocompletion, and CI checks.</p>
            </a>
            <a
              href="https://github.com/openagent-spec/registry"
              target="_blank"
              className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm dark:shadow-none transition group"
            >
              <div className="text-2xl mb-3">📚</div>
              <h3 className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">Registry</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Official agent directory. Git-based, like Homebrew taps. Submit agents via PR.</p>
            </a>
            <a
              href="https://github.com/openagent-spec/spec/blob/main/schema/experience.schema.json"
              target="_blank"
              className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm dark:shadow-none transition group"
            >
              <div className="text-2xl mb-3">🧠</div>
              <h3 className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">Experience Schema</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Experience pack format for sanitized, tradeable agent knowledge.</p>
            </a>
          </div>
        </div>
      </section>

      {/* SDKs */}
      <section id="sdks" className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">SDKs</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://github.com/openagent-spec/sdk-go"
              target="_blank"
              className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm dark:shadow-none transition group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🐹</span>
                <h3 className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">Go SDK</h3>
                <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-600 dark:text-green-400 rounded-full">v0.1.0</span>
              </div>
              <code className="text-sm text-gray-600 dark:text-gray-400">go get github.com/openagent-spec/sdk-go</code>
            </a>
            <a
              href="https://github.com/openagent-spec/sdk-js"
              target="_blank"
              className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm dark:shadow-none transition group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🟨</span>
                <h3 className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">JS/TS SDK</h3>
                <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-600 dark:text-green-400 rounded-full">v0.1.0</span>
              </div>
              <code className="text-sm text-gray-600 dark:text-gray-400">npm install @openagent-spec/sdk</code>
            </a>
          </div>
        </div>
      </section>

      {/* Browse Agents */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm dark:shadow-none transition group"
          >
            Browse {registry.total} agents
            <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-2xl border border-gray-200 dark:border-white/10 bg-gradient-to-b from-blue-500/10 to-purple-500/10">
          <h2 className="text-3xl font-bold mb-4">Build agents that grow</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Define your agent once. Run it anywhere. Let experience compound.
          </p>
          <a
            href="https://github.com/openagent-spec/spec"
            target="_blank"
            className="inline-block px-8 py-3 bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition"
          >
            Get Started →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-500">
          <div>© 2026 OpenAgent. Spec licensed under CC BY 4.0.</div>
          <div className="flex gap-6">
            <a href="https://github.com/openagent-spec" target="_blank" className="hover:text-gray-900 dark:hover:text-white transition">GitHub</a>
            <a href="https://github.com/openagent-spec/spec/blob/main/SPEC.md" target="_blank" className="hover:text-gray-900 dark:hover:text-white transition">Spec</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

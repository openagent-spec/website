import Link from "next/link";

export function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="OpenAgent" className="w-8 h-8" />
          <span className="font-bold text-lg">OpenAgent</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/agents" className="text-gray-400 hover:text-white transition">
            Agents
          </Link>
          <a href="https://github.com/openagent-spec/spec" className="text-gray-400 hover:text-white transition" target="_blank">
            Spec
          </a>
          <a href="https://github.com/openagent-spec" className="text-gray-400 hover:text-white transition" target="_blank">
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

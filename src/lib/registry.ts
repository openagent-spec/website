const REGISTRY_BASE = "https://raw.githubusercontent.com/openagent-spec/registry/main";

export interface Agent {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: string;
  path: string;
}

export interface Registry {
  version: string;
  total: number;
  categories: string[];
  agents: Agent[];
}

export async function fetchRegistry(): Promise<Registry> {
  const res = await fetch(`${REGISTRY_BASE}/index.json`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch registry");
  return res.json();
}

export async function fetchAgentYaml(path: string): Promise<string> {
  const res = await fetch(`${REGISTRY_BASE}/${path}/agent.yaml`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return "";
  return res.text();
}

export async function fetchAgentReadme(path: string): Promise<string> {
  const res = await fetch(`${REGISTRY_BASE}/${path}/README.md`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return "";
  return res.text();
}

export async function fetchAgentSoul(path: string): Promise<string> {
  const res = await fetch(`${REGISTRY_BASE}/${path}/SOUL.md`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return "";
  return res.text();
}

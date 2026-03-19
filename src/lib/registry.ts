import yaml from "js-yaml";

const REGISTRY_BASE = "https://raw.githubusercontent.com/openagent-spec/registry/main";

export interface Agent {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: string;
  path: string;
}

export interface AgentManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  emoji?: string;
  avatar?: string;
  author?: string;
  license?: string;
  homepage?: string;
  repository?: string;
  persona: {
    style: string;
    tone: string;
    language?: string[];
    principles?: string[];
  };
  skills?: Array<{ name: string; version?: string }>;
  adapters?: {
    frameworks?: Array<{ name: string; version?: string; native?: boolean; adapter?: string }>;
    tools?: {
      required?: Array<{ name: string; reason?: string }>;
      recommended?: Array<{ name: string; reason?: string }>;
      optional?: Array<{ name: string; reason?: string }>;
    };
    agent_apps?: Array<{ name: string; role: string; required?: boolean; alternatives?: string[] }>;
    services?: Array<{ name: string; type: string; version?: string; auth?: string }>;
  };
  model?: {
    minimum?: string;
    recommended?: string;
    context_window?: string;
  };
  experience?: {
    level?: string;
    packs?: number;
    domains?: string[];
    highlights?: Array<{ id: string; summary: string; difficulty?: string }>;
  };
  collaboration?: {
    can_delegate?: boolean;
    can_receive?: boolean;
    protocols?: string[];
  };
  runtime?: {
    platform?: string[];
    dependencies?: string[];
    sandbox?: string;
  };
  marketplace?: {
    category?: string;
    tags?: string[];
    pricing?: { model?: string; base?: string; trial?: number };
    stats?: { users?: number; rating?: number; tasks_completed?: number };
  };
}

export function parseAgentYaml(raw: string): AgentManifest | null {
  try {
    const parsed = yaml.load(raw) as AgentManifest;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
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

const SPEC_BASE = "https://raw.githubusercontent.com/openagent-spec/spec/main";

export async function fetchSpec(): Promise<string> {
  const res = await fetch(`${SPEC_BASE}/SPEC.md`, {
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

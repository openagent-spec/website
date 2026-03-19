import { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SpecContent } from "@/components/SpecContent";
import { fetchSpec } from "@/lib/registry";

export const metadata: Metadata = {
  title: "OpenAgent Specification — OpenAgent",
  description:
    "The OpenAgent Specification defines a universal manifest format for AI agents.",
};

export default async function SpecPage() {
  const markdown = await fetchSpec();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white">
      <Nav />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">OpenAgent Specification</h1>
              <span className="inline-block px-2.5 py-1 text-xs rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-600 dark:text-blue-400">
                v1.0.0-draft
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              The universal manifest format for AI agents.
            </p>
          </div>

          {markdown ? (
            <SpecContent markdown={markdown} />
          ) : (
            <p className="text-gray-500">
              Unable to load the specification. Please try again later.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

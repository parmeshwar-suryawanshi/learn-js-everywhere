import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { TOPICS, SECTIONS, getTopic } from "@/lib/tutorial-content";

export const Route = createFileRoute("/learn/$slug")({
  component: LearnPage,
  loader: ({ params }) => {
    const topic = getTopic(params.slug);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.topic.title ?? "JS Tutorial"} | JS Tutorial` },
      {
        name: "description",
        content: `Learn ${loaderData?.topic.title ?? "JavaScript"} with clear examples and original explanations.`,
      },
    ],
  }),
});

function LearnPage() {
  const { topic } = Route.useLoaderData();
  const { slug } = Route.useParams();
  const [open, setOpen] = useState(false);

  const idx = TOPICS.findIndex((t) => t.slug === slug);
  const prev = idx > 0 ? TOPICS[idx - 1] : null;
  const next = idx < TOPICS.length - 1 ? TOPICS[idx + 1] : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="rounded bg-yellow-400 px-2 py-1 font-mono text-sm font-bold text-slate-900">
            JS
          </span>
          <span className="font-semibold">JavaScript Tutorial</span>
        </Link>
        <button
          className="rounded border border-slate-300 px-3 py-1 text-sm md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <div className="mx-auto flex max-w-7xl">
        <aside
          className={`${
            open ? "block" : "hidden"
          } w-full shrink-0 border-r border-slate-200 bg-white md:sticky md:top-[57px] md:block md:h-[calc(100vh-57px)] md:w-72 md:overflow-y-auto`}
        >
          <nav className="p-4">
            {SECTIONS.map((section) => (
              <div key={section} className="mb-5">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {section}
                </h3>
                <ul className="space-y-1">
                  {TOPICS.filter((t) => t.section === section).map((t) => {
                    const active = t.slug === slug;
                    return (
                      <li key={t.slug}>
                        <Link
                          to="/learn/$slug"
                          params={{ slug: t.slug }}
                          onClick={() => setOpen(false)}
                          className={`block rounded px-3 py-1.5 text-sm transition-colors ${
                            active
                              ? "bg-yellow-100 font-medium text-slate-900"
                              : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {t.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-8 md:px-10">
          <article className="mx-auto max-w-3xl">
            <p className="mb-1 text-sm font-medium uppercase tracking-wider text-yellow-700">
              {topic.section}
            </p>
            <h1 className="mb-6 text-4xl font-bold tracking-tight">{topic.title}</h1>
            <div className="text-base">{topic.content}</div>

            <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6">
              {prev ? (
                <Link
                  to="/learn/$slug"
                  params={{ slug: prev.slug }}
                  className="rounded bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-300"
                >
                  ← {prev.title}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  to="/learn/$slug"
                  params={{ slug: next.slug }}
                  className="rounded bg-yellow-400 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-yellow-500"
                >
                  {next.title} →
                </Link>
              ) : (
                <span />
              )}
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}

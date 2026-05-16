import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { TOPICS, SECTIONS, getTopic } from "@/lib/tutorial-content";
import { TryItEditor } from "@/components/TryItEditor";
import { Quiz } from "@/components/Quiz";
import {
  getStoredTheme,
  setStoredTheme,
  getBookmarks,
  toggleBookmark,
  getCompleted,
  markCompleted,
  type Theme,
} from "@/lib/user-prefs";

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
        content: `Learn ${loaderData?.topic.title ?? "JavaScript"} with examples, a sandbox, and a quiz.`,
      },
    ],
  }),
});

function LearnPage() {
  const { topic } = Route.useLoaderData();
  const { slug } = Route.useParams();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const [theme, setTheme] = useState<Theme>("light");
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  // Hydrate from localStorage and system preference.
  useEffect(() => {
    const stored = getStoredTheme();
    const initial: Theme =
      stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    setBookmarks(getBookmarks());
    setCompleted(getCompleted());
  }, []);

  // Apply dark class to <html>.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setStoredTheme(next);
  };

  const onToggleBookmark = () => setBookmarks(new Set(toggleBookmark(slug)));
  const isBookmarked = bookmarks.has(slug);

  const isComplete = completed.has(slug);
  const onToggleComplete = () => setCompleted(new Set(markCompleted(slug, !isComplete)));

  const idx = TOPICS.findIndex((t) => t.slug === slug);
  const prev = idx > 0 ? TOPICS[idx - 1] : null;
  const next = idx < TOPICS.length - 1 ? TOPICS[idx + 1] : null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TOPICS;
    return TOPICS.filter(
      (t) => t.title.toLowerCase().includes(q) || t.section.toLowerCase().includes(q),
    );
  }, [query]);

  const progressPct = Math.round((completed.size / TOPICS.length) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/95 px-4 py-3 shadow-sm backdrop-blur md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="rounded bg-yellow-400 px-2 py-1 font-mono text-sm font-bold text-slate-900">
            JS
          </span>
          <span className="font-semibold">JavaScript Tutorial</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded border border-border bg-background px-3 py-1 text-sm hover:bg-accent"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button
            className="rounded border border-border bg-background px-3 py-1 text-sm md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        <aside
          className={`${
            open ? "block" : "hidden"
          } w-full shrink-0 border-r border-border bg-card md:sticky md:top-[57px] md:block md:h-[calc(100vh-57px)] md:w-72 md:overflow-y-auto`}
        >
          <div className="p-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics…"
              className="mb-3 w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:border-yellow-400"
            />
            <div className="mb-3">
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>
                  {completed.size}/{TOPICS.length} ({progressPct}%)
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded bg-muted">
                <div
                  className="h-full bg-yellow-400 transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <nav>
              {SECTIONS.map((section) => {
                const items = filtered.filter((t) => t.section === section);
                if (items.length === 0) return null;
                return (
                  <div key={section} className="mb-5">
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {section}
                    </h3>
                    <ul className="space-y-1">
                      {items.map((t) => {
                        const active = t.slug === slug;
                        const done = completed.has(t.slug);
                        const bm = bookmarks.has(t.slug);
                        return (
                          <li key={t.slug}>
                            <Link
                              to="/learn/$slug"
                              params={{ slug: t.slug }}
                              onClick={() => setOpen(false)}
                              className={`flex items-center justify-between gap-2 rounded px-3 py-1.5 text-sm transition-colors ${
                                active
                                  ? "bg-yellow-400/20 font-medium text-foreground"
                                  : "text-foreground/80 hover:bg-accent"
                              }`}
                            >
                              <span className="truncate">
                                {done && <span className="mr-1 text-green-500">✓</span>}
                                {t.title}
                              </span>
                              {bm && <span className="text-yellow-500">★</span>}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground">No topics match “{query}”.</p>
              )}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-8 md:px-10">
          <article className="mx-auto max-w-3xl">
            <p className="mb-1 text-sm font-medium uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
              {topic.section}
            </p>
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
              <h1 className="text-4xl font-bold tracking-tight">{topic.title}</h1>
              <div className="flex gap-2">
                <button
                  onClick={onToggleBookmark}
                  className="rounded border border-border bg-background px-3 py-1.5 text-sm hover:bg-accent"
                >
                  {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
                </button>
                <button
                  onClick={onToggleComplete}
                  className={`rounded px-3 py-1.5 text-sm font-medium ${
                    isComplete
                      ? "bg-green-500/20 text-green-700 dark:text-green-300"
                      : "border border-border bg-background hover:bg-accent"
                  }`}
                >
                  {isComplete ? "✓ Completed" : "Mark complete"}
                </button>
              </div>
            </div>

            <div className="text-base">{topic.content}</div>

            <TryItEditor initialCode={topic.tryIt} />

            <Quiz
              questions={topic.quiz}
              onComplete={(passed) => {
                if (passed && !completed.has(slug)) {
                  setCompleted(new Set(markCompleted(slug, true)));
                }
              }}
            />

            <p className="mt-6 text-sm text-muted-foreground">
              Further reading on{" "}
              <a
                href={topic.mdnUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-600 underline hover:text-yellow-700 dark:text-yellow-400"
              >
                MDN Web Docs ↗
              </a>
              . Reference content from MDN is available under the{" "}
              <a
                href="https://creativecommons.org/licenses/by-sa/2.5/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                CC-BY-SA 2.5 license
              </a>
              .
            </p>

            <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
              {prev ? (
                <Link
                  to="/learn/$slug"
                  params={{ slug: prev.slug }}
                  className="rounded bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-accent"
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

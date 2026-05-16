// Tiny localStorage helpers for theme, bookmarks, and reading progress.

const THEME_KEY = "js-tut:theme";
const BOOKMARKS_KEY = "js-tut:bookmarks";
const COMPLETED_KEY = "js-tut:completed";

export type Theme = "light" | "dark";

export const getStoredTheme = (): Theme | null => {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(THEME_KEY);
  return v === "dark" || v === "light" ? v : null;
};

export const setStoredTheme = (t: Theme) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_KEY, t);
};

const readSet = (key: string): Set<string> => {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
};

const writeSet = (key: string, s: Set<string>) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify([...s]));
};

export const getBookmarks = () => readSet(BOOKMARKS_KEY);
export const toggleBookmark = (slug: string) => {
  const s = getBookmarks();
  if (s.has(slug)) s.delete(slug);
  else s.add(slug);
  writeSet(BOOKMARKS_KEY, s);
  return s;
};

export const getCompleted = () => readSet(COMPLETED_KEY);
export const markCompleted = (slug: string, done: boolean) => {
  const s = getCompleted();
  if (done) s.add(slug);
  else s.delete(slug);
  writeSet(COMPLETED_KEY, s);
  return s;
};

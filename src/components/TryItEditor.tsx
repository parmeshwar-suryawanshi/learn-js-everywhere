import { useState } from "react";

export function TryItEditor({ initialCode }: { initialCode: string }) {
  const [code, setCode] = useState(initialCode);
  const [logs, setLogs] = useState<{ kind: "log" | "error"; text: string }[]>([]);

  const run = () => {
    const next: typeof logs = [];
    const fmt = (a: unknown) => {
      try {
        if (typeof a === "string") return a;
        return JSON.stringify(a, null, 2);
      } catch {
        return String(a);
      }
    };
    const sandboxConsole = {
      log: (...args: unknown[]) => next.push({ kind: "log", text: args.map(fmt).join(" ") }),
      error: (...args: unknown[]) => next.push({ kind: "error", text: args.map(fmt).join(" ") }),
      warn: (...args: unknown[]) => next.push({ kind: "log", text: args.map(fmt).join(" ") }),
      info: (...args: unknown[]) => next.push({ kind: "log", text: args.map(fmt).join(" ") }),
    };
    try {
      const fn = new Function("console", `"use strict";\n${code}`);
      const result = fn(sandboxConsole);
      if (result instanceof Promise) {
        result
          .then((v) => {
            if (v !== undefined) next.push({ kind: "log", text: "→ " + fmt(v) });
            setLogs([...next]);
          })
          .catch((e) => {
            next.push({ kind: "error", text: String(e) });
            setLogs([...next]);
          });
      } else if (result !== undefined) {
        next.push({ kind: "log", text: "→ " + fmt(result) });
      }
    } catch (e) {
      next.push({ kind: "error", text: String(e) });
    }
    setLogs(next);
  };

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Try it yourself
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setCode(initialCode);
              setLogs([]);
            }}
            className="rounded border border-border bg-background px-3 py-1 text-xs hover:bg-accent"
          >
            Reset
          </button>
          <button
            onClick={run}
            className="rounded bg-yellow-400 px-3 py-1 text-xs font-semibold text-slate-900 hover:bg-yellow-500"
          >
            ▶ Run
          </button>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        className="block w-full resize-y bg-slate-900 p-3 font-mono text-sm text-slate-100 outline-none"
        rows={Math.max(5, code.split("\n").length + 1)}
      />
      <div className="border-t border-border bg-slate-950 p-3 font-mono text-xs">
        <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-400">Console</div>
        {logs.length === 0 ? (
          <div className="text-slate-500">Click Run to see output…</div>
        ) : (
          logs.map((l, i) => (
            <div key={i} className={l.kind === "error" ? "whitespace-pre-wrap text-red-400" : "whitespace-pre-wrap text-slate-100"}>
              {l.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

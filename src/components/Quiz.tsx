import { useState } from "react";
import type { QuizQuestion } from "@/lib/tutorial-content";

export function Quiz({ questions, onComplete }: { questions: QuizQuestion[]; onComplete?: (passed: boolean) => void }) {
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const score = picked.reduce((s, p, i) => (p === questions[i].answer ? s + 1 : s), 0);
  const allAnswered = picked.every((p) => p !== null);

  const submit = () => {
    setSubmitted(true);
    onComplete?.(score === questions.length);
  };

  const reset = () => {
    setPicked(questions.map(() => null));
    setSubmitted(false);
  };

  return (
    <div className="my-8 rounded-lg border border-border bg-card p-5">
      <h2 className="mb-1 text-xl font-semibold text-foreground">Quick Quiz</h2>
      <p className="mb-4 text-sm text-muted-foreground">Test what you just learned.</p>

      <ol className="space-y-5">
        {questions.map((q, qi) => (
          <li key={qi}>
            <p className="mb-2 font-medium text-foreground">
              {qi + 1}. {q.question}
            </p>
            <div className="space-y-1.5">
              {q.options.map((opt, oi) => {
                const isPicked = picked[qi] === oi;
                const isCorrect = q.answer === oi;
                let cls = "border-border bg-background hover:bg-accent";
                if (submitted) {
                  if (isCorrect) cls = "border-green-500 bg-green-500/10";
                  else if (isPicked) cls = "border-red-500 bg-red-500/10";
                } else if (isPicked) {
                  cls = "border-yellow-400 bg-yellow-400/10";
                }
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => {
                      const next = [...picked];
                      next[qi] = oi;
                      setPicked(next);
                    }}
                    className={`block w-full rounded border px-3 py-2 text-left text-sm transition-colors ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Why: </span>
                {q.explanation}
              </p>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-5 flex items-center justify-between">
        <div className="text-sm">
          {submitted ? (
            <span className="font-medium">
              Score: {score} / {questions.length}{" "}
              {score === questions.length ? "🎉 Perfect!" : score >= questions.length / 2 ? "👍 Nice." : "Try again."}
            </span>
          ) : (
            <span className="text-muted-foreground">{picked.filter((p) => p !== null).length} / {questions.length} answered</span>
          )}
        </div>
        {submitted ? (
          <button onClick={reset} className="rounded border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
            Reset
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={!allAnswered}
            className="rounded bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

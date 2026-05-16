import type { ReactNode } from "react";

export type Topic = {
  slug: string;
  title: string;
  section: string;
  content: ReactNode;
};

const C = ({ children }: { children: string }) => (
  <pre className="my-4 overflow-x-auto rounded-md bg-slate-900 p-4 text-sm text-slate-100">
    <code>{children}</code>
  </pre>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className="my-3 leading-relaxed text-slate-700">{children}</p>
);

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="mt-8 mb-3 text-2xl font-semibold text-slate-900">{children}</h2>
);

const UL = ({ items }: { items: string[] }) => (
  <ul className="my-3 list-disc space-y-1 pl-6 text-slate-700">
    {items.map((it) => (
      <li key={it}>{it}</li>
    ))}
  </ul>
);

export const TOPICS: Topic[] = [
  {
    slug: "introduction",
    title: "JS Introduction",
    section: "Basics",
    content: (
      <>
        <P>
          JavaScript is the programming language of the web. It runs inside every modern browser
          and on servers via runtimes like Node.js, Deno, and Bun. With JavaScript you can change
          the contents of a page, react to user input, talk to APIs, and build full applications.
        </P>
        <H2>What you can do with JavaScript</H2>
        <UL
          items={[
            "Change HTML content and styles on the fly",
            "Validate forms before they are submitted",
            "Fetch data from a server without reloading the page",
            "Build interactive UIs, games, and animations",
            "Run server code, scripts, and command-line tools",
          ]}
        />
        <H2>Your first script</H2>
        <C>{`<script>\n  console.log("Hello from JavaScript!");\n  document.body.innerText = "It works.";\n</script>`}</C>
        <P>
          Save that inside an HTML file, open it in a browser, and check the developer console.
          Everything else in this tutorial builds on this one idea: write code, run it, see the
          result.
        </P>
      </>
    ),
  },
  {
    slug: "syntax",
    title: "JS Syntax",
    section: "Basics",
    content: (
      <>
        <P>
          Syntax is the set of rules for how JavaScript is written. A program is a list of
          statements, and each statement usually ends with a semicolon.
        </P>
        <C>{`let price = 10;\nlet quantity = 3;\nlet total = price * quantity;`}</C>
        <H2>Values, identifiers, and operators</H2>
        <UL
          items={[
            "Values are fixed (literals like 42 or \"hi\") or variable (stored in names you choose).",
            "Identifiers are the names you give variables, functions, and classes.",
            "Operators combine values: + - * / % ** and many more.",
          ]}
        />
        <H2>Comments</H2>
        <C>{`// single line comment\n/*\n  multi\n  line\n  comment\n*/`}</C>
      </>
    ),
  },
  {
    slug: "variables",
    title: "JS Variables",
    section: "Basics",
    content: (
      <>
        <P>
          Variables are named containers for values. JavaScript has three keywords for declaring
          them: <code>let</code>, <code>const</code>, and the older <code>var</code>.
        </P>
        <C>{`let score = 0;        // can be reassigned\nconst PI = 3.14159;   // cannot be reassigned\nvar legacy = true;    // function-scoped, avoid in new code`}</C>
        <H2>Which one should I use?</H2>
        <P>
          Reach for <code>const</code> by default. If you know the value will change later, use{" "}
          <code>let</code>. Skip <code>var</code> unless you are maintaining old code.
        </P>
        <H2>Naming rules</H2>
        <UL
          items={[
            "Start with a letter, underscore, or dollar sign",
            "Case sensitive: total and Total are different",
            "Use camelCase: totalPrice, not total_price",
          ]}
        />
      </>
    ),
  },
  {
    slug: "data-types",
    title: "JS Data Types",
    section: "Basics",
    content: (
      <>
        <P>
          Every value in JavaScript belongs to a type. There are seven primitive types plus the
          object type.
        </P>
        <UL
          items={[
            "string  – text: \"hello\"",
            "number  – any number, integer or decimal",
            "bigint  – arbitrarily large integers: 9007199254740993n",
            "boolean – true or false",
            "null    – an intentional empty value",
            "undefined – a value that has not been set",
            "symbol  – unique identifiers",
            "object  – everything else: arrays, functions, plain objects",
          ]}
        />
        <C>{`typeof "hi"      // "string"\ntypeof 42        // "number"\ntypeof true      // "boolean"\ntypeof undefined // "undefined"\ntypeof null      // "object"  (historical quirk)`}</C>
      </>
    ),
  },
  {
    slug: "operators",
    title: "JS Operators",
    section: "Basics",
    content: (
      <>
        <P>Operators are symbols that act on values.</P>
        <H2>Arithmetic</H2>
        <C>{`2 + 3   // 5\n10 - 4  // 6\n6 * 7   // 42\n9 / 2   // 4.5\n9 % 2   // 1   (remainder)\n2 ** 10 // 1024 (exponent)`}</C>
        <H2>Assignment</H2>
        <C>{`let n = 10;\nn += 5;  // n is now 15\nn *= 2;  // n is now 30`}</C>
        <H2>Comparison and logical</H2>
        <C>{`1 === 1      // true  (strict equality)\n1 == "1"     // true  (loose, avoid)\n1 !== "1"    // true\ntrue && false // false\ntrue || false // true\n!true         // false`}</C>
      </>
    ),
  },
  {
    slug: "strings",
    title: "JS Strings",
    section: "Basics",
    content: (
      <>
        <P>Strings hold text. Use single quotes, double quotes, or backticks.</P>
        <C>{`const name = "Ada";\nconst greeting = \`Hello, \${name}!\`; // template literal`}</C>
        <H2>Useful methods</H2>
        <C>{`"hello".length          // 5\n"hello".toUpperCase()   // "HELLO"\n"  spaced  ".trim()     // "spaced"\n"a,b,c".split(",")      // ["a","b","c"]\n"javascript".includes("script") // true\n"abc".repeat(3)         // "abcabcabc"`}</C>
      </>
    ),
  },
  {
    slug: "numbers",
    title: "JS Numbers",
    section: "Basics",
    content: (
      <>
        <P>
          Numbers in JavaScript are 64-bit floating point. That means very large or very precise
          decimal math can lose accuracy.
        </P>
        <C>{`0.1 + 0.2          // 0.30000000000000004\nNumber.isInteger(5) // true\n(1234.567).toFixed(2) // "1234.57"\nparseInt("42px", 10)  // 42\nparseFloat("3.14em")  // 3.14`}</C>
        <H2>Special values</H2>
        <UL items={["Infinity and -Infinity", "NaN  (not a number) – returned by failed math", "Use Number.isNaN(x) to check for NaN"]} />
      </>
    ),
  },
  {
    slug: "arrays",
    title: "JS Arrays",
    section: "Data",
    content: (
      <>
        <P>An array is an ordered list of values. Indexes start at zero.</P>
        <C>{`const fruits = ["apple", "pear", "kiwi"];\nfruits[0];        // "apple"\nfruits.length;    // 3\nfruits.push("fig"); // add to end\nfruits.pop();       // remove from end`}</C>
        <H2>Iterating</H2>
        <C>{`fruits.forEach(f => console.log(f));\nconst upper = fruits.map(f => f.toUpperCase());\nconst short = fruits.filter(f => f.length <= 4);\nconst joined = fruits.reduce((acc, f) => acc + f, "");`}</C>
      </>
    ),
  },
  {
    slug: "objects",
    title: "JS Objects",
    section: "Data",
    content: (
      <>
        <P>Objects are collections of key/value pairs. Keys are strings (or symbols).</P>
        <C>{`const user = {\n  name: "Mia",\n  age: 29,\n  greet() {\n    return \`Hi, I'm \${this.name}\`;\n  },\n};\n\nuser.name;       // "Mia"\nuser["age"];     // 29\nuser.greet();    // "Hi, I'm Mia"`}</C>
        <H2>Copying and merging</H2>
        <C>{`const a = { x: 1 };\nconst b = { y: 2 };\nconst merged = { ...a, ...b }; // { x: 1, y: 2 }`}</C>
      </>
    ),
  },
  {
    slug: "functions",
    title: "JS Functions",
    section: "Basics",
    content: (
      <>
        <P>Functions are reusable blocks of logic. They take inputs and return a value.</P>
        <C>{`function add(a, b) {\n  return a + b;\n}\n\nconst multiply = (a, b) => a * b;\n\nadd(2, 3);      // 5\nmultiply(4, 5); // 20`}</C>
        <H2>Default and rest parameters</H2>
        <C>{`function greet(name = "friend") {\n  return \`Hello, \${name}\`;\n}\n\nfunction sum(...nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}\n\nsum(1, 2, 3, 4); // 10`}</C>
      </>
    ),
  },
  {
    slug: "scope",
    title: "JS Scope",
    section: "Basics",
    content: (
      <>
        <P>Scope decides where a variable is visible.</P>
        <UL
          items={[
            "Block scope – variables declared with let/const inside { } stay inside",
            "Function scope – variables declared with var stay inside the function",
            "Module scope – top-level variables in a module are private to that module",
            "Global scope – variables attached to window (browser) or globalThis",
          ]}
        />
        <C>{`function outer() {\n  const secret = 42;\n  function inner() {\n    return secret; // inner closes over secret\n  }\n  return inner;\n}\nconst fn = outer();\nfn(); // 42`}</C>
      </>
    ),
  },
  {
    slug: "conditions",
    title: "JS Conditions",
    section: "Control flow",
    content: (
      <>
        <P>Run different code depending on a value.</P>
        <C>{`const hour = 14;\nif (hour < 12) {\n  console.log("morning");\n} else if (hour < 18) {\n  console.log("afternoon");\n} else {\n  console.log("evening");\n}`}</C>
        <H2>Ternary and switch</H2>
        <C>{`const label = hour < 12 ? "AM" : "PM";\n\nswitch (label) {\n  case "AM": console.log("before noon"); break;\n  case "PM": console.log("after noon"); break;\n  default: console.log("unknown");\n}`}</C>
      </>
    ),
  },
  {
    slug: "loops",
    title: "JS Loops",
    section: "Control flow",
    content: (
      <>
        <P>Loops repeat code until a condition is met.</P>
        <C>{`for (let i = 0; i < 3; i++) {\n  console.log(i);\n}\n\nconst items = ["a", "b", "c"];\nfor (const item of items) console.log(item);\n\nlet n = 3;\nwhile (n > 0) {\n  console.log(n);\n  n--;\n}`}</C>
        <H2>Break and continue</H2>
        <C>{`for (let i = 0; i < 10; i++) {\n  if (i === 3) continue; // skip 3\n  if (i === 7) break;    // stop at 7\n  console.log(i);\n}`}</C>
      </>
    ),
  },
  {
    slug: "classes",
    title: "JS Classes",
    section: "Data",
    content: (
      <>
        <P>Classes are a template for creating objects with shared behavior.</P>
        <C>{`class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() {\n    return \`\${this.name} makes a sound\`;\n  }\n}\n\nclass Dog extends Animal {\n  speak() {\n    return \`\${this.name} barks\`;\n  }\n}\n\nnew Dog("Rex").speak(); // "Rex barks"`}</C>
      </>
    ),
  },
  {
    slug: "dom",
    title: "JS DOM",
    section: "Browser",
    content: (
      <>
        <P>
          The DOM (Document Object Model) is the live tree of elements on a page. JavaScript can
          read it and change it.
        </P>
        <C>{`const title = document.querySelector("h1");\ntitle.textContent = "Updated!";\ntitle.classList.add("highlight");\n\nconst newItem = document.createElement("li");\nnewItem.textContent = "Hello";\ndocument.querySelector("ul").appendChild(newItem);`}</C>
      </>
    ),
  },
  {
    slug: "events",
    title: "JS Events",
    section: "Browser",
    content: (
      <>
        <P>Events let your code react to user actions.</P>
        <C>{`const button = document.querySelector("button");\n\nbutton.addEventListener("click", (event) => {\n  console.log("clicked", event.target);\n});\n\nwindow.addEventListener("keydown", (e) => {\n  if (e.key === "Escape") console.log("escape pressed");\n});`}</C>
        <H2>Common events</H2>
        <UL items={["click, dblclick, contextmenu", "keydown, keyup, input, change", "mouseenter, mouseleave, scroll", "submit (forms), load, DOMContentLoaded"]} />
      </>
    ),
  },
  {
    slug: "json",
    title: "JS JSON",
    section: "Data",
    content: (
      <>
        <P>JSON is a text format for exchanging data. It looks like a JavaScript object literal.</P>
        <C>{`const user = { name: "Lin", roles: ["admin", "editor"] };\n\nconst text = JSON.stringify(user);\n// '{"name":"Lin","roles":["admin","editor"]}'\n\nconst back = JSON.parse(text);\nback.roles[0]; // "admin"`}</C>
      </>
    ),
  },
  {
    slug: "async",
    title: "JS Async / Await",
    section: "Async",
    content: (
      <>
        <P>
          Promises represent a value that will exist later. <code>async</code> and{" "}
          <code>await</code> make them easier to read.
        </P>
        <C>{`function wait(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms));\n}\n\nasync function run() {\n  console.log("start");\n  await wait(1000);\n  console.log("one second later");\n}\nrun();`}</C>
        <H2>Error handling</H2>
        <C>{`async function load() {\n  try {\n    const res = await fetch("/api/items");\n    if (!res.ok) throw new Error("Request failed");\n    return await res.json();\n  } catch (err) {\n    console.error(err);\n    return [];\n  }\n}`}</C>
      </>
    ),
  },
  {
    slug: "fetch",
    title: "JS Fetch API",
    section: "Async",
    content: (
      <>
        <P>The Fetch API makes HTTP requests from the browser or any modern JS runtime.</P>
        <C>{`// GET\nconst res = await fetch("https://api.example.com/users");\nconst users = await res.json();\n\n// POST\nawait fetch("https://api.example.com/users", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ name: "Sam" }),\n});`}</C>
      </>
    ),
  },
  {
    slug: "modules",
    title: "JS Modules",
    section: "Advanced",
    content: (
      <>
        <P>
          Modules let you split code across files. Each file has its own scope and explicitly
          exports what it shares.
        </P>
        <C>{`// math.js\nexport function add(a, b) { return a + b; }\nexport const PI = 3.14159;\nexport default function multiply(a, b) { return a * b; }\n\n// main.js\nimport multiply, { add, PI } from "./math.js";\nadd(2, 3);\nmultiply(2, 3);`}</C>
      </>
    ),
  },
  {
    slug: "errors",
    title: "JS Errors",
    section: "Advanced",
    content: (
      <>
        <P>Use try / catch to recover from runtime errors instead of crashing.</P>
        <C>{`try {\n  const data = JSON.parse(input);\n  use(data);\n} catch (err) {\n  console.error("Bad input:", err.message);\n} finally {\n  cleanup();\n}\n\n// throw your own\nfunction divide(a, b) {\n  if (b === 0) throw new Error("Cannot divide by zero");\n  return a / b;\n}`}</C>
      </>
    ),
  },
  {
    slug: "storage",
    title: "JS Storage",
    section: "Browser",
    content: (
      <>
        <P>
          The browser gives you a few places to keep data between page loads.{" "}
          <code>localStorage</code> survives reloads and restarts. <code>sessionStorage</code>{" "}
          lasts only for the tab.
        </P>
        <C>{`localStorage.setItem("theme", "dark");\nlocalStorage.getItem("theme"); // "dark"\nlocalStorage.removeItem("theme");\n\n// store an object\nlocalStorage.setItem("user", JSON.stringify({ id: 1 }));\nconst user = JSON.parse(localStorage.getItem("user") || "null");`}</C>
      </>
    ),
  },
];

export const SECTIONS = Array.from(new Set(TOPICS.map((t) => t.section)));
export const getTopic = (slug: string) => TOPICS.find((t) => t.slug === slug);

import type { ReactNode } from "react";

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type Topic = {
  slug: string;
  title: string;
  section: string;
  content: ReactNode;
  mdnUrl: string;
  tryIt: string;
  quiz: QuizQuestion[];
};

const C = ({ children }: { children: string }) => (
  <pre className="my-4 overflow-x-auto rounded-md bg-slate-900 p-4 text-sm text-slate-100 dark:bg-slate-950 dark:ring-1 dark:ring-slate-800">
    <code>{children}</code>
  </pre>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className="my-3 leading-relaxed text-foreground/80">{children}</p>
);

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="mt-8 mb-3 text-2xl font-semibold text-foreground">{children}</h2>
);

const UL = ({ items }: { items: string[] }) => (
  <ul className="my-3 list-disc space-y-1 pl-6 text-foreground/80">
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
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    tryIt: `console.log("Hello from JavaScript!");\nconsole.log(2 + 2);`,
    quiz: [
      {
        question: "Where does JavaScript run?",
        options: ["Only in browsers", "Only on servers", "In browsers and runtimes like Node.js", "Inside CSS files"],
        answer: 2,
        explanation: "JavaScript runs in every modern browser and in server runtimes such as Node.js, Deno, and Bun.",
      },
      {
        question: "Which method writes to the developer console?",
        options: ["print()", "console.log()", "echo()", "System.out()"],
        answer: 1,
        explanation: "console.log() prints values to the browser's developer console.",
      },
    ],
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
        </P>
      </>
    ),
  },
  {
    slug: "syntax",
    title: "JS Syntax",
    section: "Basics",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types",
    tryIt: `let price = 10;\nlet quantity = 3;\nconsole.log("Total:", price * quantity);`,
    quiz: [
      {
        question: "Which symbol typically ends a JavaScript statement?",
        options: [".", ";", ":", "!"],
        answer: 1,
        explanation: "Statements end with a semicolon. JS will insert them automatically in many cases, but writing them is safer.",
      },
      {
        question: "Which is a valid single-line comment?",
        options: ["# hi", "<!-- hi -->", "// hi", "/ hi /"],
        answer: 2,
        explanation: "// starts a single-line comment. /* ... */ is used for multi-line comments.",
      },
    ],
    content: (
      <>
        <P>Syntax is the set of rules for how JavaScript is written. A program is a list of statements.</P>
        <C>{`let price = 10;\nlet quantity = 3;\nlet total = price * quantity;`}</C>
        <H2>Comments</H2>
        <C>{`// single line comment\n/* multi line comment */`}</C>
      </>
    ),
  },
  {
    slug: "variables",
    title: "JS Variables",
    section: "Basics",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations",
    tryIt: `const PI = 3.14159;\nlet score = 0;\nscore = score + 10;\nconsole.log(PI, score);`,
    quiz: [
      {
        question: "Which keyword declares a value that cannot be reassigned?",
        options: ["let", "var", "const", "static"],
        answer: 2,
        explanation: "const declares a binding that cannot be reassigned.",
      },
      {
        question: "Which is the recommended default declaration?",
        options: ["var", "let", "const", "function"],
        answer: 2,
        explanation: "Reach for const by default; switch to let only when you know the value will change.",
      },
    ],
    content: (
      <>
        <P>Variables are named containers for values. Use <code>let</code>, <code>const</code>, or the older <code>var</code>.</P>
        <C>{`let score = 0;\nconst PI = 3.14159;\nvar legacy = true;`}</C>
      </>
    ),
  },
  {
    slug: "data-types",
    title: "JS Data Types",
    section: "Basics",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures",
    tryIt: `console.log(typeof "hi");\nconsole.log(typeof 42);\nconsole.log(typeof true);\nconsole.log(typeof null);`,
    quiz: [
      {
        question: "What does typeof null return?",
        options: ["\"null\"", "\"undefined\"", "\"object\"", "\"none\""],
        answer: 2,
        explanation: "typeof null is \"object\" — a long-standing historical quirk in JavaScript.",
      },
      {
        question: "Which is NOT a primitive type?",
        options: ["string", "number", "object", "boolean"],
        answer: 2,
        explanation: "object is the non-primitive type. The seven primitives are string, number, bigint, boolean, null, undefined, and symbol.",
      },
    ],
    content: (
      <>
        <P>Every value belongs to a type: string, number, bigint, boolean, null, undefined, symbol, and object.</P>
        <C>{`typeof "hi"   // "string"\ntypeof 42     // "number"\ntypeof null   // "object"`}</C>
      </>
    ),
  },
  {
    slug: "operators",
    title: "JS Operators",
    section: "Basics",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators",
    tryIt: `console.log(2 ** 10);\nconsole.log(9 % 2);\nconsole.log(1 === "1");\nconsole.log(true && false);`,
    quiz: [
      {
        question: "What does 9 % 2 return?",
        options: ["4.5", "1", "0", "4"],
        answer: 1,
        explanation: "% is the remainder operator. 9 divided by 2 has remainder 1.",
      },
      {
        question: "Which operator checks equality without type coercion?",
        options: ["==", "===", "=", "!="],
        answer: 1,
        explanation: "=== is strict equality and does not perform type coercion.",
      },
    ],
    content: (
      <>
        <P>Operators act on values.</P>
        <C>{`2 + 3   // 5\n2 ** 10 // 1024\n1 === 1 // true (strict)\ntrue && false // false`}</C>
      </>
    ),
  },
  {
    slug: "strings",
    title: "JS Strings",
    section: "Basics",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
    tryIt: `const name = "Ada";\nconsole.log(\`Hello, \${name}!\`);\nconsole.log("javascript".toUpperCase());`,
    quiz: [
      {
        question: "Which quote style supports interpolation with ${}?",
        options: ["'single'", "\"double\"", "`backticks`", "All of them"],
        answer: 2,
        explanation: "Template literals use backticks and support ${} interpolation and multi-line text.",
      },
      {
        question: "What does \"hello\".length return?",
        options: ["4", "5", "6", "undefined"],
        answer: 1,
        explanation: "The string \"hello\" has 5 characters.",
      },
    ],
    content: (
      <>
        <P>Strings hold text. Use single quotes, double quotes, or backticks.</P>
        <C>{`const greeting = \`Hello, \${name}!\`;\n"hello".toUpperCase(); // "HELLO"`}</C>
      </>
    ),
  },
  {
    slug: "numbers",
    title: "JS Numbers",
    section: "Basics",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
    tryIt: `console.log(0.1 + 0.2);\nconsole.log((1234.567).toFixed(2));\nconsole.log(parseInt("42px", 10));`,
    quiz: [
      {
        question: "What does 0.1 + 0.2 evaluate to?",
        options: ["0.3", "0.30000000000000004", "0", "NaN"],
        answer: 1,
        explanation: "JavaScript numbers are 64-bit floats, so some decimal sums lose precision.",
      },
      {
        question: "How do you reliably check for NaN?",
        options: ["x == NaN", "x === NaN", "Number.isNaN(x)", "typeof x === 'NaN'"],
        answer: 2,
        explanation: "Number.isNaN(x) is the safe check; NaN is not equal to itself.",
      },
    ],
    content: (
      <>
        <P>Numbers in JavaScript are 64-bit floating point.</P>
        <C>{`0.1 + 0.2 // 0.30000000000000004\n(1234.567).toFixed(2) // "1234.57"`}</C>
      </>
    ),
  },
  {
    slug: "arrays",
    title: "JS Arrays",
    section: "Data",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
    tryIt: `const fruits = ["apple", "pear", "kiwi"];\nfruits.push("fig");\nconsole.log(fruits);\nconsole.log(fruits.map(f => f.toUpperCase()));`,
    quiz: [
      {
        question: "Array indexes start at...",
        options: ["1", "0", "-1", "depends"],
        answer: 1,
        explanation: "JavaScript arrays are zero-indexed: the first element is at index 0.",
      },
      {
        question: "Which method adds an item to the end?",
        options: ["push()", "shift()", "unshift()", "pop()"],
        answer: 0,
        explanation: "push() appends; pop() removes from the end; unshift/shift work at the start.",
      },
    ],
    content: (
      <>
        <P>An array is an ordered list of values. Indexes start at zero.</P>
        <C>{`const fruits = ["apple", "pear"];\nfruits.push("fig");\nfruits.map(f => f.toUpperCase());`}</C>
      </>
    ),
  },
  {
    slug: "objects",
    title: "JS Objects",
    section: "Data",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
    tryIt: `const user = { name: "Mia", age: 29 };\nconsole.log(user.name);\nconsole.log({ ...user, role: "admin" });`,
    quiz: [
      {
        question: "How do you read the 'name' property of user?",
        options: ["user->name", "user.name", "user::name", "user@name"],
        answer: 1,
        explanation: "Use dot notation user.name or bracket notation user[\"name\"].",
      },
      {
        question: "What does { ...a, ...b } do?",
        options: ["Throws an error", "Compares a and b", "Merges a and b into a new object", "Deletes properties"],
        answer: 2,
        explanation: "The spread operator merges properties; later keys overwrite earlier ones.",
      },
    ],
    content: (
      <>
        <P>Objects are collections of key/value pairs.</P>
        <C>{`const user = { name: "Mia", age: 29 };\nconst merged = { ...user, role: "admin" };`}</C>
      </>
    ),
  },
  {
    slug: "functions",
    title: "JS Functions",
    section: "Basics",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
    tryIt: `function add(a, b) { return a + b; }\nconst multiply = (a, b) => a * b;\nconsole.log(add(2, 3));\nconsole.log(multiply(4, 5));`,
    quiz: [
      {
        question: "Which is an arrow function?",
        options: ["function() {}", "() => {}", "fn => return", ":: () {}"],
        answer: 1,
        explanation: "() => {} is the arrow function syntax introduced in ES2015.",
      },
      {
        question: "What does ...nums in function sum(...nums) mean?",
        options: ["Default value", "Rest parameters (an array)", "Spread", "Object destructuring"],
        answer: 1,
        explanation: "In a parameter list, ... collects remaining arguments into an array.",
      },
    ],
    content: (
      <>
        <P>Functions are reusable blocks of logic.</P>
        <C>{`function add(a, b) { return a + b; }\nconst multiply = (a, b) => a * b;`}</C>
      </>
    ),
  },
  {
    slug: "scope",
    title: "JS Scope",
    section: "Basics",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Glossary/Scope",
    tryIt: `function outer() {\n  const secret = 42;\n  return () => secret;\n}\nconsole.log(outer()());`,
    quiz: [
      {
        question: "let and const are scoped to...",
        options: ["the file", "the function", "the nearest block { }", "the entire program"],
        answer: 2,
        explanation: "let and const are block-scoped: they only exist inside the nearest enclosing { }.",
      },
      {
        question: "What is a closure?",
        options: ["A function that returns nothing", "A function that remembers variables from its outer scope", "A class method", "A constant"],
        answer: 1,
        explanation: "A closure is a function that captures and remembers variables from where it was defined.",
      },
    ],
    content: (
      <>
        <P>Scope decides where a variable is visible. let/const are block-scoped; var is function-scoped.</P>
      </>
    ),
  },
  {
    slug: "conditions",
    title: "JS Conditions",
    section: "Control flow",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
    tryIt: `const hour = 14;\nif (hour < 12) console.log("morning");\nelse if (hour < 18) console.log("afternoon");\nelse console.log("evening");`,
    quiz: [
      {
        question: "What does the ternary x ? a : b do?",
        options: ["Loops over x", "Returns a if x is truthy, else b", "Throws if x is false", "Compares a and b"],
        answer: 1,
        explanation: "The ternary operator picks one of two values based on the truthiness of x.",
      },
      {
        question: "What keyword is used to handle a default case in switch?",
        options: ["else", "default", "otherwise", "fallback"],
        answer: 1,
        explanation: "default runs when no case matches.",
      },
    ],
    content: (
      <>
        <P>Run different code depending on a value with if/else, ternary, and switch.</P>
      </>
    ),
  },
  {
    slug: "loops",
    title: "JS Loops",
    section: "Control flow",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration",
    tryIt: `for (let i = 0; i < 5; i++) console.log(i);\nfor (const x of ["a","b","c"]) console.log(x);`,
    quiz: [
      {
        question: "Which keyword exits a loop entirely?",
        options: ["continue", "break", "return", "exit"],
        answer: 1,
        explanation: "break exits the loop; continue jumps to the next iteration.",
      },
      {
        question: "Which loop iterates over array values directly?",
        options: ["for...in", "for...of", "while", "do...while"],
        answer: 1,
        explanation: "for...of iterates values of any iterable; for...in iterates property keys.",
      },
    ],
    content: (
      <>
        <P>Loops repeat code until a condition is met.</P>
        <C>{`for (let i = 0; i < 3; i++) console.log(i);\nfor (const x of items) console.log(x);`}</C>
      </>
    ),
  },
  {
    slug: "classes",
    title: "JS Classes",
    section: "Data",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes",
    tryIt: `class Animal { constructor(n) { this.n = n } speak() { return this.n + " sound" } }\nclass Dog extends Animal { speak() { return this.n + " barks" } }\nconsole.log(new Dog("Rex").speak());`,
    quiz: [
      {
        question: "Which keyword inherits from another class?",
        options: ["inherits", "extends", "implements", "uses"],
        answer: 1,
        explanation: "class Dog extends Animal makes Dog inherit from Animal.",
      },
      {
        question: "What method runs when you do new MyClass()?",
        options: ["init()", "constructor()", "create()", "main()"],
        answer: 1,
        explanation: "The constructor() method runs once when an instance is created.",
      },
    ],
    content: <P>Classes are a template for creating objects with shared behavior.</P>,
  },
  {
    slug: "dom",
    title: "JS DOM",
    section: "Browser",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
    tryIt: `// Runs in a real browser context\nconst h = document.createElement("h2");\nh.textContent = "Hi from JS";\nconsole.log(h.outerHTML);`,
    quiz: [
      {
        question: "Which method finds the first element matching a CSS selector?",
        options: ["getElement()", "querySelector()", "find()", "select()"],
        answer: 1,
        explanation: "document.querySelector(selector) returns the first matching element.",
      },
      {
        question: "How do you add a CSS class to an element?",
        options: ["el.addClass('x')", "el.class.push('x')", "el.classList.add('x')", "el.style.class = 'x'"],
        answer: 2,
        explanation: "classList.add() is the standard DOM API.",
      },
    ],
    content: <P>The DOM is the live tree of elements. JavaScript can read and change it.</P>,
  },
  {
    slug: "events",
    title: "JS Events",
    section: "Browser",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/Events",
    tryIt: `const btn = document.createElement("button");\nbtn.addEventListener("click", () => console.log("clicked"));\nbtn.click();`,
    quiz: [
      {
        question: "Which method registers an event handler?",
        options: ["onEvent()", "listen()", "addEventListener()", "subscribe()"],
        answer: 2,
        explanation: "addEventListener(type, handler) is the modern DOM event API.",
      },
      {
        question: "What property of a keyboard event holds the pressed key?",
        options: ["e.value", "e.key", "e.code", "e.char"],
        answer: 1,
        explanation: "e.key holds the printable key value (e.code holds the physical key location).",
      },
    ],
    content: <P>Events let your code react to user actions like clicks and key presses.</P>,
  },
  {
    slug: "json",
    title: "JS JSON",
    section: "Data",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON",
    tryIt: `const user = { name: "Lin", roles: ["admin"] };\nconst text = JSON.stringify(user);\nconsole.log(text);\nconsole.log(JSON.parse(text));`,
    quiz: [
      {
        question: "Which method turns a JS value into a JSON string?",
        options: ["JSON.parse", "JSON.stringify", "JSON.encode", "JSON.toText"],
        answer: 1,
        explanation: "JSON.stringify(value) serializes; JSON.parse(text) deserializes.",
      },
      {
        question: "JSON keys must be wrapped in...",
        options: ["single quotes", "double quotes", "backticks", "no quotes"],
        answer: 1,
        explanation: "JSON requires double-quoted strings for keys and string values.",
      },
    ],
    content: <P>JSON is a text format for exchanging data; it looks like a JS object literal.</P>,
  },
  {
    slug: "async",
    title: "JS Async / Await",
    section: "Async",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
    tryIt: `async function run() {\n  await new Promise(r => setTimeout(r, 200));\n  console.log("done");\n}\nrun();`,
    quiz: [
      {
        question: "await can only be used inside...",
        options: ["any function", "an async function or top-level module", "a class", "a loop"],
        answer: 1,
        explanation: "await is allowed in async functions and at the top level of an ES module.",
      },
      {
        question: "What does an async function return?",
        options: ["The raw value", "A Promise", "undefined", "A callback"],
        answer: 1,
        explanation: "Async functions always return a Promise that resolves to the returned value.",
      },
    ],
    content: <P>Promises represent values that exist later. async/await makes them readable.</P>,
  },
  {
    slug: "fetch",
    title: "JS Fetch API",
    section: "Async",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
    tryIt: `async function load() {\n  const r = await fetch("https://jsonplaceholder.typicode.com/todos/1");\n  console.log(await r.json());\n}\nload();`,
    quiz: [
      {
        question: "What does fetch() return?",
        options: ["Parsed JSON", "A Response Promise", "A string", "Headers"],
        answer: 1,
        explanation: "fetch() returns a Promise that resolves to a Response object; call .json() to read JSON.",
      },
      {
        question: "Which header tells the server you're sending JSON?",
        options: ["Accept: text/json", "Content-Type: application/json", "Body: json", "Type: json"],
        answer: 1,
        explanation: "Set Content-Type: application/json on the request when sending a JSON body.",
      },
    ],
    content: <P>The Fetch API makes HTTP requests from the browser or any modern JS runtime.</P>,
  },
  {
    slug: "modules",
    title: "JS Modules",
    section: "Advanced",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
    tryIt: `// Modules can't fully run in this sandbox.\n// Pseudo-example:\n// import { add } from "./math.js";\n// console.log(add(2, 3));\nconsole.log("modules: see code on the page");`,
    quiz: [
      {
        question: "Which keyword exposes a value from a module?",
        options: ["share", "expose", "export", "public"],
        answer: 2,
        explanation: "export makes a value available; import brings it into another module.",
      },
      {
        question: "How many default exports can a module have?",
        options: ["0", "1", "Many", "Unlimited"],
        answer: 1,
        explanation: "A module may have at most one default export.",
      },
    ],
    content: <P>Modules let you split code across files with explicit imports/exports.</P>,
  },
  {
    slug: "errors",
    title: "JS Errors",
    section: "Advanced",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
    tryIt: `try {\n  JSON.parse("not json");\n} catch (err) {\n  console.log("Caught:", err.message);\n}`,
    quiz: [
      {
        question: "Which block always runs whether or not an error was thrown?",
        options: ["catch", "finally", "always", "ensure"],
        answer: 1,
        explanation: "finally runs after try/catch regardless of the outcome.",
      },
      {
        question: "How do you raise your own error?",
        options: ["raise Error()", "throw new Error('msg')", "panic('msg')", "fail('msg')"],
        answer: 1,
        explanation: "Use throw new Error('message') to raise an error in JavaScript.",
      },
    ],
    content: <P>Use try / catch / finally to recover from runtime errors instead of crashing.</P>,
  },
  {
    slug: "storage",
    title: "JS Storage",
    section: "Browser",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API",
    tryIt: `localStorage.setItem("demo", "hello");\nconsole.log(localStorage.getItem("demo"));\nlocalStorage.removeItem("demo");`,
    quiz: [
      {
        question: "How long does localStorage persist?",
        options: ["Until the tab closes", "Until the browser closes", "Across reloads and restarts", "1 hour"],
        answer: 2,
        explanation: "localStorage persists indefinitely until cleared. sessionStorage only lasts for the tab.",
      },
      {
        question: "What types can you store directly?",
        options: ["Any value", "Only strings", "Only numbers", "Only objects"],
        answer: 1,
        explanation: "Web Storage stores strings only; serialize objects with JSON.stringify().",
      },
    ],
    content: <P>localStorage survives reloads; sessionStorage lasts only for the tab.</P>,
  },
];

export const SECTIONS = Array.from(new Set(TOPICS.map((t) => t.section)));
export const getTopic = (slug: string) => TOPICS.find((t) => t.slug === slug);

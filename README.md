# Quick-Calc

A small browser-based calculator built with React and TypeScript (Vite).

## What the app does

**Quick-Calc** supports:

- **Basic operations:** addition (+), subtraction (−), multiplication (×), division (÷)
- **Decimal input:** a decimal point (.) for numbers like 3.14
- **Divide-by-zero handling:** dividing by zero shows **Error** in the display instead of crashing
- **Clear / reset (C):** resets the display to 0 and clears any pending operation (including after an error)

You can chain operations (e.g. 5 + 3 − 2 = 6) and use the result in the next calculation.

## Install and run

**Requirements:** Node.js (e.g. 18+) and npm.

```bash
# Install dependencies
npm install

# Run the app in development (with hot reload)
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

**Build for production:**

```bash
npm run build
```

Output is in the `dist/` folder. To preview the production build:

```bash
npm run preview
```

## Run the tests

All tests (unit + integration) run with a single command:

```bash
npm test
```

This runs Vitest once and executes every test in `src/**/*.{test,spec}.{ts,tsx}`.

For watch mode (re-run on file changes):

```bash
npm run test:watch
```

---

## Testing framework choice: Vitest vs Jest

For this project we use **Vitest** as the test runner instead of **Jest**.

**Jest** is the most widely used JavaScript/TypeScript test framework. It has a rich ecosystem, many examples and Stack Overflow answers, and built-in mocking, snapshots, and coverage. It runs in Node by default and can be configured for React and ESM, but that setup can be fiddly in modern Vite/ESM projects. Jest also tends to need more configuration (e.g. `transform`, `moduleNameMapper`, `testEnvironment`) to work smoothly with TypeScript and Vite’s resolution.

**Vitest** is built on top of Vite and reuses the same config, transforms, and resolution. That means tests run in the same environment as the app, with native ESM and TypeScript support and no extra build step. The API is intentionally similar to Jest (`describe`, `it`, `expect`), so switching or sharing knowledge is easy. For a Vite-based React app, Vitest gives a single toolchain for dev, build, and test, with fast execution and a simple `npm test` that runs the full suite.

We chose **Vitest** because this app is built with Vite; using one toolchain reduces configuration and keeps tests aligned with how the app is actually run. The requirement that “all tests must run with a single command” is satisfied by `npm test` (Vitest run), and the same setup supports both unit tests (calculator logic) and integration tests (React components with Testing Library and jsdom) without extra test bundlers or Jest-specific config.

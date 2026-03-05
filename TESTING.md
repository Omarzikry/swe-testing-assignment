# Testing strategy and summary

## Testing strategy

**What we tested**

- **Calculator logic (unit):** All four operations (add, subtract, multiply, divide) with normal inputs, zeros, and edge cases: divide-by-zero (expect NaN), negative numbers, and decimal operands. The logic is pure functions in `src/calculator.ts`, so we test them in isolation with no DOM or React.
- **User flows (integration):** We simulate real user behaviour by rendering the full app, clicking digit/operator/equals/clear buttons, and asserting on the display. We cover: (1) a basic flow (5 + 3 = 8), (2) divide-by-zero showing “Error”, and (3) clear resetting display and state so a following calculation works.

**What we skipped and why**

- **E2E / UI in a real browser:** No Playwright or Cypress. The assignment asked for unit and integration tests with a single command; we rely on Vitest + React Testing Library + jsdom for integration tests. Full E2E would add browser setup and slower runs.
- **Visual/accessibility testing:** No snapshot or a11y automation. The UI is simple and we only assert on behaviour (display text). Dedicated a11y or visual regression tools were out of scope.
- **Exhaustive UI state:** We didn’t test every button combination (e.g. every digit × every operator). We chose representative flows (addition, divide-by-zero, clear) to keep the suite small while covering the main behaviours and the critical divide-by-zero and clear behaviour.
- **Non-functional aspects:** Performance, load, and security were not in scope; we focused on **functional** correctness of the calculator.

---

## Relation to course concepts

**Testing Pyramid**  
We follow a pyramid-style split: many **unit tests** (11) on the pure calculator functions, and fewer **integration tests** (3) that run the app and simulate user actions. Unit tests are fast and narrow; integration tests are fewer but broader, validating that the UI and state work together. We did not add full E2E tests at the top of the pyramid.

**Black-box vs White-box**  
- **Unit tests** are **white-box**: they target the internal implementation of `add`, `subtract`, `multiply`, and `divide` (known inputs and expected outputs).  
- **Integration tests** are **black-box** from the user’s perspective: we only use the public interface (buttons and display) and don’t assert on internal state; we care that “5, +, 3, =” shows “8”, not how the state machine stores operands.

**Functional vs Non-Functional Testing**  
All tests in this project are **functional**: they check that the calculator does the right thing (correct results, Error on divide-by-zero, clear reset). We did not add **non-functional** tests (e.g. performance under load, stress, or security).

**Regression Testing**  
The full suite acts as a **regression** suite: every change can be checked with `npm test`. If someone breaks divide-by-zero handling, clear, or any operation, the corresponding unit or integration test should fail. We keep the suite stable (no flaky tests) so that “all pass” is a reliable signal before commit or merge.

---

## Test summary table

All tests are run with: `npm test`. Status below reflects the current suite (all passing).

| Test description | Type | Status |
|------------------|------|--------|
| adds two positive numbers | Unit | Pass |
| adds zero | Unit | Pass |
| subtracts two positive numbers | Unit | Pass |
| subtract gives zero when equal | Unit | Pass |
| multiplies two positive numbers | Unit | Pass |
| multiply by zero gives zero | Unit | Pass |
| divides two positive numbers | Unit | Pass |
| divides and produces decimal result | Unit | Pass |
| divide by zero returns NaN | Unit | Pass |
| handles negative numbers | Unit | Pass |
| handles decimal operands | Unit | Pass |
| user flow: enter 5, press +, enter 3, press =, expect 8 | Integration | Pass |
| user flow: divide by zero shows Error | Integration | Pass |
| user flow: clear resets display and state | Integration | Pass |

**Totals:** 11 unit tests, 3 integration tests; 14 tests, all passing.

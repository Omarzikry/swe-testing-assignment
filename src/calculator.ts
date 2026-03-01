/**
 * Pure calculator operations for Quick-Calc.
 * Division by zero returns NaN so the UI can show an error state.
 */

export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * Returns a / b. Returns NaN when b is 0 (caller should treat NaN as divide-by-zero error).
 */
export function divide(a: number, b: number): number {
  if (b === 0) return NaN;
  return a / b;
}

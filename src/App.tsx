import { useState, useCallback } from 'react';
import { add, subtract, multiply, divide } from './calculator';
import { Calculator } from './components/Calculator';

type Op = '+' | '-' | '*' | '/';

function applyOp(left: number, op: Op, right: number): number {
  switch (op) {
    case '+':
      return add(left, right);
    case '-':
      return subtract(left, right);
    case '*':
      return multiply(left, right);
    case '/':
      return divide(left, right);
  }
}

function formatResult(n: number): string {
  if (Number.isNaN(n) || !Number.isFinite(n)) return 'Error';
  return String(n);
}

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [leftOperand, setLeftOperand] = useState<number | null>(null);
  const [pendingOperator, setPendingOperator] = useState<Op | null>(null);
  const [shouldReplaceDisplay, setShouldReplaceDisplay] = useState(false);

  const onDigit = useCallback((digit: string) => {
    setDisplayValue((prev) => {
      if (prev === 'Error') return digit;
      if (shouldReplaceDisplay) return digit;
      if (prev === '0' && digit !== '0') return digit;
      if (prev === '0' && digit === '0') return '0';
      return prev + digit;
    });
    setShouldReplaceDisplay(false);
  }, [shouldReplaceDisplay]);

  const onOperator = useCallback((op: Op) => {
    const current = parseFloat(displayValue);
    if (Number.isNaN(current) && displayValue !== 'Error') return;
    if (displayValue === 'Error') return;

    if (leftOperand !== null && pendingOperator !== null) {
      const result = applyOp(leftOperand, pendingOperator, current);
      setDisplayValue(formatResult(result));
      setLeftOperand(Number.isNaN(result) ? null : result);
    } else {
      setLeftOperand(current);
    }
    setPendingOperator(op);
    setShouldReplaceDisplay(true);
  }, [displayValue, leftOperand, pendingOperator]);

  const onEquals = useCallback(() => {
    if (leftOperand === null || pendingOperator === null) return;
    const current = parseFloat(displayValue);
    if (Number.isNaN(current) || displayValue === 'Error') return;
    const result = applyOp(leftOperand, pendingOperator, current);
    setDisplayValue(formatResult(result));
    setLeftOperand(null);
    setPendingOperator(null);
    setShouldReplaceDisplay(true);
  }, [displayValue, leftOperand, pendingOperator]);

  const onClear = useCallback(() => {
    setDisplayValue('0');
    setLeftOperand(null);
    setPendingOperator(null);
    setShouldReplaceDisplay(false);
  }, []);

  return (
    <div>
      <h1>Quick-Calc</h1>
      <Calculator
        displayValue={displayValue}
        onDigit={onDigit}
        onOperator={onOperator}
        onEquals={onEquals}
        onClear={onClear}
      />
    </div>
  );
}

export default App;

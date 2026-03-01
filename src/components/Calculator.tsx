import { Display } from './Display';

export type CalculatorProps = {
  displayValue: string;
  onDigit: (digit: string) => void;
  onDecimal: () => void;
  onOperator: (op: '+' | '-' | '*' | '/') => void;
  onEquals: () => void;
  onClear: () => void;
};

// Layout: [7 8 9 +] [4 5 6 -] [1 2 3 *] [0 . / =] [C]
const ROW1 = [
  { type: 'digit' as const, id: '7' },
  { type: 'digit' as const, id: '8' },
  { type: 'digit' as const, id: '9' },
  { type: 'operator' as const, id: '+' },
];
const ROW2 = [
  { type: 'digit' as const, id: '4' },
  { type: 'digit' as const, id: '5' },
  { type: 'digit' as const, id: '6' },
  { type: 'operator' as const, id: '-' },
];
const ROW3 = [
  { type: 'digit' as const, id: '1' },
  { type: 'digit' as const, id: '2' },
  { type: 'digit' as const, id: '3' },
  { type: 'operator' as const, id: '*' },
];
const ROW4 = [
  { type: 'digit' as const, id: '0' },
  { type: 'decimal' as const },
  { type: 'operator' as const, id: '/' },
  { type: 'equals' as const },
];
const ROW5 = [{ type: 'clear' as const }];
const ROWS = [ROW1, ROW2, ROW3, ROW4, ROW5];

export function Calculator({
  displayValue,
  onDigit,
  onDecimal,
  onOperator,
  onEquals,
  onClear,
}: CalculatorProps) {
  return (
    <div
      data-testid="calculator"
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '1rem',
        backgroundColor: '#e8e8e8',
        borderRadius: '10px',
        maxWidth: '280px',
      }}
    >
      <Display value={displayValue} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.5rem',
        }}
      >
        {ROWS.flat().map((cell, index) => {
          if (cell.type === 'digit') {
            return (
              <button
                key={`${cell.type}-${cell.id}-${index}`}
                type="button"
                data-testid={`digit-${cell.id}`}
                onClick={() => onDigit(cell.id)}
                style={buttonStyle}
              >
                {cell.id}
              </button>
            );
          }
          if (cell.type === 'decimal') {
            return (
              <button
                key={`decimal-${index}`}
                type="button"
                data-testid="decimal"
                onClick={onDecimal}
                style={buttonStyle}
              >
                .
              </button>
            );
          }
          if (cell.type === 'operator') {
            return (
              <button
                key={`${cell.type}-${cell.id}-${index}`}
                type="button"
                data-testid={`operator-${cell.id}`}
                onClick={() => onOperator(cell.id as '+' | '-' | '*' | '/')}
                style={{ ...buttonStyle, backgroundColor: '#b8d4e8' }}
              >
                {cell.id === '*' ? '×' : cell.id === '/' ? '÷' : cell.id}
              </button>
            );
          }
          if (cell.type === 'equals') {
            return (
              <button
                key={`equals-${index}`}
                type="button"
                data-testid="equals"
                onClick={onEquals}
                style={{ ...buttonStyle, backgroundColor: '#a8d8a8' }}
              >
                =
              </button>
            );
          }
          return (
            <button
              key={`clear-${index}`}
              type="button"
              data-testid="clear"
              onClick={onClear}
              style={{ ...buttonStyle, backgroundColor: '#e8b8b8', gridColumn: '1 / -1' }}
            >
              C
            </button>
          );
        })}
      </div>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  fontSize: '1.25rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  cursor: 'pointer',
  backgroundColor: '#fff',
};

type DisplayProps = {
  value: string;
};

export function Display({ value }: DisplayProps) {
  return (
    <div
      data-testid="calculator-display"
      role="status"
      aria-live="polite"
      aria-label="Calculator display"
      style={{
        padding: '0.75rem 1rem',
        textAlign: 'right',
        fontSize: '1.5rem',
        fontFamily: 'ui-monospace, monospace',
        backgroundColor: '#f0f0f0',
        borderRadius: '6px',
        minHeight: '2.5rem',
      }}
    >
      {value}
    </div>
  );
}

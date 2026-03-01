import { Calculator } from './components/Calculator';

function App() {
  return (
    <div>
      <h1>Quick-Calc</h1>
      <Calculator
        displayValue='0'
        onDigit={() => {}}
        onOperator={() => {}}
        onEquals={() => {}}
        onClear={() => {}}
      />
    </div>
  );
}

export default App;

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

function getDisplay() {
  return screen.getByTestId('calculator-display');
}

describe('Calculator integration', () => {
  it('user flow: enter 5, press +, enter 3, press =, expect 8', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByTestId('digit-5'));
    expect(getDisplay()).toHaveTextContent('5');

    await user.click(screen.getByTestId('operator-+'));
    await user.click(screen.getByTestId('digit-3'));
    expect(getDisplay()).toHaveTextContent('3');

    await user.click(screen.getByTestId('equals'));
    expect(getDisplay()).toHaveTextContent('8');
  });

  it('user flow: divide by zero shows Error', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByTestId('digit-1'));
    await user.click(screen.getByTestId('operator-/'));
    await user.click(screen.getByTestId('digit-0'));
    await user.click(screen.getByTestId('equals'));

    expect(getDisplay()).toHaveTextContent('Error');
  });

  it('user flow: clear resets display and state', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByTestId('digit-7'));
    await user.click(screen.getByTestId('operator-+'));
    expect(getDisplay()).toHaveTextContent('7');

    await user.click(screen.getByTestId('clear'));
    expect(getDisplay()).toHaveTextContent('0');

    await user.click(screen.getByTestId('digit-2'));
    await user.click(screen.getByTestId('equals'));
    expect(getDisplay()).toHaveTextContent('2');
  });
});
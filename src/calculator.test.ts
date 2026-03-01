import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide } from './calculator';

describe('calculator', () => {
  describe('add', () => {
    it('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
    it('adds zero', () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
    });
  });

  describe('subtract', () => {
    it('subtracts two positive numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });
    it('subtract gives zero when equal', () => {
      expect(subtract(7, 7)).toBe(0);
    });
  });

  describe('multiply', () => {
    it('multiplies two positive numbers', () => {
      expect(multiply(4, 3)).toBe(12);
    });
    it('multiply by zero gives zero', () => {
      expect(multiply(10, 0)).toBe(0);
    });
  });

  describe('divide', () => {
    it('divides two positive numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });
    it('divides and produces decimal result', () => {
      expect(divide(1, 2)).toBe(0.5);
    });
  });

  describe('edge cases', () => {
    it('divide by zero returns NaN', () => {
      expect(divide(1, 0)).toBeNaN();
      expect(divide(-5, 0)).toBeNaN();
    });
    it('handles negative numbers', () => {
      expect(add(-1, 2)).toBe(1);
      expect(subtract(-3, 1)).toBe(-4);
      expect(multiply(-2, 3)).toBe(-6);
      expect(divide(-10, 2)).toBe(-5);
    });
    it('handles decimal operands', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
      expect(multiply(2.5, 2)).toBe(5);
      expect(divide(1.5, 0.5)).toBe(3);
    });
  });
});

// example.spec.ts

describe('Basic Test Suite', () => {
    it('should return true', () => {
      const result = true;
      expect(result).toBe(true);
    });
  
    it('should sum two numbers correctly', () => {
      const sum = (a: number, b: number) => a + b;
      expect(sum(1, 2)).toBe(3);
    });
  });
  
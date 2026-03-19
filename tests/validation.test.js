const { validateCar } = require('../src/validation/carValidator');

const validCar = {
  brand: 'Toyota',
  model: 'Camry',
  year: 2020,
  price: 25000,
  color: 'Silver',
  mileage: 15000,
};

describe('Car Validation', () => {
  test('accepts valid car data', () => {
    const errors = validateCar(validCar);
    expect(errors).toHaveLength(0);
  });

  // brand
  test('rejects empty brand', () => {
    const errors = validateCar({ ...validCar, brand: '' });
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toMatch(/brand/i);
  });

  test('rejects brand shorter than 2 characters', () => {
    const errors = validateCar({ ...validCar, brand: 'A' });
    expect(errors.length).toBeGreaterThan(0);
  });

  test('rejects brand longer than 50 characters', () => {
    const errors = validateCar({ ...validCar, brand: 'A'.repeat(51) });
    expect(errors.length).toBeGreaterThan(0);
  });

  test('rejects non-string brand', () => {
    const errors = validateCar({ ...validCar, brand: 123 });
    expect(errors.length).toBeGreaterThan(0);
  });

  // model
  test('rejects empty model', () => {
    const errors = validateCar({ ...validCar, model: '' });
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toMatch(/model/i);
  });

  test('rejects model longer than 50 characters', () => {
    const errors = validateCar({ ...validCar, model: 'M'.repeat(51) });
    expect(errors.length).toBeGreaterThan(0);
  });

  // year
  test('rejects year before 1886', () => {
    const errors = validateCar({ ...validCar, year: 1800 });
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toMatch(/year/i);
  });

  test('rejects year far in the future', () => {
    const errors = validateCar({ ...validCar, year: 2100 });
    expect(errors.length).toBeGreaterThan(0);
  });

  test('rejects non-integer year', () => {
    const errors = validateCar({ ...validCar, year: 2020.5 });
    expect(errors.length).toBeGreaterThan(0);
  });

  // price
  test('rejects negative price', () => {
    const errors = validateCar({ ...validCar, price: -1000 });
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toMatch(/price/i);
  });

  test('rejects price over 10 million', () => {
    const errors = validateCar({ ...validCar, price: 10_000_001 });
    expect(errors.length).toBeGreaterThan(0);
  });

  test('accepts zero price', () => {
    const errors = validateCar({ ...validCar, price: 0 });
    expect(errors).toHaveLength(0);
  });

  // color
  test('rejects empty color', () => {
    const errors = validateCar({ ...validCar, color: '' });
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toMatch(/color/i);
  });

  test('rejects color shorter than 2 characters', () => {
    const errors = validateCar({ ...validCar, color: 'R' });
    expect(errors.length).toBeGreaterThan(0);
  });

  // mileage
  test('rejects negative mileage', () => {
    const errors = validateCar({ ...validCar, mileage: -100 });
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toMatch(/mileage/i);
  });

  test('rejects mileage over 1 million', () => {
    const errors = validateCar({ ...validCar, mileage: 1_000_001 });
    expect(errors.length).toBeGreaterThan(0);
  });

  test('accepts zero mileage', () => {
    const errors = validateCar({ ...validCar, mileage: 0 });
    expect(errors).toHaveLength(0);
  });

  // multiple errors
  test('returns multiple errors for multiple invalid fields', () => {
    const errors = validateCar({ brand: '', model: '', year: 0, price: -1, color: '', mileage: -1 });
    expect(errors.length).toBe(6);
  });
});

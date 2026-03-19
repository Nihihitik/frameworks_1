function validateCar(data) {
  const errors = [];
  const currentYear = new Date().getFullYear();

  // brand: обязательное, строка, 2–50 символов
  if (typeof data.brand !== 'string' || data.brand.trim().length < 2 || data.brand.trim().length > 50) {
    errors.push('brand is required and must be a string between 2 and 50 characters');
  }

  // model: обязательное, строка, 1–50 символов
  if (typeof data.model !== 'string' || data.model.trim().length < 1 || data.model.trim().length > 50) {
    errors.push('model is required and must be a string between 1 and 50 characters');
  }

  // year: обязательное, число, 1886 <= year <= текущий год + 1
  if (typeof data.year !== 'number' || !Number.isInteger(data.year) || data.year < 1886 || data.year > currentYear + 1) {
    errors.push(`year is required and must be an integer between 1886 and ${currentYear + 1}`);
  }

  // price: обязательное, число >= 0, не более 10 000 000
  if (typeof data.price !== 'number' || data.price < 0 || data.price > 10_000_000) {
    errors.push('price is required and must be a number between 0 and 10000000');
  }

  // color: обязательное, строка, 2–30 символов
  if (typeof data.color !== 'string' || data.color.trim().length < 2 || data.color.trim().length > 30) {
    errors.push('color is required and must be a string between 2 and 30 characters');
  }

  // mileage: обязательное, число >= 0, не более 1 000 000
  if (typeof data.mileage !== 'number' || data.mileage < 0 || data.mileage > 1_000_000) {
    errors.push('mileage is required and must be a number between 0 and 1000000');
  }

  return errors;
}

module.exports = { validateCar };

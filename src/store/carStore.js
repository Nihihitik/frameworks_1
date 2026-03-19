const { v4: uuidv4 } = require('uuid');

let cars = [];

const carStore = {
  getAll() {
    return cars;
  },

  getById(id) {
    return cars.find((car) => car.id === id) || null;
  },

  create(data) {
    const car = {
      id: uuidv4(),
      brand: data.brand,
      model: data.model,
      year: data.year,
      price: data.price,
      color: data.color,
      mileage: data.mileage,
    };
    cars.push(car);
    return car;
  },

  clear() {
    cars = [];
  },
};

module.exports = carStore;

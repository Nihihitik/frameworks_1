const { Router } = require('express');
const carStore = require('../store/carStore');
const { validateCar } = require('../validation/carValidator');

const router = Router();

// GET /api/items — список всех автомобилей
router.get('/', (req, res) => {
  const cars = carStore.getAll();
  res.status(200).json(cars);
});

// GET /api/items/:id — один автомобиль по ID
router.get('/:id', (req, res, next) => {
  const car = carStore.getById(req.params.id);
  if (!car) {
    const err = new Error(`Неверно указан id: автомобиль с id ${req.params.id} не найден`);
    err.statusCode = 404;
    err.errorCode = 'NOT_FOUND';
    return next(err);
  }
  res.status(200).json(car);
});

// POST /api/items — создание нового автомобиля
router.post('/', (req, res, next) => {
  const errors = validateCar(req.body);
  if (errors.length > 0) {
    const err = new Error(errors.join('; '));
    err.statusCode = 400;
    err.errorCode = 'VALIDATION_ERROR';
    return next(err);
  }
  const car = carStore.create(req.body);
  res.status(201).json(car);
});

module.exports = router;

const express = require('express');
const requestId = require('./middleware/requestId');
const timing = require('./middleware/timing');
const errorHandler = require('./middleware/errorHandler');
const itemsRouter = require('./routes/items');

const app = express();

// Парсинг JSON
app.use(express.json());

// Конвейер middleware (по схеме):
// 1. Обработчик идентификатора запроса
app.use(requestId);
// 2. Замер времени и запись в журнал
app.use(timing);

// Маршрутизация
app.use('/api/items', itemsRouter);

// 3. Единая обработка ошибок
app.use(errorHandler);

module.exports = app;

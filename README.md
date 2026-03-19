# Car Catalog API

In-memory REST API сервис каталога автомобилей на Node.js + Express.

## Установка

```bash
npm install
```

## Запуск

```bash
npm start
```

Сервер запустится на `http://localhost:3000`.

## Тесты

```bash
npm test
```

## API Endpoints

### GET /api/items
Возвращает список всех автомобилей.

**Пример запроса:**
```bash
curl -i http://localhost:3000/api/items
```
*Метод: GET*

**Пример ответа (200 OK):**
```json
[
  {
    "id": "09c30e16-d9c8-4b8d-a243-b08d74c01de9",
    "brand": "Toyota",
    "model": "Camry",
    "year": 2020,
    "price": 25000,
    "color": "Silver",
    "mileage": 15000
  },
  {
    "id": "f49caccc-1aac-4439-acf9-f2bb33b2969e",
    "brand": "BMW",
    "model": "X5",
    "year": 2022,
    "price": 65000,
    "color": "Black",
    "mileage": 8000
  }
]
```

### GET /api/items/:id
Возвращает автомобиль по ID.

**Пример запроса:**
```bash
curl -i http://localhost:3000/api/items/09c30e16-d9c8-4b8d-a243-b08d74c01de9
```
*Метод: GET*

**Пример ответа (200 OK):**
```json
{
  "id": "09c30e16-d9c8-4b8d-a243-b08d74c01de9",
  "brand": "Toyota",
  "model": "Camry",
  "year": 2020,
  "price": 25000,
  "color": "Silver",
  "mileage": 15000
}
```

**Пример ответа при ошибке (404 Not Found):**
```json
{
  "error": "NOT_FOUND",
  "message": "Car with id 99999999-9999-9999-9999-999999999999 not found",
  "requestId": "447795ef-9b04-4942-8b92-0ca21c2b9c2a"
}
```

### POST /api/items
Создаёт новый автомобиль.

**Пример запроса:**
```bash
curl -i -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"brand":"Toyota","model":"Camry","year":2020,"price":25000,"color":"Silver","mileage":15000}'
```
*Метод: POST*

**Пример ответа (201 Created):**
```json
{
  "id": "09c30e16-d9c8-4b8d-a243-b08d74c01de9",
  "brand": "Toyota",
  "model": "Camry",
  "year": 2020,
  "price": 25000,
  "color": "Silver",
  "mileage": 15000
}
```

**Пример ответа при ошибке валидации (400 Bad Request):**
```json
{
  "error": "VALIDATION_ERROR",
  "message": "brand is required and must be a string between 2 and 50 characters",
  "requestId": "70a31fce-3b27-48af-a0d3-016b2e1be220"
}
```

## Ручной прогон (curl-сценарии)

```bash
# 1. Получить пустой список
curl -i http://localhost:3000/api/items

# 2. Создать первый автомобиль
curl -i -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"brand":"Toyota","model":"Camry","year":2020,"price":25000,"color":"Silver","mileage":15000}'

# 3. Создать второй автомобиль
curl -i -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"brand":"BMW","model":"X5","year":2022,"price":65000,"color":"Black","mileage":8000}'

# 4. Получить список всех автомобилей
curl -i http://localhost:3000/api/items

# 5. Получить автомобиль по ID (подставить реальный ID из ответа шага 2 или 3)
curl -i http://localhost:3000/api/items/{id}

# 6. Попытка получить несуществующий ID → 404
curl -i http://localhost:3000/api/items/99999999-9999-9999-9999-999999999999

# 7. Валидация: пустой brand → 400
curl -i -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"brand":"","model":"Camry","year":2020,"price":25000,"color":"Silver","mileage":15000}'

# 8. Валидация: отрицательная цена → 400
curl -i -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"brand":"Toyota","model":"Camry","year":2020,"price":-1000,"color":"Silver","mileage":15000}'

# 9. Валидация: год за пределами диапазона → 400
curl -i -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"brand":"Toyota","model":"Camry","year":1800,"price":25000,"color":"Silver","mileage":15000}'

# 10. Валидация: пустое тело → 400
curl -i -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Формат ошибок

Все ошибки возвращаются в едином формате:

```json
{
  "error": "NOT_FOUND",
  "message": "Car with id ... not found",
  "requestId": "uuid-v4"
}
```

Каждый ответ содержит заголовок `X-Request-Id`.

## Поля автомобиля

| Поле | Тип | Правила |
|------|-----|---------|
| brand | string | 2–50 символов |
| model | string | 1–50 символов |
| year | integer | 1886 – текущий год + 1 |
| price | number | 0 – 10 000 000 |
| color | string | 2–30 символов |
| mileage | number | 0 – 1 000 000 |

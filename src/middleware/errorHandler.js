function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500;
  const errorCode = err.errorCode || 'INTERNAL_ERROR';
  const message = err.message || 'An unexpected error occurred';

  console.error(`[${req.requestId}] Ошибка: ${message}`);

  res.status(statusCode).json({
    error: errorCode,
    message: message,
    requestId: req.requestId,
  });
}

module.exports = errorHandler;

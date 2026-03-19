function timing(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${req.requestId}] ${req.method} ${req.originalUrl} — статус: ${res.statusCode} — время: ${duration}мс`
    );
  });

  next();
}

module.exports = timing;

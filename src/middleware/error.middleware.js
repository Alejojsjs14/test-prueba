export const errorHandler = (err, _req, res, _next) => {
  const { statusCode, message } = err;

  res.status(500).json({
    success: false,
    status: statusCode,
    code: 500,
    message,
  });

};

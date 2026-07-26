const errorMiddleware = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  res.status(error.statusCode).json({
    success: false,
    status: error.status,
    message: error.message,
  });
};

export default errorMiddleware;

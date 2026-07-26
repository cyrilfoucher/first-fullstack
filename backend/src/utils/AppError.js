class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = statusCode >= 500 ? "error" : "fail";
  }
}
export default AppError;

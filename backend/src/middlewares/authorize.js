import AppError from "../utils/AppError.js";

export const authorize = (...roles) => {
  return async (req, res, next) => {
    const isAuthorized = roles.includes(req.user.role);
    if (!isAuthorized) {
      throw new AppError("Accès interdit", 403);
    }
    return next();
  };
};

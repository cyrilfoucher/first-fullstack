import AppError from "../utils/AppError.js";

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      req.body = await schema.parseAsync(req.body);

      next();
    } catch (error) {
      next(new AppError(error.issues[0].message, 400));
    }
  };
};

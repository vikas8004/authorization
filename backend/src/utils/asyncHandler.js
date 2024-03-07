export const asyncHandler = (asyncFunc) => {
  return (req, res, next) => {
    Promise.resolve(asyncFunc(req, res, next)).catch((err) => {
      next(err);
    });
  };
};

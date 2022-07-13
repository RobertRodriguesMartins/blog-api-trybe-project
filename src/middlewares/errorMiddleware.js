const cases = {
  validationError: 400,
  notFoundError: 404,
};
/**
 * @param {Error} err
 * @type {import('express').ErrorRequestHandler}
 */
const errorMiddleware = (err, _req, res, _next) => {
  const { name } = err;

  const code = cases[name];
  if (code) {
    return res.status(code).json({ message: err.message });
  }

  return res.status(500).json({ message: err.message });
};

module.exports = errorMiddleware;

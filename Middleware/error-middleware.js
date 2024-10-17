const errorMiddleware = (err, req, res, next) => {
  statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  const extradetails = err.extradetails || 'erorr form backend';

  return res.status(statusCode).json({
    message,
    extradetails,
  });
};

module.exports = errorMiddleware;

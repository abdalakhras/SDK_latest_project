const AppError = require('../utilies/AppError')


 const notFound = (req, res, next) => {
  next(new AppError(`can not found ${req.originalUrl} on this server`, 404));
};

module.exports = {notFound};
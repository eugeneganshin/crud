// new AppError(`Can't find ${req.originalUrl} on this server.`);
const AppError = require('../utils/appError');
const { logger } = require('../utils/logger');

const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpired = () => new AppError('Your token has expired. Please log in again!', 401);

const sendErrorForDev = (err, req, res) => {
  logger.error(err.message, { url: req.originalUrl });
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProduction = (err, req, res) => {
  // API
  // Operational Error that we trust: send msg to the client.
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming or unknown error: don't leak error details.
  logger.error(err.message, { url: req.originalUrl });
  return res.status(500).json({
    status: 'Error',
    message: 'Something is very wrong!',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorForDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpired();

    sendErrorProduction(error, req, res);
  }
};

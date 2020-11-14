const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { logger, morganFmtNormal, morganFmtBad } = require('./utils/logger');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');

const PORT = 3000;
const app = express();

app.use(morganFmtNormal);
app.use(morganFmtBad);

const limiter = rateLimit({
  // Limit requests from same ip.
  max: 100,
  windowMs: 60 * 60 * 1000, // 1h
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

app.use('/api/v1/task', taskRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

exports.logger = logger;
exports.app = app;

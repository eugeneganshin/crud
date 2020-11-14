const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');

// WINSTON CONFIG
const logLevel = process.env.LOG_LEVEL || 'debug';

function formatParams(info) {
  const { timestamp, level, message, ...args } = info;
  const ts = timestamp.slice(0, 19).replace('T', ' ');

  return `${ts} ${level}: ${message} ${
    Object.keys(args).length ? JSON.stringify(args, '', '') : ''
  }`;
}

const developmentFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(formatParams),
);

const productionFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf(formatParams),
);

let logger;

if (process.env.NODE_ENV !== 'production') {
  logger = createLogger({
    level: logLevel,
    format: developmentFormat,
    transports: [new transports.Console()],
  });
} else {
  logger = createLogger({
    level: logLevel,
    format: productionFormat,
    transports: [
      new transports.File({ filename: './logs/error.log', level: 'error' }),
      new transports.File({ filename: './logs/combined.log' }),
    ],
    exitOnError: false,
  });
}

// MORGAN CONFIG
const morganFormat = process.env.NODE_ENV !== 'production' ? 'dev' : 'combined';

exports.morganFmtNormal = morgan(morganFormat, {
  skip(req, res) {
    return res.statusCode < 400;
  },
  stream: process.stderr,
});

exports.morganFmtBad = morgan(morganFormat, {
  skip(req, res) {
    return res.statusCode >= 400;
  },
  stream: process.stdout,
});

exports.logger = logger;

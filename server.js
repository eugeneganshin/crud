const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCOUGHT EXCEPTION. Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const { app, logger } = require('./app');

const PORT = process.env.PORT || 3000;

console.log(process.env.NODE_ENV);

const server = app.listen(PORT, () => {
  logger.info(`Example app listening on port ${PORT}`);
  logger.debug('More detailed log', { PORT });
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

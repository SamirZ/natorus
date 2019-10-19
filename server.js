/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.error(err.name, err.message);
  console.error('UNHANDLER EXCEPTION! Shutting down...');
  process.exit(1);
});

dotenv.config({
  path: './config.env'
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.error(err.name, err.message);
  console.error('UNHANDLER REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

const express = require('express');
const morgan = require('morgan');

const app = express();

const toursRouter = require('./public/routes/toursRouter');
const usersRouter = require('./public/routes/usersRouter');

// 1) Middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the Middleware!');
  next();
});

// 2) Routes (mounting the routers)

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;

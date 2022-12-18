const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();
const { mongoDbAdress, limiter } = require('./utils/constants');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(mongoDbAdress, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use(limiter);

app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(helmet());

app.use(requestLogger); // enabling the request logger

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'https://aroundtheus-timothyrusso.students.nomoredomainssbs.ru',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
});

app.use(cors());
app.options('*', cors()); // Enable requests for all routes

app.use(routes);

app.use(errorLogger); // enabling the error logger

app.use(errors()); // celebrate error handler

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // eslint-disable-line no-console
});

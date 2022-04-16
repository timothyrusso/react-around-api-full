const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const routes = require('./routes');
require('dotenv').config();
const { mongoDbAdress, limiter } = require('./utils/constants');
const {
  createUser, login,
} = require('./controllers/users');

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

app.post('/signup', createUser);  // Verificare che non siano già sufficienti le routes nell'index router
app.post('/signin', login);

app.use(routes);

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // eslint-disable-line no-console
});
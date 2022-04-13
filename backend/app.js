const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const routes = require('./routes');
const auth = require('./middleware/auth');
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

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // eslint-disable-line no-console
});

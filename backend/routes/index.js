const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { NOT_FOUND } = require('../utils/constants');

router.use('/', usersRouter);
router.use('/', cardsRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Requested resource not found' });
});

module.exports = router;

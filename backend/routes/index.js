const router = require('express').Router();
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/not-found-err');
const { createUser, login } = require('../controllers/users');
const { validateAuthentication, validateUserCreation } = require('../middlewares/validations');

router.post('/signup', validateUserCreation, createUser);
router.post('/signin', validateAuthentication, login);

// router.use(auth);
router.use('/', usersRouter);
router.use('/', cardsRouter);

router.use((req, res, next) => {
  next(new NotFoundError('No page found for the specified route'));
});

module.exports = router;

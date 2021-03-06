const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  REQUEST_SUCCEDED, RESOURCE_CREATED, NOT_FOUND,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.status(REQUEST_SUCCEDED).send(users))
  .catch(next);

const getProfile = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => new NotFoundError('User ID not found'))
    .then((user) => { res.status(REQUEST_SUCCEDED).send({ data: user }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid user ID'));
      } else if (err.statusCode === NOT_FOUND) {
        next(new NotFoundError('User not found'));
      } else {
        next(err);
      }
    });
};

// GET users/me
const getCurrentUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(() => new NotFoundError('No user found with that id'))
    .then((user) => { res.status(REQUEST_SUCCEDED).send({ data: user }); })
    .catch(next);
};

// POST /signup
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('The user with the provided email already exist');
      } else {
        return bcrypt.hash(password, 10); // hashing the password
      }
    })
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email, // adding the email to the database
      password: hash, // adding the hash to the database
    }))
    .then((user) => res.status(RESOURCE_CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    // pass the options object:
    {
      new: true, // the then handler receives the updated entry as input
      runValidators: true, // // the data will be validated before the update
    },
  )
    .orFail(() => new NotFoundError('No user found with that id'))
    .then((user) => { res.status(REQUEST_SUCCEDED).send({ data: user }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid user ID'));
      } else if (err.statusCode === NOT_FOUND) {
        next(new NotFoundError('User not found'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError('No user found with that id'))
    .then((user) => { res.status(REQUEST_SUCCEDED).send({ data: user }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid user ID'));
      } else if (err.statusCode === NOT_FOUND) {
        next(new NotFoundError('User not found'));
      } else {
        next(err);
      }
    });
};

// POST signin
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'casual-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ data: user.toJSON(), token }); // Send back to the frontend the user obj
    })
    .catch(() => {
      next(new UnauthorizedError('Incorrect email or password'));
    });
};

module.exports = {
  getUsers, getProfile, createUser, updateProfile, updateAvatar, login, getCurrentUser,
};

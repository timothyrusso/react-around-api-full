const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  REQUEST_SUCCEDED, RESOURCE_CREATED, NOT_FOUND, INVALID_DATA, INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(REQUEST_SUCCEDED).send(cards))
  .catch(next);

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(RESOURCE_CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA).send({ message: 'Invalid card data' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: `An error has occurred on the server: ${err}` });
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Card ID not found'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError('Yoy cannot delete someone else\'s card')); // cannot delete the card if you are not the owner
      } else {
        Card.deleteOne(card).then(() => res.status(REQUEST_SUCCEDED).send({ data: card }));
      }
    })
    .catch(next);
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((card) => { res.status(REQUEST_SUCCEDED).send({ data: card }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ message: 'Invalid card ID' });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: `An error has occurred on the server: ${err}` });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((card) => { res.status(REQUEST_SUCCEDED).send({ data: card }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ message: 'Invalid card ID' });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: `An error has occurred on the server: ${err}` });
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};

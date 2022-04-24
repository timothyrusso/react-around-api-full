const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');
const {
  REQUEST_SUCCEDED, RESOURCE_CREATED, NOT_FOUND,
} = require('../utils/constants');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(REQUEST_SUCCEDED).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(RESOURCE_CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
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

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError('Card ID not found'))
    .then((card) => { res.status(REQUEST_SUCCEDED).send({ data: card }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid card ID'));
      } else if (err.statusCode === NOT_FOUND) {
        next(new NotFoundError('Card not found'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError('Card ID not found'))
    .then((card) => { res.status(REQUEST_SUCCEDED).send({ data: card }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid card ID'));
      } else if (err.statusCode === NOT_FOUND) {
        next(new NotFoundError('Card not found'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};

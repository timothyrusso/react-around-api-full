const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;


// URL custom validator
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

// Login validation
const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('The email filed must be a valid email')
      .messages({
        'string.empty': 'The "email" filed must be filled in',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'The "password" field must be filled in',
      }),
  })
});

// User creation validation
const validateUserCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum lenght of the "name" field is 2',
        'string.max': 'The maximum lenght of the "name" field is 30',
        'string.empty': 'The "name" filed must be filled in',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum lenght of the "about" field is 2',
        'string.max': 'The maximum lenght of the "about" field is 30',
        'string.empty': 'The "about" filed must be filled in',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'The "password" field must be filled in',
      }),
    email: Joi.string().required().email()
      .message('The email filed must be a valid email')
      .messages({
        'string.empty': 'The "email" filed must be filled in',
      }),
    avatar: Joi.string().required()
      .custom(validateURL)
      .message('The "avatar" field must be a valid URL')
      .messages({
        'string.empty': 'The "avatar" field must be filled in',
      }),
  })
});

// ID validation from the params
const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Invalid id');
    }),
  }),
});

module.exports = {
  validateAuthentication, validateUserCreation, validateId,
};
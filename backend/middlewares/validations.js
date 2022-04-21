const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

// URL custom validator
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

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
  }),
});

// User creation validation
const validateUserCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'The minimum lenght of the "name" field is 2',
        'string.max': 'The maximum lenght of the "name" field is 30',
        'string.empty': 'The "name" filed must be filled in',
      }),
    about: Joi.string().min(2).max(30)
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
    avatar: Joi.string()
      .custom(validateURL)
      .message('The "avatar" field must be a valid URL')
      .messages({
        'string.empty': 'The "avatar" field must be filled in',
      }),
  }),
});

// userId validation
const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum()
      .message('The id is invalid')
      .messages({
        'string.empty': 'The "Id" filed must be filled in',
      }),
  }),
});

// cardId validation
const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum()
      .message('The id is invalid')
      .messages({
        'string.empty': 'The "Id" filed must be filled in',
      }),
  }),
});

// User profile validation
const validateProfile = celebrate({
  body: {
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
  },
});

// Avatar validation
const avatarValidation = celebrate({
  body: {
    avatar: Joi.string().required()
      .custom(validateURL)
      .message('The "avatar" field must be a valid URL')
      .messages({
        'string.empty': 'The "avatar" field must be filled in',
      }),
  },
});

// card creation validator
const createCardValidation = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum lenght of the "name" field is 2',
        'string.max': 'The maximum lenght of the "name" field is 30',
        'string.empty': 'The "name" filed must be filled in',
      }),
    link: Joi.string().required()
      .custom(validateURL)
      .message('The "link" field must be a valid URL')
      .messages({
        'string.empty': 'The "link" field must be filled in',
      }),
  },
});

module.exports = {
  validateAuthentication, validateUserCreation, validateUserId, validateCardId, validateProfile, avatarValidation, createCardValidation, // eslint-disable-line
};

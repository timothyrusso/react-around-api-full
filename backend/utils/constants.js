const rateLimit = require('express-rate-limit');

const REQUEST_SUCCEDED = 200;
const RESOURCE_CREATED = 201;
const NOT_FOUND = 404;
const INVALID_DATA = 400;
const INTERNAL_SERVER_ERROR = 500;

const mongoDbAdress = 'mongodb://localhost:27017/aroundb';

const limiter = rateLimit({ // Limit repeated requests to public APIs and/or endpoints
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

module.exports = {
  REQUEST_SUCCEDED, RESOURCE_CREATED, NOT_FOUND, INVALID_DATA, INTERNAL_SERVER_ERROR, mongoDbAdress, limiter, // eslint-disable-line
};

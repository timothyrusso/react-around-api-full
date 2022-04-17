const router = require('express').Router();
const {
  getUsers, getProfile, updateProfile, updateAvatar,
} = require('../controllers/users');
const { validateId, validateProfile } = require('../middlewares/validations');

router.get('/users', getUsers);

router.get('/users/:userId', validateId, getProfile);

router.patch('/users/me', validateProfile, updateProfile);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;

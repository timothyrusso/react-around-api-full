const router = require('express').Router();
const {
  getUsers, getProfile, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const { validateUserId, validateProfile, avatarValidation } = require('../middlewares/validations');

router.get('/users', getUsers);

router.get('/users/:userId', validateUserId, getProfile);

router.get('/users/me', getCurrentUser);

router.patch('/users/me', validateProfile, updateProfile);

router.patch('/users/me/avatar', avatarValidation, updateAvatar);

module.exports = router;

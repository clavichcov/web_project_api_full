
const router = require('express').Router();
const { getUserById, getUsers, createUser, updateUser, updateAvatar, getUserMe } = require('../controllers/users');
const { route } = require('./cards');


router.get('/', getUsers );
router.get('/:userId', getUserById);
router.get('/me', getUserMe);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;

const router = require('express').Router();
const { getUserById, getUsers, createUser, updateUser, updateAvatar, getUserMe } = require('../controllers/users');
const { route } = require('./cards');


router.get('/', getUsers );

router.get('/me', getUserMe);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.get('/:userId', getUserById);
module.exports = router;
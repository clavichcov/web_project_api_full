const router = require('express').Router();
const { getCards, createCard, deleteCard, addLikeOrDislike } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:_id', deleteCard);
router.put('/:_id/likes', addLikeOrDislike);
router.delete('/:_id/likes', addLikeOrDislike);

module.exports = router;
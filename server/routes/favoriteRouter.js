const Router = require('express')
const router = new Router()
const favoriteController = require('../controllers/favoriteController');
// Избранное
router.post('/', favoriteController.add);
router.get('/:userId', favoriteController.getAll);
router.delete('/:userId/:productId', favoriteController.delete);

module.exports = router
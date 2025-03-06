const Router = require('express')
const router = new Router()
const reviewController = require('../controllers/reviewController');

// Отзывы
router.post('/', reviewController.create);
router.get('/:productId', reviewController.getAll);
router.get('/id/:id', reviewController.getById);
router.put('/:id', reviewController.update);
router.delete('/:id', reviewController.delete);

module.exports = router
const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')

router.get('/', productController.getAllProducts);
router.get('/names', productController.getAllProductsNames);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router
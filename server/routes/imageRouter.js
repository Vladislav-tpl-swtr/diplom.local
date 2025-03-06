const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/imageController');

router.get('/', ImageController.getAllImages);
router.get('/products/:id', ImageController.getAllImagesForProduct);
router.post('/products/:id', ImageController.addImageForProduct);
router.put('/:id', ImageController.updateImage);
router.delete('/:id', ImageController.deleteImage);
router.get('/primary/:id', ImageController.getPrimaryImageForProduct);

module.exports = router;

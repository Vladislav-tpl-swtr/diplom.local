const { Image } = require('../models/models');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid')

class ImageController {
    // Получить все изображения для конкретного продукта
    async getAllImagesForProduct(req, res) {
        try {
            const images = await Image.findAll({ where: { productId: req.params.id } });
            res.json(images);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPrimaryImageForProduct(req, res) {
        try {
            const image = await Image.findOne({ 
                where: { 
                    productId: req.params.id, 
                    isPrimary: true 
                } 
            });
    
            if (!image) {
                return res.status(404).json({ message: "Основное изображение не найдено" });
            }
    
            res.json(image);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    

    async getAllImages(req, res) {
        try {
            const images = await Image.findAll({ });
            res.json(images);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Добавить новое изображение для товара
    async addImageForProduct(req, res) {
        try {
            // Проверка наличия файлов
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({ error: 'Нет файлов для загрузки.' });
            }

            const { image } = req.files; // Имя поля файла
            let fileName = uuid.v4() + ".jpg"
            const uploadPath = path.join(__dirname, '..', 'static', 'images', fileName);

            // Сохранение файла на сервере
            await image.mv(uploadPath);

            // Создаем запись в БД
            const newImage = await Image.create({
                productId: req.params.id,
                imageUrl: `/static/images/${fileName}`,
                isPrimary: req.body.isPrimary === 'true',
            });

            res.status(201).json(newImage);
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error); // Логируем ошибку на сервере
            res.status(500).json({ error: 'Ошибка при загрузке изображения. Попробуйте снова.' });
        }
    }

    // Обновить изображение
    async updateImage(req, res) {
        try {
            const { imageUrl, isPrimary } = req.body;

            await Image.update({ imageUrl, isPrimary }, { where: { id: req.params.id } });
            const updatedImage = await Image.findOne({ where: { id: req.params.id } });
            res.json(updatedImage);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Удалить изображение
    async deleteImage(req, res) {
        try {
            const image = await Image.findOne({ where: { id: req.params.id } });
            if (image) {
                // Удаление файла с сервера
                const filePath = path.join(__dirname, '..', 'static', 'images', image.imageUrl.split('/').pop());
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });

                await Image.destroy({ where: { id: req.params.id } });
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Изображение не найдено.' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ImageController();
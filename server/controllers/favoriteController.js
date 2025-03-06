const ApiError = require('../error/ApiError');
const { Favorite, Product } = require('../models/models');

class FavoriteController {
    async add(req, res, next) {
        try {
            const { userId, productId } = req.body;
            const favorite = await Favorite.create({ userId, productId });
            res.status(201).json(favorite);
        } catch (error) {
            return next(ApiError.BadRequest('Не удалось добавить товар в избранное'));
        }
    }

    async getAll(req, res, next) {
        try {
            console.log(req.params.userId)
    
            const favorites = await Favorite.findAll({
                where: { userId: req.params.userId },
                include: [{ model: Product }]
            });
    
            if (!favorites.length) {
                return res.status(404).json({ message: 'Избранные товары не найдены' });
            }
    
            res.json(favorites);
        } catch (error) {
            console.error('Ошибка при получении избранного:', error);
            return next(ApiError.BadRequest('Не удалось получить избранные товары'));
        }
    }
    

    async delete(req, res, next) {
        try {
            const { userId, productId } = req.params;
            const deleted = await Favorite.destroy({
                where: { userId, productId }
            });

            if (deleted) {
                res.status(204).send();
            } else {
                return next(ApiError.BadRequest('Товар не найден в избранном'));
            }
        } catch (error) {
            return next(ApiError.BadRequest('Неизвестная ошибка'));
        }
    }
}

module.exports = new FavoriteController();

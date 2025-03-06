const ApiError = require('../error/ApiError');
const { Review, Product, User } = require('../models/models');

class ReviewController {
    async create(req, res, next) {
        try {
            const { userId, productId, rating, comment } = req.body;
            const review = await Review.create({ userId, productId, rating, comment });
            res.status(201).json(review);
        } catch (error) {
            return next(ApiError.BadRequest('Не удалось добавить отзыв'));
        }
    }

    async getAll(req, res, next) {
        try {
            const { productId } = req.params;
            const reviews = await Review.findAll({
                where: { productId },
                include: [{ model: User, attributes: ['username'] }]
            });
            res.json(reviews);
        } catch (error) {
            return next(ApiError.BadRequest('Не удалось получить отзывы'));
        }
    }

    async getById(req, res, next) {
        try {
            const review = await Review.findByPk(req.params.id, {
                include: [{ model: User, attributes: ['username'] }]
            });
            if (review) {
                res.json(review);
            } else {
                return next(ApiError.BadRequest('Отзыв не найден'));
            }
        } catch (error) {
            return next(ApiError.BadRequest('Неизвестная ошибка'));
        }
    }

    async update(req, res, next) {
        try {
            const { rating, comment } = req.body;
            const [updated] = await Review.update(
                { rating, comment },
                { where: { id: req.params.id } }
            );

            if (updated) {
                const updatedReview = await Review.findByPk(req.params.id);
                res.json(updatedReview);
            } else {
                return next(ApiError.BadRequest('Отзыв не найден'));
            }
        } catch (error) {
            return next(ApiError.BadRequest('Неизвестная ошибка'));
        }
    }

    async delete(req, res, next) {
        try {
            const deleted = await Review.destroy({
                where: { id: req.params.id }
            });

            if (deleted) {
                res.status(204).send();
            } else {
                return next(ApiError.BadRequest('Отзыв не найден'));
            }
        } catch (error) {
            return next(ApiError.BadRequest('Неизвестная ошибка'));
        }
    }
}

module.exports = new ReviewController();

const ApiError = require('../error/ApiError')
const {Category} = require('../models/models')

class CategoryController {
    async create(req,res) {
        try {
          const category = await Category.create(req.body);
          res.status(201).json(category);
        } catch (error) {
          return next(ApiError.BadRequest('Не удалось создать категорию'));
        }
      }
    
    async getAll(req,res) {
        try {
          const categories = await Category.findAll();
          res.json(categories);
        } catch (error) {
          return next(ApiError.BadRequest('Не удалось найти категории'));
        }
      }

    async getById(req,res) {
        try {
          const category = await Category.findByPk(req.params.id);
          if (category) {
            res.json(category);
          } else {
            return next(ApiError.BadRequest('Категория не найдена'));
          }
        } catch (error) {
          return next(ApiError.BadRequest('Неизвестная ошибка'));
        }
      }
    
    async update(req,res) {
        try {
          const [updated] = await Category.update(req.body, {
            where: { id: req.params.id },
          });
          if (updated) {
            const updatedCategory = await Category.findByPk(req.params.id);
            res.json(updatedCategory);
          } else {
            return next(ApiError.BadRequest('Категория не найдена'));
          }
        } catch (error) {
          return next(ApiError.BadRequest('Неизвестная ошибка'));
        }
      }

    async delete(req,res){
        try {
          const deleted = await Category.destroy({
            where: { id: req.params.id },
          });
          if (deleted) {
            res.status(204).send();
          } else {
            return next(ApiError.BadRequest('Категория не найдена'));
          }
        } catch (error) {
          return next(ApiError.BadRequest('Неизвестная ошибка'));
        }
      }

    }

module.exports = new CategoryController()
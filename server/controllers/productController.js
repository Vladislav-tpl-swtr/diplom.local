const { Product, Category, Tag, Image } = require('../models/models');
const uuid = require('uuid')
class ProductController {
  // Получить все продукты
  async getAllProducts(req, res) {
    try {
        let { categoryId, tagId, limit, page } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 12;
        let offset = page * limit - limit;

        const options = {
            attributes: ['id', 'name', 'availability', 'price', 'availableWeights'],
            include: [
                { model: Category },
                { model: Tag },
                {
                    model: Image,
                    attributes: ['imageUrl'],
                    where: { isPrimary: true },
                    required: false // Если нет основного изображения, не блокировать товар
                }
            ],
            limit: limit,
            offset: offset,
        };

        if (categoryId) options.include[0].where = { id: categoryId };
        if (tagId) options.include[1].where = { id: tagId };

        const products = await Product.findAll(options);
        const totalProducts = await Product.count();

        res.json({
            total: totalProducts,
            page: page,
            limit: limit,
            products: products
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
  


  async getAllProductsNames(req, res) {
    try {
        const products = await Product.findAll({
            attributes: ['id', 'name'], // Указываем только нужные поля
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


  // Получить продукт по ID
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: [
          { model: Category, through: { attributes: [] } }, // Подключаем категории
          { model: Tag, through: { attributes: [] } }, // Подключаем теги
          { model: Image } // Подключаем изображения
        ]
      });
  
      if (!product) {
        return res.status(404).json({ message: "Товар не найден" });
      }
  
      res.json(product);
    } catch (error) {
      console.error("Ошибка загрузки товара:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  };

  // Создать новый продукт
  async createProduct(req, res) {
    try {
      const product = await Product.create(req.body);
      if (req.body.categories) {
        await product.setCategories(req.body.categories); // Связываем с категориями
      }
      if (req.body.tags) {
        await product.setTags(req.body.tags); // Связываем с тегами
      }
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Обновить продукт
  async updateProduct(req, res) {
    try {
      const [updated] = await Product.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedProduct = await Product.findByPk(req.params.id);
        if (req.body.categories) {
          await updatedProduct.setCategories(req.body.categories); // Обновляем категории
        }
        if (req.body.tags) {
          await updatedProduct.setTags(req.body.tags); // Обновляем теги
        }
        res.json(updatedProduct);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Удалить продукт
  async deleteProduct(req, res) {
    try {
      const deleted = await Product.destroy({
        where: { id: req.params.id },
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProductController();
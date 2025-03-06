const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'carts',
  timestamps: true,
});

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  tableName: 'cart_items',
  timestamps: false,
});

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  availability: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER, // Количество единиц на складе
    allowNull: true,
    defaultValue: 0,
  },
  availableWeights: {
    type: DataTypes.STRING, // Сохраняем список доступных граммовок в виде строки
    allowNull: true,
    defaultValue: "10,25,50,100,250" // Пример значений
  }
}, {
  tableName: 'products',
  timestamps: true,
});


const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'categories',
  timestamps: false,
});

const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'tags',
  timestamps: false,
});

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  comment: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'reviews',
  timestamps: true,
});

const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, {
  tableName: 'favorites',
  timestamps: false,
});

// Модель изображения
const Image = sequelize.define('Image', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'products', // Имя таблицы продуктов
          key: 'id',
      },
  },
  imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
  },
  isPrimary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
  },
}, {
  tableName: 'images',
  timestamps: true, // Включаем автоматическое создание полей createdAt и updatedAt
  createdAt: 'createdAt', // Название поля для создания
  updatedAt: 'updatedAt', // Название поля для обновления
});

// Определение связей
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Cart.belongsToMany(Product, { through: CartItem, foreignKey: 'cartId' });
Product.belongsToMany(Cart, { through: CartItem, foreignKey: 'productId' });

Product.belongsToMany(Category, { through: 'product_categories', foreignKey: 'productId' });
Category.belongsToMany(Product, { through: 'product_categories', foreignKey: 'categoryId' });

Product.belongsToMany(Tag, { through: 'product_tags', foreignKey: 'productId' });
Tag.belongsToMany(Product, { through: 'product_tags', foreignKey: 'tagId' });

Product.hasMany(Review, { foreignKey: 'productId' });
Review.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

User.belongsToMany(Product, { through: Favorite, foreignKey: 'userId' });
Product.belongsToMany(User, { through: Favorite, foreignKey: 'productId' });

// Связь между продуктами и изображениями
Product.hasMany(Image, { foreignKey: 'productId' });
Image.belongsTo(Product, { foreignKey: 'productId' });

Favorite.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Favorite, { foreignKey: 'productId' });

module.exports = {
  User,
  Cart,
  CartItem,
  Product,
  Category,
  Tag,
  Review,
  Favorite,
  Image,
};
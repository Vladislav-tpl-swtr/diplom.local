import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import productStore from "../../store/productStore";

const ProductInfo = ({ product }) => {
  const navigate = useNavigate();

  // Разбираем доступные веса
  const availableWeights = product.availableWeights
    ? product.availableWeights.split(",").map((weight) => ({
        weight: parseInt(weight.trim()),
        price: parseFloat(product.price) * parseInt(weight.trim()),
      }))
    : [];

  const [selectedWeight, setSelectedWeight] = useState(
    availableWeights.length > 0 ? availableWeights[0] : { weight: 0, price: 0 }
  );

  const handleCategoryClick = (categoryId) => {
    productStore.setCategory(categoryId);
    navigate("/"); // Перенаправляем на `HomePage` с фильтром по категории
  };

  const handleTagClick = (tagId) => {
    productStore.setTag(tagId);
    navigate("/"); // Перенаправляем на `HomePage` с фильтром по тегу
  };

  const handleAddToCart = () => {
    console.log(
      `Добавлено в корзину: ${product.name}, ${selectedWeight.weight} г, ${selectedWeight.price} р.`
    );
  };

  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      
      {/* Категории */}
      {product.Categories?.length > 0 && (
        <p className="text-sm text-gray-600 mt-2">
          <span className="font-semibold">Категории:</span>
          {product.Categories.map((category) => (
            <span
              key={category.id}
              className="text-blue-600 cursor-pointer hover:underline ml-2"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </span>
          ))}
        </p>
      )}

      {/* Наличие */}
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Наличие:</span> 
        <span className={`ml-2 ${product.availability ? "text-green-600" : "text-red-600"}`}>
          {product.availability ? "На складе" : "Нет в наличии"}
        </span>
      </p>

      {/* Теги */}
      <p className="mt-2 text-sm text-gray-500">
        <span className="font-semibold">Теги:</span> 
        {product.Tags?.map(tag => (
          <span 
            key={tag.id} 
            className="text-blue-600 cursor-pointer hover:underline ml-2"
            onClick={() => handleTagClick(tag.id)}
          >
            #{tag.name}
          </span>
        ))}
      </p>

      {/* Выбор веса */}
      {availableWeights.length > 0 ? (
        <div className="mt-4">
          <label htmlFor="weight-select" className="text-sm font-medium text-gray-700">
            Выберите вес:
          </label>
          <select
            id="weight-select"
            className="border rounded p-2 mt-2 w-48"
            value={selectedWeight.weight}
            onChange={(e) => {
              const newWeight = availableWeights.find(
                (w) => w.weight === parseInt(e.target.value)
              );
              setSelectedWeight(newWeight);
            }}
          >
            {availableWeights.map((w, index) => (
              <option key={index} value={w.weight}>
                {w.weight} г
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p className="text-gray-500 text-sm mt-2">Нет доступных вариантов веса</p>
      )}

      {/* Динамическая цена */}
      <p className="text-2xl font-bold mt-4">{selectedWeight.price.toFixed(2)} р.</p>

      {/* Кнопка "В корзину" */}
      <button
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        onClick={handleAddToCart}
        disabled={availableWeights.length === 0}
      >
        В корзину
      </button>
    </div>
  );
};

export default ProductInfo;

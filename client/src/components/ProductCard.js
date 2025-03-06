import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Используем useNavigate для перехода

  const availableWeights = product.availableWeights
    ? product.availableWeights.split(",").map((weight) => ({
        weight: parseInt(weight.trim()),
        price: parseFloat(product.price) * parseInt(weight.trim())
      }))
    : [];

  const [selectedWeight, setSelectedWeight] = useState(
    availableWeights.length > 0 ? availableWeights[0] : { weight: 0, price: 0 }
  );

  const imageUrl = product.Images?.length > 0 
    ? `http://localhost:5000${product.Images[0].imageUrl}` 
    : "https://via.placeholder.com/150";

  const handleAddToCart = () => {
    console.log(`Добавлено в корзину: ${product.name}, ${selectedWeight.weight}г, ${selectedWeight.price} р.`);
  };

  const handleOpenProductPage = () => {
    navigate(`/product/${product.id}`); // Переход на `ProductPage`
  };

  return (
    <div className="border rounded-lg p-3 shadow hover:shadow-lg bg-white text-center w-64 mx-auto transition-shadow duration-300">
  <img
    src={imageUrl}
    alt={product.name}
    className="w-full h-32 object-contain mb-3 rounded-t-lg"
    onClick={handleOpenProductPage}
    onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
  />
  <h3 className="text-sm font-medium text-gray-800 truncate w-full" title={product.name} onClick={handleOpenProductPage}>
    {product.name.length > 25 ? `${product.name.substring(0, 25)}...` : product.name} 
  </h3>
      
      {availableWeights.length > 0 ? (
        <select 
          className="border rounded p-1 mt-2 w-48"
          value={selectedWeight.weight}
          onChange={(e) => {
            const newWeight = availableWeights.find(w => w.weight === parseInt(e.target.value));
            setSelectedWeight(newWeight);
          }}
        >
          {availableWeights.map((w, index) => (
            <option key={index} value={w.weight}>{w.weight} г</option>
          ))}
        </select>
      ) : (
        <p className="text-gray-500 text-sm mt-2">Нет доступных вариантов</p>
      )}
      
      <p className="text-sm font-medium text-green-800 mt-2">{selectedWeight.price.toFixed(2)} р.</p>
      
      <button 
        className="bg-green-600 text-white w-48 py-2 rounded mt-4 hover:bg-green-700 transition-colors duration-200"
        onClick={handleAddToCart}
        disabled={availableWeights.length === 0}
      >
        В корзину
      </button>
    </div>
  );
};

export default ProductCard;

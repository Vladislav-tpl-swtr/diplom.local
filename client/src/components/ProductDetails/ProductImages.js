import React from "react";

const ProductImages = ({ images }) => {
  if (!images || images.length === 0) {
    return <p className="text-gray-500">Изображения отсутствуют</p>;
  }

  const mainImage = images.find(img => img.isPrimary) || images[0];

  return (
    <div className="flex flex-col items-center">
      {/* Основное изображение */}
      <img 
        src={mainImage ? `http://localhost:5000${mainImage.imageUrl}` : "https://via.placeholder.com/300"}
        alt="Product"
        className="w-80 h-80 object-cover rounded-lg shadow"
      />

      {/* Миниатюры */}
      <div className="flex gap-2 mt-2">
        {images.map((img, index) => (
          <img 
            key={index}
            src={`http://localhost:5000${img.imageUrl}`}
            alt={`Thumbnail ${index}`}
            className="w-16 h-16 object-cover cursor-pointer border rounded"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;

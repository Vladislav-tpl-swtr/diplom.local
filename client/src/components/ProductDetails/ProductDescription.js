import React from "react";

const ProductDescription = ({ description, volume }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Описание</h2>
      <p className="text-gray-700 mt-2">{description}</p>
      {volume && <p className="text-sm text-gray-500 mt-2">Объём: {volume} мл</p>}
    </div>
  );
};

export default ProductDescription;

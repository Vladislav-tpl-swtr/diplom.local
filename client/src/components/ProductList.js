import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 grid-rows-2 gap-6 justify-center">
        {products.length > 0 ? (
          products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            Товары не найдены
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;

import React from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    name: "Шу Пуэр 'Императорский'",
    description: "Выдержанный чай с землистым ароматом",
    price: "1 990",
    image: "/static/images/1.jpg"
  }
];

const Bestsellers = () => {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-3xl font-bold">БЕСТСЕЛЛЕРЫ</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Bestsellers;

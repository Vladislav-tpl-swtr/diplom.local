import React from "react";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import ProductDescription from "./ProductDescription";
import ProductReviews from "./ProductReviews";

const ProductDetails = ({ product }) => {
  return (
    <div className="flex-1">
      <div className="flex gap-6">
        <ProductImages images={product.Images} />
        <ProductInfo product={product} />
      </div>
      <ProductDescription description={product.description} volume={product.volume} />
      <ProductReviews reviews={product.reviews} />
    </div>
  );
};

export default ProductDetails;

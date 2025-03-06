import React from "react";

const ProductReviews = ({ reviews }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Отзывы ({reviews?.length || 0})</h2>
      {reviews?.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="mt-2 border-b pb-2">
            <p className="text-gray-800 font-semibold">{review.author}</p>
            <p className="text-sm text-gray-600">{review.comment}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-2">Отзывов пока нет</p>
      )}
    </div>
  );
};

export default ProductReviews;

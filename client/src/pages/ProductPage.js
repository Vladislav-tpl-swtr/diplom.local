import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ProductDetails from "../components/ProductDetails/ProductDetails"; // Путь изменен

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/product/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error("Ошибка загрузки товара:", error);
      });
  }, [id]);

  if (!product) {
    return <p className="text-center text-gray-500">Загрузка товара...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mt-16 mx-auto flex p-4 gap-6">
        <Sidebar />
        <ProductDetails product={product} />
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import productStore from "../store/productStore";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";
import Header from "../components/Header"
import Footer from "../components/Footer"

const HomePage = observer(() => {
  useEffect(() => {
    productStore.fetchProducts(); // Загружаем товары при первом рендере
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Хедер фиксирован сверху */}
      <Header />

      {/* Основной контент: Sidebar + ProductList */}
      <div className="flex mt-16 flex-1 container mx-auto p-4 gap-6">
        {/* Sidebar занимает фиксированную ширину */}
        <Sidebar className="w-64" />

        {/* Список товаров растягивается на всю ширину */}
        <div className="flex-1">
          <ProductList products={productStore.products} />
        </div>
      </div>

      {/* Футер фиксирован снизу */}
      <Footer />
    </div>
  );
});


export default HomePage;
